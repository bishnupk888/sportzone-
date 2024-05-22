
const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken')


const generateToken = (admin) => {
    return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET_USER, {
      expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30)
    })
  }

  const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Email and password received:", email, password);
    console.log("In admin login backend", email, password);
  
    try {
      const admin = await Admin.findOne({ email });
      console.log("Admin found:", admin);
  
      if (!admin) {
        return res.status(400).json({ message: "No user found" });
      }
  
      // Use bcrypt to compare passwords
      const passwordMatch = (password === admin.password);
      console.log("Password match:", passwordMatch);
  
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
  
      const { _id, email: adminEmail, role } = admin; // Destructure correctly
      console.log({ _id, adminEmail, role });
  
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


module.exports ={
    adminLogin,
    logout
}

