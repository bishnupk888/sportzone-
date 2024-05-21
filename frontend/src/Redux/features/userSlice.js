// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getUserDataFromLocalStorage = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      return {
        userRole: userData.userRole || '',
        userId: userData.userId || '',
        userImage: userData.userImage || '',
        userName:userData.userName || ''
      };
    }
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error);
  }
  return {
    userRole: '',
    userId: '',
    userImage: '',
    userName:''
  };
};

const initialState = getUserDataFromLocalStorage();

const saveUserDataToLocalStorage = (state) => {
  try {
    const userData = {
      userRole: state.userRole,
      userId: state.userId,
      userImage: state.userImage,
      userName : state.userName
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to save user data to localStorage:', error);
  }
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      console.log('Data in userReducer = ', action.payload);
      state.userRole = action.payload.role;
      state.userId = action.payload._id;
      state.userImage = action.payload.profileImage;
      state.userName = action.payload.username;

      saveUserDataToLocalStorage(state);
    },
    clearUserData: (state) => {
      state.userRole = '';
      state.userId = '';
      state.userImage = '';
      state.userName = ''
      localStorage.removeItem('userData');
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
