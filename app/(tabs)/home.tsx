import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  GestureHandlerRootView,
  RefreshControl,
} from "react-native-gesture-handler";
import { images } from "@/constants";
import Search from "../search/[query]";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = useGlobalContext();

  const { data, refetch } = useAppwrite(getAllPosts);
  const { data: latestData} = useAppwrite(getLatestPosts);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    try {
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing;
    }
  }, []);

  

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full px-4">
        <FlatList
          data={data}
          keyExtractor={(item) => item.$Id}
          renderItem={({ item }) => <VideoCard key={item.$id} video={item} />}
          ListHeaderComponent={() => (
            <View>
              <View className="my-6  flex-row items-center justify-between ">
                <View className="justify-between  ">
                  <Text className="  font-pmedium text-sm text-gray-100">
                    Welcome back!
                  </Text>
                  <Text className="text-2xl text-white">{user}</Text>
                </View>
                <View>
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput />
              <View className="w-full flex-1 pt-5 pb-8 ">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest Videos
                </Text>
                <Trending posts={latestData} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                title="No videos found"
                subTitle="Try searching for something else"
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
