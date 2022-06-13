import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndpoints } from "../../services/api";
import { getData } from "../../utils/storage";
import { RootState } from "..";
import axiosInstance from "../../services/axiosInterceptor";

interface PlaylistState {
  isLoading: boolean;
  data: any;
  isError: boolean;
}

const initialState: PlaylistState = {
  isLoading: false,
  data: [],
  isError: false,
};

const plalistSlice = createSlice({
  name: "plalist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPlaylist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserPlaylist.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserPlaylist.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const playlistSelector = (state: RootState) => state.playlist;
export default plalistSlice.reducer;

export const fetchUserPlaylist = createAsyncThunk("user/playlist", async () => {
  const userId: any = await getData("@userid");
  const url = apiEndpoints.getUserPlaylist();

  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    return error;
  }
});
