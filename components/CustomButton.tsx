import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  buttonStyle,
  textStyle,
  title,
  handlePress,
  isLoading,
}: {
  buttonStyle?: String;
  textStyle?: String;
  title: String;
  handlePress: () => void;
  isLoading: boolean;
}) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center min-h-[62px]  rounded-md ${buttonStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`${textStyle} font-psemibold text-lg`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
