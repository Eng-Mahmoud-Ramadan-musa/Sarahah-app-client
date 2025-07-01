import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: (() => {
        const user = localStorage.getItem("user");
        if (!user) return null; // إذا كانت القيمة فارغة
        try {
          return JSON.parse(user); // محاولة تحليل البيانات
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
          return null; // في حال كان هناك خطأ أثناء التحليل
        }
      })(),
      token: localStorage.getItem("access_token") || null,

    isAuthenticated: false,
    users: [],
    filteredUsers: false,
    updateUser: false
  };
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    receiverData: {},
    reducers: {
        loginSuccess: (state, action) => {
                    state.isAuthenticated = true;
                    localStorage.setItem("user", JSON.stringify(action.payload.user));
                    localStorage.setItem("access_token", action.payload.access_token);
                    localStorage.setItem("refresh_token", action.payload.refresh_token);

        },
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
            window.location.href = '/'
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
        save: (state, action) => {
            state.currentUser = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
   
        },
        getUsers: (state, action) => {
          state.users = action.payload.data;  
        },
        searchUsers: (state, action) => {
        const query = action.payload.title.toLowerCase();
        state.search = action.payload.search;
          state.filteredUsers = state.users.filter(
            (user) =>
              user.userName.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query)
          );
        },
        sortUsers: (state, action) => {
          // state.showData = action.payload.mangeState;
          if (action.payload.sort === "asc") {
            state.users.sort((a, b) => a.userName.localeCompare(b.userName));
          } else if (action.payload.sort === "desc") {
            state.users.sort((a, b) => b.userName.localeCompare(a.userName));
          }
        },        
        deleteUser: (state, action) => {
          state.users = state.users.filter((user ,index )=> index !== action.payload);
        },
        updated: (state) => {
          state.updateUser = !state.updateUser 
        },
        friendOrBlock: (state, action) => {
          const { FB, email } = action.payload; // استخراج القيم من الـ payload
          
          if (FB) {
            const userExistIndex = state.currentUser.friends.indexOf(email);
            if (userExistIndex !== -1) {
              state.currentUser.friends.splice(userExistIndex, 1);
            } else {
              state.currentUser.friends.push(email);
        
              const blockIndex = state.currentUser.blockUser.indexOf(email);
              if (blockIndex !== -1) {
                state.currentUser.blockUser.splice(blockIndex, 1);
              }
            }
          } else {
            const userExistIndex = state.currentUser.blockUser.indexOf(email);
        
            if (userExistIndex !== -1) {
              state.currentUser.blockUser.splice(userExistIndex, 1);
            } else {
              state.currentUser.blockUser.push(email);
        
              const friendIndex = state.currentUser.friends.indexOf(email);
              if (friendIndex !== -1) {
                state.currentUser.friends.splice(friendIndex, 1);
              }
            }
          }
        },
    },
})

export const {loginSuccess,sortUsers , logout,searchUsers ,friendOrBlock , deleteUser , getUsers , save, updated} = authSlice.actions;
export default authSlice.reducer;