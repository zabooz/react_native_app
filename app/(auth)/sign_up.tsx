import { Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Sign_up = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn, setUser,isLoggedIn } = useGlobalContext();
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);

    try {
      await createUser(form.email, form.password, form.username);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      console.log(isLoggedIn)
      Alert.alert("Sign in successful");
      router.replace("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full h-full justify-center px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white mt-10 text-semibold font-psemibold">
              Sign up to Aora
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder="example@gmail.com"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-10"
              placeholder="password"
            />
            <CustomButton
              title={"Sign up"}
              handlePress={submit}
              containerStyle="mt-7"
              isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?{" "}
              </Text>
              <Link
                href="/sign_in"
                className="text-lg font-psemibold text-secondary"
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Sign_up;
