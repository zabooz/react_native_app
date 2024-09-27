import React from "react";
import { Tabs } from "expo-router";
import {
  View,
  Image,
  Text,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import icons from "../../constants/icons";

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={[styles.icon]}
      />
      <Text
        style={[
          styles.text,
          { color: color, fontWeight: focused ? "bold" : "normal" },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffA001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      {[
        { name: "home", title: "Home", icon: icons.home },
        { name: "bookmark", title: "Bookmark", icon: icons.bookmark },
        { name: "create", title: "Create", icon: icons.plus },
        { name: "profile", title: "Profile", icon: icons.profile },
      ].map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icon}
                color={color}
                name={title}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
  },
});

export default TabsLayout;
