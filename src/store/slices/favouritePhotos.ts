
import { storePhotos } from "@/hooks/useAsyncStoragePhotos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { favouritePhotosStateType, FavPh } from "types";

let initialState: favouritePhotosStateType = {
  photos : [],
};


const favouritePhotosSlice = createSlice({
  name: 'favouritePhotos',
  initialState,
  reducers: {
    updateState : (state, action: PayloadAction<favouritePhotosStateType>) => {
      return {photos : action.payload.photos};
    },
    addPhoto: (state, action: PayloadAction<FavPh>) => {
      state.photos.push(action.payload);
      storePhotos(state);
    },
    removePhoto : (state, action: PayloadAction<{id : number}>) => {
      const newState =  {photos: state.photos.filter((photo: FavPh) => photo.id !== action.payload.id)}
      storePhotos(newState);
      return newState;
    },

  },
})

export const { updateState, addPhoto, removePhoto } = favouritePhotosSlice.actions;
export default favouritePhotosSlice.reducer; 
