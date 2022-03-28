import * as MediaLibrary from "expo-media-library";

export const addPhotoToLibary = async (uri: string) => {
    const albumName = "Wallpapers";
    const album = await MediaLibrary.getAlbumAsync(albumName);
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);

      if (album) {
        MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
      } else {
        MediaLibrary.createAlbumAsync(albumName, asset, false);
      }
    } catch (err) {
      console.error(err);
    }
  };