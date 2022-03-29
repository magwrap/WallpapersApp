import usePexels from "@/hooks/usePexels";
import { DrawerScreenNames } from "@/navigation/App/Drawer/DrawerScreenNames";
import { ErrorResponse, Photo, Photos } from "pexels";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ActivityIndicator, Divider, useTheme } from "react-native-paper";
import Animated, {
  Extrapolate,
  interpolateNode,
} from "react-native-reanimated";
import { EmptyPhotos, FavPh } from "types";
import Header from "../Header";
import AnimatedFlatList from "./AnimatedFlatList";
import ErrorMessage from "./ErrorMessage";
import ListFooter from "./ListFooter";
import NoFavPhotosText from "./NoFavPhotosText";
import PhotoItem from "./PhotoItem";
const { Value } = Animated;

interface ViewPhotosPageProps {
  queryName: string;
  navigation: any;
  screenName: string;
  favPhotos?: FavPh[] | null;
}

//TODO: zrobic jakas defragmentacje i optymalizacje kodu tutaj
//TODO: poprawic ukrywajacy sie header
const HEADER_HEIGHT = 60;
const ViewPhotosPage: React.FC<ViewPhotosPageProps> = ({
  queryName,
  navigation,
  screenName,
  favPhotos = null,
}) => {
  const { fetchCategoryPhotos, fetchSearchPhotos } = usePexels();
  const { colors } = useTheme();
  const [page, setPage] = useState(1);
  const [photosPage, setPhotosPage] = useState<
    Photos | EmptyPhotos | ErrorResponse | { photos: FavPh[] }
  >({
    photos: [],
  });
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  //header
  const scrollY = useRef(new Value(0));
  const _diff_clamp_scrollY = Animated.diffClamp(
    scrollY.current,
    0,
    HEADER_HEIGHT
  );
  const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
  const height = interpolateNode(_diff_clamp_scrollY, {
    inputRange: [0, HEADER_HEIGHT + statusBarHeight - statusBarHeight / 2],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolateNode(_diff_clamp_scrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(_diff_clamp_scrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const onMomentumScrollBegin = () => {
    setOnEndReachedCalledDuringMomentum(false);
  };

  useEffect(() => {
    !favPhotos && getFirstPage();
  }, [queryName]);

  useEffect(() => {
    if (favPhotos) {
      setPhotosPage({
        photos: favPhotos,
      });
    }
  }, [favPhotos]);

  const onEndReached = async () => {
    if (!onEndReachedCalledDuringMomentum) {
      !favPhotos && getNextPage();
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    !favPhotos && getFirstPage();
    setInterval(() => setRefreshing(false), 1000);
  }, []);

  const getNextPage = async () => {
    setLoadingMore(true);
    const photosPg =
      screenName === DrawerScreenNames.CATEGORY
        ? await fetchSearchPhotos(page, queryName, setError)
        : await fetchCategoryPhotos(page, queryName, setError);

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
    setError(false);
    setLoadingMore(true);

    const photosPg =
      screenName === DrawerScreenNames.CATEGORY
        ? await fetchSearchPhotos(1, queryName, setError)
        : await fetchCategoryPhotos(1, queryName, setError);
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
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            zIndex: 1,
            height,
            transform: [{ translateY }],
            opacity,
          },
        ]}>
        <Header
          route={{ name: screenName }}
          navigation={navigation}
          height={HEADER_HEIGHT}
        />
      </Animated.View>

      {"photos" in photosPage && photosPage.photos.length ? (
        <AnimatedFlatList
          numColumns={2}
          data={photosPage.photos}
          renderItem={renderItem}
          keyExtractor={(photo: Photo) => photo.id.toString()}
          ListFooterComponentStyle={styles.listFooter}
          ListFooterComponent={<ListFooter loadingMore={loadingMore} />}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <Divider />}
          onEndReached={onEndReached.bind(this)}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={onMomentumScrollBegin}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={5}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY.current } },
            },
          ])}
        />
      ) : (
        <>
          {favPhotos ? (
            <NoFavPhotosText />
          ) : (
            <>
              {error ? (
                <ErrorMessage func={() => getFirstPage} />
              ) : (
                <View style={styles.activityIndicator}>
                  <ActivityIndicator color={colors.third} />
                </View>
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewPhotosPage;

const styles = StyleSheet.create({
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  listFooter: { height: 120, borderTopWidth: 1 },
  flatList: {
    // paddingTop: HEADER_HEIGHT,
    zIndex: 10,
  },
});
//https://youtu.be/y8Jy2vxXVFw
