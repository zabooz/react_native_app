import { TouchableOpacity, Text } from "react-native";
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
    <TouchableOpacity
      className={`bg-secondary-100 min-h-[62px] justify-center items-center rounded-xl ${containerStyle} ${
        isLoading && "opacity-50"
      }`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={` ${textStyle}   text-primary font-psemibold text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
