// features/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getAdminDataFromLocalStorage = () => {
  try {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (adminData) {
      return {
        adminRole: adminData.adminRole || '',
        adminEmail: adminData.adminEmail || '',
      };
    }
  } catch (error) {
    console.error('Failed to parse admin data from localStorage:', error);
  }
  return {
    adminRole: '',
    adminEmail: '',
  };
};

const initialState = getAdminDataFromLocalStorage();

const saveAdminDataToLocalStorage = (state) => {
  try {
    const adminData = {
      adminRole: state.adminRole,
      adminEmail: state.adminEmail,
    };
    localStorage.setItem('adminData', JSON.stringify(adminData));
  } catch (error) {
    console.error('Failed to save admin data to localStorage:', error);
  }
};

const adminSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminRole = action.payload.role;
      state.adminEmail = action.payload.email;

      saveAdminDataToLocalStorage(state);
    },
    clearAdminData: (state) => {
      state.adminRole = '';
      state.adminEmail = '';
      localStorage.removeItem('adminData');
    },
  },
});

export const { setAdminData, clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
