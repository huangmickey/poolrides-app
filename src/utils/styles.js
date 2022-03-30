import { StyleSheet, Text, View } from 'react-native';

export const AppStyles = {
  color: {
    black: '#000000',
    grey: '#111111',
    platinum: '#E6E8E6',
    mint: '#4ffcba',
    white: '#ffffff',
    salmonred: '#f85f6a',
    text: '#ffffff',
  },
  textFontSizes: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 80,

    title: 30,
    content: 20,
    normal: 16,
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16
  },
  spacing: {
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 40,
      xxxl: 80,
  },
  buttonWidth: {
    main: "70%",
  },
  textInputWidth: {
    main: "80%",
  },
  borderRadius: {
    main: 25,
    small: 5,
  }
};

export const AppIcon = {
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    marginRight: 10
  },
  style: {
    tintColor: AppStyles.color.white,
    width: 25,
    height: 25
  },
  images: {
    // logoS: require(),
    // logoM: require(),
    // logoL: require(),
    // home: require("../assets/icons/home.png"),
    // defaultUser: require("../assets/icons/default_user.jpg"),
    // logout: require("../assets/icons/shutdown.png"),
    // menu: require("../assets/icons/menu.png")
  }
};

export const HeaderButtonStyle = StyleSheet.create({
  multi: {
    flexDirection: "row"
  },
  container: {
    padding: 10
  },
  image: {
    justifyContent: "center",
    width: 35,
    height: 35,
    margin: 6
  },
  rightButton: {
    color: AppStyles.color.platinum,
    marginRight: 10,
    fontWeight: "normal",
  }
});

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: AppStyles.color.mint,
    fontWeight: "bold"
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: "row",
    paddingTop: 5,
    marginLeft: 10
  },
  leftSubtitle: {
    flex: 2
  },
  avatarStyle: {
    height: 80,
    width: 80
  }
});