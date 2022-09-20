import { StyleSheet, Text, View } from 'react-native';

export const AppStyles = {
  color: {
    black: '#000000',
    darkgray: '#202020',
    platinum: '#E6E8E6',
    gray: "#A9A9A9",
    mint: '#4ffcba',
    white: '#ffffff',
    salmonred: '#f85f6a',
    text: '#ffffff',
    errorred: '#ff9494',
  },
  textFontSizes: {
    sm: 10,
    md: 16,
    lg: 24,
    lgg: 28,
    xl: 32,
    xxl: 40,
    xxxl: 80,

    title: 30,
    header: 25,
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
    button: "60%"
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
    placeHolder: require("../../assets/imgs/white.png"),
    profileBackground: require("../../assets/imgs/profile_background.png"),
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

export const IDStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    color: AppStyles.color.mint,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  subTitle: {
    paddingTop: '1%',
    fontSize: 14,
    color: AppStyles.color.salmonred,
    justifyContent: 'center',
    paddingBottom: '5%',
    
  }

})