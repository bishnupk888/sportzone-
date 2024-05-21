

const otps = {};

const setOtp = (email, otpData) => {
  try {
    otps[email] = otpData;
  } catch (error) {
    throw new Error(`Failed to set OTP for ${email}`);
  }
};

const getOtp = (email) => {
  try {
    return otps[email];
  } catch (error) {
    throw new Error(`Failed to get OTP for ${email}`);
  }
};

const deleteOtp = (email) => {
  try {
    delete otps[email];
  } catch (error) {
    throw new Error(`Failed to delete OTP for ${email}`);
  }
};


module.exports = {
  setOtp,
  getOtp,
  deleteOtp
};