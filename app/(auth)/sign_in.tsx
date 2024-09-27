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
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
const Sign_in = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {

      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      console.log(result);
      setUser(result);
      setIsLoggedIn(true);
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
              Log in to Aora
            </Text>
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
              otherStyles="mt-7"
              placeholder="password"
            />
            <CustomButton
              title={"Sign in"}
              handlePress={submit}
              containerStyle="mt-7"
              isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?{" "}
              </Text>
              <Link
                href="/sign_up"
                className="text-lg font-psemibold text-secondary"
              >
                Sign up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Sign_in;
