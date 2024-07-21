
const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Booking = require('../model/bookingModel')
const Slot = require('../model/slotModel')
const moment = require('moment')
     

const generateToken = (admin) => {
    return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET_USER, {
      expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30)
    })
  }

  const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(400).json({ message: "No user found" });
      }
  
      // Use bcrypt to compare passwords
      const passwordMatch = (password === admin.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const expireIn = Date.now() + (1000 * 60 * 60 * 24 * 5);
      const token = generateToken(admin);
      res.cookie('jwtAdmin', token, {
        expires: new Date(expireIn),
        httpOnly: true,
        sameSite: 'lax'
      });
  
      const { _id, email: adminEmail, role } = admin; 
      res.status(200).json({ message: "Login successful", data: { _id, email: adminEmail, role } });
  
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

const logout = async (req, res) => {
    res.clearCookie('jwtAdmin', {
      httpOnly: true,
      sameSite: 'lax'
    });
    res.status(200).json({ message: 'Logout successful' });
  }

const handleblockUser = async (req,res)=>{
    const {id} = req.params
   try {
    const user = await User.findByIdAndUpdate(id)
    user.isBlocked = (!user.isBlocked)
    user.save().then((response)=>{
      return res.status(200).json({message:"success"})
    }).catch((err)=>{
      console.error("failed to handle block ",err);
    })
   } catch (error) {
    res.status(400).json({message:"server error"})
   }

}

const handleblockTrainer = async (req,res)=>{
  const {id} = req.params
 try {
  const user = await Trainer.findByIdAndUpdate(id)
  user.isBlocked = (!user.isBlocked)
  user.save().then((response)=>{
    return res.status(200).json({message:"success"})
  }).catch((err)=>{
    console.error("failed to handle block",err);
  })
 } catch (error) {
  res.status(400).json({message:"server error"})
 }

}

const handleApprovalTrainer = async (req, res) => {
  const { id } = req.params;
  try {
    const trainer = await Trainer.findById(id);
    if (trainer) {

      trainer.isVerified = true;
      await trainer.save();
      res.status(200).json({ message: "Trainer approved successfully" });
    } else {
      res.status(404).json({ message: "Trainer not found" });
    }
  } catch (error) {
    console.error("Error approving trainer:", error);
    res.status(400).json({ message: "Failed to approve trainer" });
  }
};

const handleRejectTrainer = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const trainer = await Trainer.findById(id);
    if (trainer) {
      trainer.isVerified = false;
      trainer.rejectionReason = reason; // Assuming you have a field to store the rejection reason
      await trainer.save();
      res.status(200).json({ message: "Trainer rejected successfully" });
    } else {
      res.status(404).json({ message: "Trainer not found" });
    }
  } catch (error) {
    console.error("Error rejecting trainer:", error);
    res.status(400).json({ message: "Failed to reject trainer" });
  }
};



const getAllTrainers = async (req, res) => {
  try {
      const trainers = await Trainer.find({}).select('-password')
      if (trainers.length>0) {
          return res.status(200).json({ data: trainers, message: "trainer found", success: true })
      } else {
          return res.status(404).json({ message: "trainers not found" })
      }
  } catch (error) {
      res.status(404).json({ message: "server error" })
  }
}

const getAllUsers = async (req,res)=>{
  try {
      
  const users = await User.find({}).select('-password')
  res.status(200).json({data:users, message:"users found"})

  } catch (error) {
      res.status(400).json({message:"users not found"})
  }
}



const getDashBoardDatas = async (req, res) => {
  try {
    
    const totalUsersCount = await User.countDocuments({ role: 'user' });

    const totalTrainersCount = await Trainer.countDocuments({ role: 'trainer' });

    const successfulBookingsCount = await Booking.countDocuments({ bookingStatus: 'success' });

    const cancelledBookingsCount = await Booking.countDocuments({ bookingStatus: 'cancelled' });

    const bookedSlotsCount = await Slot.countDocuments({ isBooked: true });

    const totalBookings = await Booking.countDocuments({ });



    const slotsCount = await Slot.countDocuments({})

    // Fetch total revenue generated
    const successfulBookings = await Booking.find({ bookingStatus: 'success' });
    const totalRevenueGenerated = successfulBookings.reduce((acc, booking) => acc + booking.bookingAmount, 0);

    const dashBoardData = {
      totalUsersCount,
      totalTrainersCount,
      successfulBookingsCount,
      bookedSlotsCount,
      totalRevenueGenerated,
      slotsCount,
      cancelledBookingsCount,
      totalBookings,

    }
    // Send the collected data to the frontend
    res.status(200).json({message:" successfully fetched dashboard data",dashBoardData});
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

const getUserChartDatas = async (req, res) => {
  const role = 'user';
  const { period } = req.query;
  let matchCondition = { role };
  let groupByCondition = { _id: null, count: { $sum: 1 } };
  let dateRange = {};

  switch (period) {
    case 'yesterday':
      dateRange = {
        $gte: moment().subtract(1, 'days').startOf('day').toDate(),
        $lt: moment().startOf('day').toDate(),
      };
      break;
    case 'today':
      dateRange = {
        $gte: moment().startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last7days':
      dateRange = {
        $gte: moment().subtract(7, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last30days':
      dateRange = {
        $gte: moment().subtract(30, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last90days':
      dateRange = {
        $gte: moment().subtract(90, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'allTime':
      dateRange = null; // No restrictions, includes all data
      break;
    default:
      return res.status(400).send('Invalid period');
  }

  if (dateRange) {
    matchCondition.createdAt = dateRange;
    groupByCondition._id = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  } else {
    groupByCondition._id = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  }

  try {
    const data = await User.aggregate([
      { $match: matchCondition },
      { $group: groupByCondition },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).send('Internal Server Error');
  }
};
const getTrainerChartDatas = async (req, res) => {
  const role = 'trainer';
  const { period } = req.query;
  let matchCondition = { role };
  let groupByCondition = { _id: null, count: { $sum: 1 } };
  let dateRange = {};

  switch (period) {
    case 'yesterday':
      dateRange = {
        $gte: moment().subtract(1, 'days').startOf('day').toDate(),
        $lt: moment().startOf('day').toDate(),
      };
      break;
      case 'today':
        dateRange = {
          $gte: moment().startOf('day').toDate(),  
          $lt: moment().endOf('day').toDate(),   
        };
        break;
    case 'last7days':
      dateRange = {
        $gte: moment().subtract(7, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last30days':
      dateRange = {
        $gte: moment().subtract(30, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last90days':
      dateRange = {
        $gte: moment().subtract(90, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'allTime':
      dateRange = null; // No restrictions, includes all data
      break;
    default:
      return res.status(400).send('Invalid period');
  }

  if (dateRange) {
    matchCondition.createdAt = dateRange;
    groupByCondition._id = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  } else {
    groupByCondition._id = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
  }

  try {
    const data = await Trainer.aggregate([
      { $match: matchCondition },
      { $group: groupByCondition },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getBarChartData = async (req, res) => {
  const { period } = req.query;
  let dateRange = {};

  switch (period) {
    case 'yesterday':
      dateRange = {
        $gte: moment().subtract(1, 'days').startOf('day').toDate(),
        $lt: moment().startOf('day').toDate(),
      };
      break;
    case 'today':
      dateRange = {
        $gte: moment().startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last7days':
      dateRange = {
        $gte: moment().subtract(7, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last30days':
      dateRange = {
        $gte: moment().subtract(30, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last90days':
      dateRange = {
        $gte: moment().subtract(90, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'allTime':
      dateRange = null; // No restrictions, includes all data
      break;
    default:
      return res.status(400).send('Invalid period');
  }

  const matchCondition = dateRange
    ? { createdAt: dateRange }
    : {};

  try {
    const [usersData, trainersData] = await Promise.all([
      User.aggregate([
        { $match: { ...matchCondition, role: 'user' } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Trainer.aggregate([
        { $match: { ...matchCondition, role: 'trainer' } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    // Format data for response
    const formatData = (data) => ({
      counts: data.map(item => item.count),
      labels: data.map(item => item._id),
    });

    res.json({
      users: formatData(usersData),
      trainers: formatData(trainersData),
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getBookingChartData = async (req, res) => {
  const { period } = req.query;
  console.log(period)
  let dateRange = {};
  let matchCondition = {};

  // Determine the date range based on the period
  switch (period) {

    case 'yesterday':
      dateRange = {
        $gte: moment().subtract(1, 'days').startOf('day').toDate(),
        $lt: moment().startOf('day').toDate(),
      };
      break;
    case 'today':
      dateRange = {
        $gte: moment().startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last7days':
      dateRange = {
        $gte: moment().subtract(7, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last30days':
      dateRange = {
        $gte: moment().subtract(30, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last90days':
      dateRange = {
        $gte: moment().subtract(90, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'allTime':
      dateRange = null; // No restrictions, includes all data
      break;
    default:
      return res.status(400).send('Invalid period');
  }

  if (dateRange) {
    matchCondition.bookingDate = dateRange;
  }

  try {
    const data = await Booking.aggregate([
      { $match: matchCondition }, // Filter by the conditions you need, e.g., date range
      {
        $group: {
          _id: null,
          successful: {
            $sum: { $cond: [{ $eq: ["$bookingStatus", "success"] }, 1, 0] }
          },
          canceled: {
            $sum: { $cond: [{ $eq: ["$bookingStatus", "cancelled"] }, 1, 0] }
          },
          totalSuccessAmount: {
            $sum: {
              $cond: [{ $eq: ["$bookingStatus", "success"] }, "$bookingAmount", 0]
            }
          }
        }
      }
    ]);


    // Format the response to include the counts
    const result = {
      successful: data.length ? data[0].successful : 0,
      canceled: data.length ? data[0].canceled : 0,
      totalSuccessAmount:data.length ?data[0].totalSuccessAmount:0
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getTrainerIsVerifiedData = async (req, res) => {
  const role = 'trainer';
  const { period } = req.query;
  let matchCondition = { role };
  let groupByCondition = { _id: "$isVerified", count: { $sum: 1 } };
  let dateRange = {};

  switch (period) {
    case 'yesterday':
      dateRange = {
        $gte: moment().subtract(1, 'days').startOf('day').toDate(),
        $lt: moment().startOf('day').toDate(),
      };
      break;
    case 'today':
      dateRange = {
        $gte: moment().startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last7days':
      dateRange = {
        $gte: moment().subtract(7, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last30days':
      dateRange = {
        $gte: moment().subtract(30, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'last90days':
      dateRange = {
        $gte: moment().subtract(90, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      break;
    case 'allTime':
      dateRange = null; // No restrictions, includes all data
      break;
    default:
      return res.status(400).send('Invalid period');
  }

  if (dateRange) {
    matchCondition.createdAt = dateRange;
  }

  try {
    const data = await Trainer.aggregate([
      { $match: matchCondition },
      { $group: groupByCondition },
      { $sort: { _id: 1 } }, // Sort by _id (which is now the isVerified status)
    ]);

    // Format the data to include both verified and unverified counts
    const result = {
      verified: 0,
      unverified: 0,
    };

    data.forEach(item => {
      if (item._id === true) {
        result.verified = item.count;
      } else if (item._id === false) {
        result.unverified = item.count;
      }
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching trainer verification data:', error);
    res.status(500).send('Internal Server Error');
  }
};
const getTotalRevenueChartData = async (req, res) => {
  const { period } = req.query;
  let matchCondition = { bookingStatus: 'success' };
  let groupByCondition;
  let dateRange = {};
  let labelFormat = '';

  switch (period) {
    case 'yesterday':
      dateRange = {
        $gte: moment().subtract(1, 'days').startOf('day').toDate(),
        $lt: moment().startOf('day').toDate(),
      };
      labelFormat = 'YYYY-MM-DD';
      groupByCondition = { _id: { $dateToString: { format: labelFormat, date: "$bookingDate" } }, totalRevenue: { $sum: "$bookingAmount" } };
      break;
    case 'today':
      dateRange = {
        $gte: moment().startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      labelFormat = 'YYYY-MM-DD';
      groupByCondition = { _id: { $dateToString: { format: labelFormat, date: "$bookingDate" } }, totalRevenue: { $sum: "$bookingAmount" } };
      break;
    case 'last7days':
      dateRange = {
        $gte: moment().subtract(7, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      labelFormat = 'YYYY-MM-DD';
      groupByCondition = { _id: { $dateToString: { format: labelFormat, date: "$bookingDate" } }, totalRevenue: { $sum: "$bookingAmount" } };
      break;
    case 'last30days':
      dateRange = {
        $gte: moment().subtract(30, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      labelFormat = 'YYYY-MM-DD';
      groupByCondition = { _id: { $dateToString: { format: labelFormat, date: "$bookingDate" } }, totalRevenue: { $sum: "$bookingAmount" } };
      break;
    case 'last90days':
      dateRange = {
        $gte: moment().subtract(90, 'days').startOf('day').toDate(),
        $lt: moment().endOf('day').toDate(),
      };
      labelFormat = 'YYYY-MM-DD';
      groupByCondition = { _id: { $dateToString: { format: labelFormat, date: "$bookingDate" } }, totalRevenue: { $sum: "$bookingAmount" } };
      break;
    case 'allTime':
      dateRange = null; // No restrictions, includes all data
      labelFormat = 'YYYY-MM-DD'; // Adjust as needed for the entire period
      groupByCondition = { _id: { $dateToString: { format: labelFormat, date: "$bookingDate" } }, totalRevenue: { $sum: "$bookingAmount" } };
      break;
    default:
      return res.status(400).send('Invalid period');
  }

  if (dateRange) {
    matchCondition.bookingDate = dateRange;
  }

  try {
    const data = await Booking.aggregate([
      { $match: matchCondition },
      { $group: groupByCondition },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    // Generate labels based on the selected period
    const startDate = moment().startOf(period === 'allTime' ? 'year' : 'day');
    const endDate = moment().endOf('day');
    const labels = [];
    const revenueData = [];

    while (startDate.isBefore(endDate)) {
      const dateLabel = startDate.format(labelFormat);
      labels.push(dateLabel);

      const entry = data.find(d => d._id === dateLabel);
      revenueData.push(entry ? entry.totalRevenue : 0);

      startDate.add(1, 'day');
    }

    res.json({
      revenue: revenueData,
      labels: labels,
    });
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).send('Internal Server Error');
  }
};









module.exports ={
    adminLogin,
    logout,
    handleblockUser,
    handleblockTrainer,
    handleApprovalTrainer,
    handleRejectTrainer,
    getAllTrainers,
    getAllUsers,
    getDashBoardDatas,
    getUserChartDatas,
    getTrainerChartDatas,
    getBarChartData,
    getBookingChartData,
    getTrainerIsVerifiedData,
    getTotalRevenueChartData,
    

}

