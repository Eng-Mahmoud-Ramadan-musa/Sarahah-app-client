import { createSlice } from "@reduxjs/toolkit";
import { getUsers, searchUsers } from "./auth"; // استيراد الإجراء

const initialState = {
  messages: [],
  filteredMessages: [],
  showData: 'all', 
  search: false,
  showInputMessage: false,
  listFavorite: []
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload.data;  
      state.showData =  action.payload.mangeState;
      state.listFavorite = action.payload.favorite || [];
    },
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
    deleteMessage: (state, action) => {
      
      state.messages = state.messages.filter((message ,index )=> index !== action.payload);
    },

    isFavorites: (state, action) => {
      const message = state.messages.find((message, index) => index === action.payload); 
      if (message) {
        message.favorite = !message.favorite;
      }
    },
    sortMessages: (state, action) => {
      if (action.payload.sort === 'asc') {
        state.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (action.payload.sort === 'desc') {
        state.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    },

    searchMessages: (state, action) => {
      const query = action.payload.title.toLowerCase();
      state.search = action.payload.search;
      state.showData =  action.payload.mangeState;
      state.filteredMessages = state.messages.filter((message) => message.content.toLowerCase().includes(query));
    },
    deleteAllMessages: (state) => {
      state.messages = [];
    }, 
    sendMessage: (state, action) => {
      state.showData =  action.payload.mangeState;
    },
    toggleInputMessage: (state) => {
      state.showInputMessage = !state.showInputMessage
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers, (state, action) => {
      state.showData = action.payload.mangeState;
    });
    builder.addCase(searchUsers, (state, action) => {
      state.showData =  action.payload.mangeState;

    });
  },
});

export const { getMessages, addMessage,sendMessage, deleteMessage,toggleInputMessage , updateButton, isFavorites, sortMessages, filterMessages, searchMessages, deleteAllMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
