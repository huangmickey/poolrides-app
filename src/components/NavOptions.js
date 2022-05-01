import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import carPic from "../../assets/car.png";
import friendsPic from "../../assets/friends.png";
import historyPic from "../../assets/history.png";
import profilePic from "../../assets/profile.jpg";
import { AppStyles } from "../utils/styles";
import { Icon } from "react-native-elements";

const CAR_IMG = Image.resolveAssetSource(carPic).uri;
const FRIENDS_IMG = Image.resolveAssetSource(friendsPic).uri;
const HISTORY_IMG = Image.resolveAssetSource(historyPic).uri;
const PROFILE_IMG = Image.resolveAssetSource(profilePic).uri;

const data = [
  {
    id: "123",
    title: "Go Online",
    image: CAR_IMG,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "View Profile",
    image: PROFILE_IMG,
    screen: "ProfileScreen",
  },
  {
    id: "678",
    title: "View Friends",
    image: FRIENDS_IMG,
    screen: "FriendsScreen",
  },
  {
    id: "890",
    title: "View Ride History",
    image: HISTORY_IMG,
    screen: "RideScreen",
  },
];

const NavOptions = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.touchable}>
          <View>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <Text style={styles.titles}>{item.title}</Text>
            <Icon
              style={styles.arrow}
              name="arrowright"
              color={AppStyles.color.mint}
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  arrow: {
    padding: 2,
    backgroundColor: AppStyles.color.black,
    borderRadius: 30 / 2,
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  titles: {
    alignSelf: "center",
    fontWeight: "600",
  },
  touchable: {
    padding: 2,
    paddingLeft: 6,
    paddingBottom: 8,
    paddingTop: 4,
    margin: 4,
    width: 150,
    backgroundColor: AppStyles.color.gray,
    alignItems: "center",
  },
});
