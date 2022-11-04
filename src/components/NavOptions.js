import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { AppStyles } from "../utils/styles";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native'
import { selectOrigin } from "../../slices/navSlice";
import { useSelector } from 'react-redux';

let data = [
  {
    id: "123",
    title: "Go Online",
    ridertitle: 'Get Ride',
    screen: '',
    url: "https://img.icons8.com/ios-filled/100/000000/car.png",
    origin: true,
    opacity: 1.0,
  },
  {
    id: "456",
    title: "View Profile",
    screen: '',
    url: "https://img.icons8.com/material/100/000000/user-male-circle--v1.png",
    origin: true,
    opacity: 1.0,
  },
  {
    id: "678",
    title: "View Friends",
    screen: 'Friends List',
    url: "https://img.icons8.com/ios-glyphs/100/000000/friends.png",
    origin: true,
    opacity: 1.0,
  },
  {
    id: "890",
    title: "Ride History",
    screen: 'Ride History',
    url: "https://img.icons8.com/ios-glyphs/100/000000/order-history.png",
    origin: true,
    opacity: 1.0,
  },
];

function NavOptions({ userType, userInfo }) {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  if (userType === 'Rider') {
    data[0].title = "Get Ride";
    data[0].screen = "Rider Map";
    data[1].screen = "Rider Profile"
    if (origin) {
      data[0].origin = true;
      data[0].opacity = 1.0;
    } else {
      data[0].origin = false;
      data[0].opacity = 0.1;
    }
  }
  if (userType === 'Driver') {
    data[0].screen = "Driver Map";
    data[0].title = "Go Online";
    data[0].origin = true;
    data[1].screen = "Driver Profile"
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!item.origin}
        >
          <View style={{
            opacity: item.opacity,
          }}>
            <Image
              style={{
                width: 100,
                height: 130,
                resizeMode: "contain",
              }}
              source={{ uri: item.url }}
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
    fontWeight: '900',
  },
  touchable: {
    padding: 2,
    paddingLeft: 6,
    paddingBottom: 8,
    paddingTop: 4,
    margin: 4,
    width: 150,
    // width: "45%",
    backgroundColor: "#7a7a7a",
    alignItems: 'center',
    borderRadius: 30,
  },
});
