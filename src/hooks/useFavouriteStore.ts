import { actionCreators, State } from "@/state";
import { Photo } from "pexels";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";


const useFavouriteStore = () => {
  const dispatch = useDispatch();
  const { addPhoto, removePhoto } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const favPhotos: Photo[] = useSelector((state: State) => state.data);

  return {
      favPhotos,
      addPhoto,
      removePhoto,
  };
};

export default useFavouriteStore;
