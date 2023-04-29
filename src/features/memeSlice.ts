import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface MemeType {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
}

type MemeState = {
  meme: MemeType[];
  status: string;
};
const initialState: MemeState = {
  meme: [],
  status: "none",
};
export const getMemeThunk = createAsyncThunk("meme/getMemeThunk", async () => {
  const res = await axios.get("https://api.imgflip.com/get_memes");
  return res.data.data.memes;
});

const memeSLice = createSlice({
  name: "meme",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMemeThunk.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      getMemeThunk.fulfilled,
      (state, action: PayloadAction<MemeType[]>) => {
        state.meme = action.payload;
        state.status = "fulfilled";
      }
    );
  },
});
export const {} = memeSLice.actions;
export default memeSLice.reducer;
