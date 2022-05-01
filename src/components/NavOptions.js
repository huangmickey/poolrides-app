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

let data = [
  {
    id: "123",
    title: "Go Online",
    ridertitle: 'Get Ride',
    riderscreen: 'Rider Map Screen',
    driverscreen: 'Driver Map Screen',
    url: "https://img.icons8.com/ios-filled/100/000000/car.png",
  },
  {
    id: "456",
    title: "View Profile",
    riderscreen: 'Profile Screen',
    driverscreen: 'Profile Screen',
    url: "https://img.icons8.com/material/100/000000/user-male-circle--v1.png",
  },
  {
    id: "678",
    title: "View Friends",
    riderscreen: 'Friends Screen',
    driverscreen: 'Friends Screen',
    url: "https://img.icons8.com/ios-glyphs/100/000000/friends.png",
  },
  {
    id: "890",
    title: "Ride History",
    riderscreen: 'Ride History Screen',
    driverscreen: 'Ride History Screen',
    url: "https://img.icons8.com/ios-glyphs/100/000000/order-history.png",
  },
];



function NavOptions({ userType }) {
  const navigation = useNavigation();
  data[0].title = userType === 'Rider' ? 'Get Ride' : 'Go Online';

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate(userType == 'Rider' ? item.riderscreen : item.driverscreen)}
        >
          <View>
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
    backgroundColor: "#7a7a7a",
    alignItems: 'center',

  },
});
