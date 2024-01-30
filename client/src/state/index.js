import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setChannels: (state, action) => {
      state.channels = action.payload.channels;
    },
    setAdverts: (state, action) => {
      state.adverts = action.payload.adverts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setChannel: (state, action) => {
      const updatedChannels = state.channels.map((channel) => {
        if (channel._id === action.payload.channel._id) return action.payload.channel;
        return channel;
      });
      state.channels = updatedChannels;
    },
    setAdvert: (state, action) => {
      const updatedAdverts = state.adverts.map((advert) => {
        if (advert._id === action.payload.advert._id) return action.payload.advert;
        return advert;
      });
      state.adverts = updatedAdverts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setChannels, setAdverts, setAdvert, setPost, setChannel } =
  authSlice.actions;
export default authSlice.reducer;