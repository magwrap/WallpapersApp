import usePexels from "@/hooks/usePexels";
import { DrawerScreenNames } from "@/navigation/App/Drawer/DrawerScreenNames";
import { StatusBar } from "expo-status-bar";

import { ErrorResponse, Photo, Photos } from "pexels";
import React, { useEffect, useRef, useState } from "react";
import { View, RefreshControl, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator, Divider, useTheme } from "react-native-paper";
import Animated, {
  Extrapolate,
  interpolateNode,
} from "react-native-reanimated";
import Header from "../Header";
import AnimatedFlatList from "./AnimatedFlatList";
import ListFooter from "./ListFooter";
import PhotoItem from "./PhotoItem";

interface ViewPhotosPageProps {
  queryName: string;
  navigation: any;
}

type EmptyPhotos = {
  photos: [];
};
const { Value } = Animated;

//TODO: naprawic bug przy scrollowaniu ekran sie scina

const CONTAINER_HEIGHT = 50;
const ViewPhotosPage: React.FC<ViewPhotosPageProps> = ({
  queryName,
  navigation,
}) => {
  const { fetchCategoryPhotos } = usePexels();
  const { colors } = useTheme();

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

  //header
  const max = 80;
  const scrollY = useRef(new Value(0));
  const _diff_clamp_scrollY = Animated.diffClamp(scrollY.current, 0, max);

  const height = interpolateNode(_diff_clamp_scrollY, {
    inputRange: [0, max],
    outputRange: [max, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolateNode(_diff_clamp_scrollY, {
    inputRange: [0, max],
    outputRange: [0, -max],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(_diff_clamp_scrollY, {
    inputRange: [0, max],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const onMomentumScrollBegin = () => {
    // StatusBar.setStatusBarHidden(true, "slide");
    setOnEndReachedCalledDuringMomentum(false);
  };

  useEffect(() => {
    getFirstPage();
  }, []);

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
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.header,
          {
            height,
            transform: [{ translateY }],
            opacity,
          },
        ]}>
        <Header
          route={{ name: DrawerScreenNames.MAIN }}
          navigation={navigation}
        />
      </Animated.View>
      {"photos" in photosPage && photosPage.photos.length ? (
        <AnimatedFlatList
          numColumns={2}
          data={photosPage.photos}
          renderItem={renderItem}
          keyExtractor={(photo) => photo.id.toString()}
          ListFooterComponentStyle={{ height: 120, borderTopWidth: 1 }}
          ListFooterComponent={<ListFooter loadingMore={loadingMore} />}
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
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator color={colors.third} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewPhotosPage;

const styles = StyleSheet.create({
  header: {
    height: CONTAINER_HEIGHT,
    paddingHorizontal: 0,
  },
});
//https://youtu.be/y8Jy2vxXVFw
