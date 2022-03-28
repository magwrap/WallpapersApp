import AsyncStorage from '@react-native-async-storage/async-storage';
import { favouritePhotosStateType, StoredPhotos } from 'types';


const STORAGE_KEY = "@photosState"
export const storePhotos = async (photosState : favouritePhotosStateType) => {
try {
      const jsonPhotosState = JSON.stringify(photosState)
      await AsyncStorage.setItem(STORAGE_KEY, jsonPhotosState)
    } catch (err) {
      console.error(err);
    }
  }
  
export const getPhotos = async () : Promise<StoredPhotos> => {
    try {
      const jsonPhotosState = await AsyncStorage.getItem(STORAGE_KEY)
      return jsonPhotosState != null ? JSON.parse(jsonPhotosState) : null;
    } catch(err) {
      console.error(err);
    }
  }


