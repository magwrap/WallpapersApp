import usePexels from "@/hooks/usePexels";
import { useNavigation } from "@react-navigation/native";

import { ErrorResponse, Photo, Photos } from "pexels";
import React, { useState } from "react";
import { View, Animated, RefreshControl } from "react-native";
import { ActivityIndicator, Divider, useTheme } from "react-native-paper";
import ListFooter from "./ListFooter";
import PhotoItem from "./PhotoItem";

interface ViewPhotosPageProps {
  queryName: string;
}

type EmptyPhotos = {
  photos: [];
};

//TODO: dodac ukrywajacy sie header
//TODO: doadc ekran gdzie sie szuka po nazwie
//TODO: naprawic favourites, --> czy stan to beda tylko id zdjec i je bedzie fetchowac , czy moze ich id, url i autor?
//TODO: dodac ekran ze swapowaniem zdjec
const ViewPhotosPage: React.FC<ViewPhotosPageProps> = ({ queryName }) => {
  const { fetchCategoryPhotos } = usePexels();
  const { colors } = useTheme();
  const { navigation } = useNavigation();

  const [page, setPage] = useState(1);
  const [photosPage, setPhotosPage] = useState<
    Photos | EmptyPhotos | ErrorResponse
  >({
    photos: [],
  });
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  React.useEffect(() => {
    getFirstPage();
  }, []);

  React.useEffect(() => {
    if ("page" in photosPage) {
      console.log(photosPage?.page);
    }
  }, [page]);

  const hideHeader = () => {
    navigation.setOptions({ headerShown: false });
  };

  const showHeader = () => {
    navigation.setOptions({ headerShown: true });
  };

  const onEndReached = async () => {
    if (!onEndReachedCalledDuringMomentum) {
      getNextPage();
      setOnEndReachedCalledDuringMomentum(true);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFirstPage();
    setInterval(() => setRefreshing(false), 1000);
  }, []);

  const getNextPage = async () => {
    setLoadingMore(true);
    const photosPg = await fetchCategoryPhotos(page, queryName);

    setPhotosPage({
      ...photosPg,
      photos:
        "photos" in photosPage && photosPg && "photos" in photosPg
          ? photosPage.photos.concat(photosPg.photos)
          : null,
    });

    setPage(page + 1);

    setLoadingMore(false);
  };

  const getFirstPage = async () => {
    setLoadingMore(true);

    const photosPg = await fetchCategoryPhotos(1, queryName);
    if (photosPg) {
      setPhotosPage(photosPg);
    }
    setPage(2);

    setLoadingMore(false);
  };

  const renderItem = React.useCallback(
    ({
      item: {
        id,
        src: { original },
      },
    }: {
      item: Photo;
    }) => {
      return (
        <View>
          <PhotoItem id={id} src={original} />
        </View>
      );
    },
    [] //refreshing
  );
  return (
    <View style={{ flex: 1 }}>
      {"photos" in photosPage && photosPage.photos.length ? (
        <Animated.FlatList
          numColumns={2}
          data={photosPage.photos}
          renderItem={renderItem}
          keyExtractor={(photo) => photo.id.toString()}
          ListFooterComponentStyle={{ height: 120, borderTopWidth: 1 }}
          onScrollBeginDrag={hideHeader}
          onScrollEndDrag={showHeader}
          ListFooterComponent={<ListFooter loadingMore={loadingMore} />}
          ItemSeparatorComponent={() => <Divider />}
          onEndReached={onEndReached.bind(this)}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator color={colors.third} />
        </View>
      )}
    </View>
  );
};

export default ViewPhotosPage;

//scroll header hiding done with: https://medium.com/swlh/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3
