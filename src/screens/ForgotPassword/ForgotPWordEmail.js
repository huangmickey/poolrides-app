import { Image, StyleSheet, Text, View } from "react-native";
import { AppStyles } from '../../utils/styles';
import CustomButton from "../../components/CustomButton";
import EnterEmailforPwordReset  from "../../components/EnterEmailforPwordReset";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPwordEmail(){

    const auth = getAuth();

    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image
                 style={styles.logo} source={require('../../../assets/splash.png')}
            />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textType}>Enter your Email</Text>
                <EnterEmailforPwordReset text="Email"/>
             </View>

             <View style={styles.buttonBox}>
                <CustomButton title={"Reset Your Password"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={() =>sendPasswordResetEmail(auth,EnterEmailforPwordReset.email)}/>  
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
    buttonBox: {
        width: AppStyles.textInputWidth.button,
        justifyContent: 'center',
        marginBottom: '25%',
    },
        text: {
        fontSize: AppStyles.fontSize.normal,
        color: "white",
        textAlignVertical: "top",
    },
    textType: {
        fontWeight: "bold",
        fontSize: AppStyles.fontSize.normal,
        color: AppStyles.color.salmonred,
    },
    inputView: {
        backgroundColor: AppStyles.color.black,
        width: "75%",
        marginTop:"5%",
        marginBottom:"50%"
    },
})