import * as React from "react";

interface MainScreenProps {
  navigation: any;
}

import ViewPhotosPage from "@/components/Photos/ViewPhotosPage";

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  //   const fetchPhotos = () => {
  //     setPhotosPage({
  //       total_results: 100,
  //       page: 1,
  //       per_page: 5,
  //       next_page: 12,
  //       photos: [
  //         {
  //           id: 1,
  //           width: 100,
  //           height: 100,
  //           url: "123",
  //           photographer: "Jan Musiol",
  //           photographer_url: "11",
  //           photographer_id: "12",
  //           liked: false,
  //           src: {
  //             original:
  //               "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
  //             large2x: "",
  //             large: "",
  //             medium: "",
  //             small: "",
  //             portrait: "",
  //             landscape: "",
  //             tiny: "",
  //           },
  //         },
  //         {
  //           id: 2,
  //           width: 100,
  //           height: 100,
  //           url: "123",
  //           photographer: "Jan Musiol",
  //           photographer_url: "11",
  //           photographer_id: "12",
  //           liked: false,
  //           src: {
  //             original:
  //               "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg",
  //             large2x: "",
  //             large: "",
  //             medium: "",
  //             small: "",
  //             portrait: "",
  //             landscape: "",
  //             tiny: "",
  //           },
  //         },
  //         {
  //           id: 3,
  //           width: 100,
  //           height: 100,
  //           url: "123",
  //           photographer: "Jan Musiol",
  //           photographer_url: "11",
  //           photographer_id: "12",
  //           liked: false,
  //           src: {
  //             original:
  //               "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg",
  //             large2x: "",
  //             large: "",
  //             medium: "",
  //             small: "",
  //             portrait: "",
  //             landscape: "",
  //             tiny: "",
  //           },
  //         },
  //         {
  //           id: 4,
  //           width: 100,
  //           height: 100,
  //           url: "123",
  //           photographer: "Jan Musiol",
  //           photographer_url: "11",
  //           photographer_id: "12",
  //           liked: false,
  //           src: {
  //             original: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
  //             large2x: "",
  //             large: "",
  //             medium: "",
  //             small: "",
  //             portrait: "",
  //             landscape: "",
  //             tiny: "",
  //           },
  //         },
  //         {
  //           id: 5,
  //           width: 100,
  //           height: 100,
  //           url: "123",
  //           photographer: "Jan Musiol",
  //           photographer_url: "11",
  //           photographer_id: "12",
  //           liked: false,
  //           src: {
  //             original:
  //               "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg",
  //             large2x: "",
  //             large: "",
  //             medium: "",
  //             small: "",
  //             portrait: "",
  //             landscape: "",
  //             tiny: "",
  //           },
  //         },
  //       ],
  //     });
  //   };

  return <ViewPhotosPage queryName="New" />;
};

export default MainScreen;
