import { Photo } from "pexels";

export type EmptyPhotos = {
  photos: [];
};

export type FavPh = {
  id: Photo["id"];
  src: {
    original: Photo["src"]["original"];
  };
  photographer: Photo["photographer"];
};

export type favouritePhotosStateType = {
  photos: FavPh[];
};
export type StoredPhotos = favouritePhotosStateType | null | undefined;
