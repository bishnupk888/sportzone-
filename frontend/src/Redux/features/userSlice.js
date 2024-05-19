// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: JSON.parse(localStorage.getItem('userData'))?.userRole || '',
  userId: JSON.parse(localStorage.getItem('userData'))?.userId || '',
  userImage: JSON.parse(localStorage.getItem('userData'))?.userImage || '',
};

const saveUserDataToLocalStorage = (state) => {
  const userData = {
    userRole: state.userRole,
    userId: state.userId,
    userImage: state.userImage,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      saveUserDataToLocalStorage(state);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      saveUserDataToLocalStorage(state);
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
      saveUserDataToLocalStorage(state);
    },
    clearData: (state) => {
      state.userRole = '';
      state.userId = '';
      state.userImage = '';
      localStorage.removeItem('userData');
    },
  },
});

export const { setUserRole, setUserId, setUserImage, clearData } = userSlice.actions;
export default userSlice.reducer;


