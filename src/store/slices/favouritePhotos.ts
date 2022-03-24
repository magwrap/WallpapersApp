import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Photo } from "pexels";


export type FavPh = {
  id: Photo["id"],
  url: Photo["src"]["original"],
  author: Photo["photographer"],
}

type favouritePhotosStateType = {
  photos : FavPh[],
}

const initialState: favouritePhotosStateType = {
  photos : [],
};

const favouritePhotosSlice = createSlice({
  name: 'favouritePhotos',
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<FavPh>) => {state.photos.push(action.payload)},
    removePhoto : (state, action: PayloadAction<{id : number}>) => {
      return {photos: state.photos.filter((photo: FavPh) => photo.id !== action.payload.id)}
    },

  },
})

export const { addPhoto, removePhoto } = favouritePhotosSlice.actions;
export default favouritePhotosSlice.reducer; 
