import { TouchableOpacity, Text, Pressable } from "react-native";
import React from "react";

interface Props {
  title: string;
  handlePress: () => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  isLoading,
  textStyle,
}: Props) => {
  return (
    <Pressable
      className={`bg-secondary-100 min-h-[62px] justify-center items-center rounded-xl ${containerStyle} ${
        isLoading && "opacity-50"
      }`}
      onPress={handlePress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      disabled={isLoading}
    >
      <Text className={` ${textStyle}   text-primary font-psemibold text-lg`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
