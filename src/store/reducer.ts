import { combineReducers } from '@reduxjs/toolkit';
import favPhotoReducer from './slices/favouritePhotos';

const rootReducer = combineReducers({favPhotoReducer})
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>