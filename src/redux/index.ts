import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import playlistReducer from "./slices/playlist";
import albumsReducer from "./slices/albums";

export const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
    album: albumsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
