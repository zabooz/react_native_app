import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect } from "react";
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href="/home" />;
  }
  console.log(isLoggedIn);
  return (
    <GestureHandlerRootView className="h-full">
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="px-4  w-full h-full items-center justify-center ">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="w-[380px] h-[300px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless Possibilities with{" "}
                <Text className="text-secondary-200">Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm  font-pregular text-gray-100 mt-7 text-center">
              Where creattivity meets Innovation: embark on a journey of
              limitless explaoriotn with Aora
            </Text>
            <CustomButton
              title="Continue wie E-mail"
              handlePress={() => router.push("/sign_in")}
              containerStyle="w-full mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </GestureHandlerRootView>
  );
}
