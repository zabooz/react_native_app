import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { icons } from "@/constants";
interface Props {
  title: string;
  value: string;
  handleChangeText: (value: string) => void;
  otherStyles: string;
  keyboardType?: string;
  placeholder?: string;
}
const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 bg-black-100 border-2 border-red-500 rounded-2xl focus:border-secondary items-center flex-row px-4">
        <TextInput
          className="flex-1 text-white font-psemibold "
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6"
            resizeMode="contain" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default FormField;
