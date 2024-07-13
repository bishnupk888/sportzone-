
import axiosInstance from "../axiosInstance/axiosInstance";


// auth api calls

const login = async (formData) => {
    return await axiosInstance.post('/api/auth/login', formData);
  };
const signUp = async(formData) =>{
    return await axiosInstance.post('/api/auth/register', formData)
}
const googleSignIn = async(email,role)=>{
    return await axiosInstance.post('/api/auth/google-sign-in', { email ,role })
}
const logout = async () => {
    return await axiosInstance.post('/api/auth/logout')
  };
const adminLogin = async (formData)=>{
    return await axiosInstance.post('/api/admin/login', formData)
}
const adminLogout = async()=>{
    return await axiosInstance.post('/api/admin/logout')
}
const resetPassword = async(formData)=>{
    return await axiosInstance.post('/api/auth/reset-password', formData)
}
const googleSignUp = async(name,email,password,role)=>{
    return await axiosInstance.post('/api/auth/google-sign-up', {name, email , password,role })
}
const VerifyOtpForResetPassword =async(data)=>{
    return await axiosInstance.post('/api/auth/reset-password/verify-otp', {data })
}

// user api calls
const getUser = async(userId)=>{
    return await axiosInstance.get(`/api/users/${userId}`)
}
const fetchAllTrainers = async () => {
    return await axiosInstance.get('/api/users/get-trainers');
};
const getUserBookingDetails = async(bookingId) => {
    return await axiosInstance.get(`/api/users/booking-details/${bookingId}`)
}
const updateUserData = async(userId, userData)=>{
    return await axiosInstance.put(`/api/users/${userId}`, userData)   
}
const getUserBookings = async(userId)=>{
    return await axiosInstance.get(`/api/users/mybookings/${userId}`)
}
const cancelUserBooking = async(bookingId)=>{
    return await axiosInstance.post(`/api/users/cancel-booking/${bookingId}`)
}
const uploadUserImage = async(userId,url)=>{
    return await  axiosInstance.patch(`/api/users/${userId}/profile-image`, { imageUrl: url })
}
const getServicesList = async() =>{
    return await axiosInstance.get('/api/users/services/list')
}
const getTrainerProfile = async(id)=>{
    return await axiosInstance.get(`/api/users/trainer-profile/${id}`)
}
const getAvailableSlots = async(id)=>{
    return await axiosInstance.get(`/api/users/available-slots/${id}`)
}
const getUserTransactions = async(userId)=>{
    return await axiosInstance.get(`/api/users/transactions/${userId}`);
}
 



// admin api calls
const getAllUsers = async()=>{
    return await axiosInstance.get('/api/admin/users')
}
const ManageBlockUser = async(id)=>{
    return await axiosInstance.patch(`/api/admin/${id}/block-user`)
}
const getAllBookings  = async ()=>{
    return await axiosInstance.get('/api/admin/bookings')
}
const getAllTrainers = async()=>{
    return await axiosInstance.get('/api/admin/trainers')
}
const trainerAproval = async(id)=>{
    return await axiosInstance.patch(`/api/admin/${id}/trainer-approval`)
}
const trainerRejection = async(id,reason)=>{
    return await axiosInstance.patch(`/api/admin/${id}/trainer-rejection`, { reason })
}
const manageBlockTrainer = async(id)=>{
    return await axiosInstance.patch(`/api/admin/block-trainer/${id}`)
}


// trainer api calls
const getAllSlots = async (trainerId)=>{
    return await axiosInstance.get(`/api/trainers/${trainerId}/slots`)
};
const addNewSlot = async (newSlot) => {
      return await axiosInstance.post('/api/trainers/slots/add-slot', newSlot);
  };
  const deleteSlot = async (slotId) => {
    return await axiosInstance.delete(`/api/trainers/slots/delete-slot/${slotId}`)
};
const editSlot = async (slotId , updatedSlot) => {
    return await axiosInstance.put(`/api/trainers/slots/edit-slot/${slotId}`, updatedSlot)
};
const getTrainerBookingDetails = async (bookingId)=>{
    return await axiosInstance.get(`/api/trainers/booking-details/${bookingId}`)
}
const getTrainerBookings = async(trainerId)=>{
    return await axiosInstance.get(`/api/trainers/bookings/${trainerId}`)
}
const getTrainerData = async(userId)=>{
    return await axiosInstance.get(`/api/trainers/${userId}`)
}
const uploadTrainerImage = async(userId,url)=>{
    return await axiosInstance.patch(`/api/trainers/${userId}/profile-image`,{imageUrl:url})
}
const updateTrainerData = async(userId,trainerData)=>{
        return await axiosInstance.put(`/api/trainers/${userId}`, trainerData)
}
const uploadTrainerCertificate = async(userId, certificateUrl)=>{
    return await axiosInstance.patch(`/api/trainers/${userId}/certificate`, { certificateUrl });
}
const getTrainerTransactions = async (userId)=>{
    return await axiosInstance.get(`/api/trainers/transactions/${userId}`);
}



// socket api
const getChat = async(chatId)=>{
    return await axiosInstance.get(`/api/chat/${chatId}`)
}
const getAllChat = async(userRole, userId)=>{
    return await axiosInstance.get(`/api/chat/messages/${userRole}/${userId}`)
}
const getChatByUserIdAndTrainerId = async(trainerId,userId)=>{
    return await axiosInstance.get(`/api/chat/getchat/${trainerId}/${userId}`);
}
const getNotifications =async(userId)=>{
    console.log('userId on getAll notifications  = ',userId)
    return await axiosInstance.get(`/api/notifications/${userId}`)
}


// payment api
const walletPayment = async(checkoutData)=>{
    return await axiosInstance.post('/api/bookings/wallet-payment', { checkoutData })
}
const onlinePayment = async(checkoutData)=>{
    return await axiosInstance.post('/api/bookings/checkout-session', { checkoutData })
}




 export default {
    signUp,
    login,
    googleSignIn,
    logout,
    adminLogin,
    adminLogout,
    resetPassword,
    googleSignUp,
    VerifyOtpForResetPassword,


    getUser,
    updateUserData,
    getUserBookingDetails,
    fetchAllTrainers,
    getUserBookings,
    cancelUserBooking,
    uploadUserImage,
    getServicesList,
    getTrainerProfile,
    getAvailableSlots,
    getUserTransactions,



    getAllUsers,
    ManageBlockUser,
    getAllBookings,
    getAllTrainers,
    trainerAproval,
    trainerRejection,
    manageBlockTrainer,


    getAllSlots,
    addNewSlot,
    deleteSlot,
    editSlot,
    getTrainerBookingDetails,
    getTrainerBookings,
    getTrainerData,
    uploadTrainerImage,
    updateTrainerData,
    uploadTrainerCertificate,
    getTrainerTransactions,


    getChat,
    getAllChat,
    getChatByUserIdAndTrainerId,
    getNotifications,

    walletPayment,
    onlinePayment,
 }
