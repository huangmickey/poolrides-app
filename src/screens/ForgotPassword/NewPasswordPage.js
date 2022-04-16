import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppStyles } from '../../utils/styles';
import CustomButton from "../../components/CustomButton";

export default function NewPasswordPage({navigation}){
    function newPasswordPressHandler(){
        navigation.navigate("Startup")
    }

    return(
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image
                 style={styles.logo} source={require('../../../assets/splash.png')}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textName}>Enter New Password</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textName}>Confirm New Password</Text>
            </View>
            <View style={styles.buttonBox}>
                <CustomButton title={"Change Password"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={newPasswordPressHandler}/>  
            </View>
        </View>    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.color.black,
      alignItems : 'center',
    },
    inputView: {
      backgroundColor: AppStyles.color.black,
      width: "75%",
      marginTop: "5%",
      marginBottom:"10%",
  
    },

    logoContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    logo: {
      width: '60%',
      height: '60%',
      resizeMode: "contain",
    },
    textName: {
        fontWeight: "bold",
        fontSize: AppStyles.fontSize.normal,
        color: AppStyles.color.salmonred,
      },
      
    buttonBox: {
        width: AppStyles.textInputWidth.button,
        justifyContent: 'center',
        marginBottom: '25%',
        marginTop: '30%',
    },
})


