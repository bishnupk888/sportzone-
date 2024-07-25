import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: '',
  userId: '',
  userImage: '',
  userName: '',
  isBlocked: false
};

const getUserDataFromLocalStorage = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData || initialState;
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error);
    return initialState;
  }
};
const saveUserDataToLocalStorage = (state) => {
  try {
    const userData = {
      userRole: state.userRole,
      userId: state.userId,
      userImage: state.userImage,
      userName: state.userName,
      isBlocked: state.isBlocked
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to save user data to localStorage:', error);
  }
};

const userSlice = createSlice({
  name: 'userData',
  initialState: getUserDataFromLocalStorage(),
reducers: {
    setUserData: (state, action) => {
      const { role, _id, profileImage, username, isBlocked } = action.payload;
      state.userRole = role;
      state.userId = _id;
      state.userImage = profileImage;
      state.userName = username;
      state.isBlocked = isBlocked;
      
      saveUserDataToLocalStorage(state);
    },
    clearUserData: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem('userData');
    },
    setBlockedStatus: (state, action) => {
      state.isBlocked = action.payload;
      saveUserDataToLocalStorage(state);
    }
  },
});

export const { setUserData, clearUserData, setBlockedStatus } = userSlice.actions;
export default userSlice.reducer;
