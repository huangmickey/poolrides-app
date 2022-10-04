import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState } from "react";
import { AppStyles } from '../../utils/styles';
import CustomButton from "../../components/CustomButton";
import { authentication } from "../../firebase/firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { Snackbar } from "react-native-paper";
import AuthErrorHandler from "../../utils/AuthErrorHandler";

export default function RecoverPassword({ navigation }) {
    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [snackBarVisisble, setSnackBarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisisble);
    const onDismissSnackBar = () => setSnackBarVisible(false);
    const [snackBarText, setSnackBarText] = useState("");
    const keyboardAppearance = 'dark';
    const returnKeyType = 'done';
    const maxLength = 60;

    function requestPasswordResetEmail() {
        sendPasswordResetEmail(authentication, email)
            .then(() => {
                console.log('Password reset email sent!');
                setIsEmailSent(true);
            })
            .catch((error) => {
                setSnackBarText(AuthErrorHandler(error.code));
                onToggleSnackBar();
                setIsEmailSent(false);
            });
    }
    function navigateToLogin() {
        setIsEmailSent(false);
        navigation.navigate("Startup");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.resetPasswordText}>Recover your account</Text>
            {!isEmailSent ?
                <View style={styles.inputAndButtonContainer}>
                    <Text style={styles.textType}>Enter your Email</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="example@email.com"
                            placeholderTextColor={AppStyles.color.gray}

                            keyboardAppearance={keyboardAppearance}
                            maxLength={maxLength}
                            returnKeyType={returnKeyType}

                            onChangeText={(email) => setEmail(email)}
                        />


                    </View>
                    <View style={styles.buttonBox}>
                        <CustomButton
                            stretch={true}
                            title={"Reset Your Password"}
                            color={AppStyles.color.mint}
                            textColor={AppStyles.color.black}
                            onPress={requestPasswordResetEmail}
                        />
                    </View>

                    <View style={styles.snackBarContainer}>
                        <Snackbar
                            theme={{
                                colors: {
                                    onSurface: AppStyles.color.gray,
                                    surface: AppStyles.color.white,
                                    accent: AppStyles.color.salmonred,
                                },
                            }}
                            visible={snackBarVisisble}
                            onDismiss={onDismissSnackBar}
                            action={{
                                label: "Dismiss",
                                onPress: () => {
                                    onDismissSnackBar();
                                },
                            }}
                        >
                            {snackBarText}
                        </Snackbar>
                    </View>

                </View>
                :
                <View style={styles.inputAndButtonContainer}>
                    <Text style={styles.resetEmailText}>Password Reset Email has been sent to {email}</Text>
                    <View style={styles.buttonBox}>
                        <CustomButton
                            stretch={true}
                            title={"Login"}
                            color={AppStyles.color.mint}
                            textColor={AppStyles.color.black}
                            onPress={navigateToLogin}
                        />
                    </View>

                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    inputAndButtonContainer: {
        marginTop: '40%',
    },
    inputView: {
        backgroundColor: AppStyles.color.black,
        borderBottomColor: AppStyles.color.white,
        borderBottomWidth: 2,
        height: 45,
        width: '80%',
        alignSelf: 'center',
    },
    buttonBox: {
        width: AppStyles.textInputWidth.button,
        marginTop: '10%',
        alignSelf: 'center',
    },
    textInput: {
        flex: 1,
        color: AppStyles.color.white,
        fontSize: 18,
    },
    textType: {
        width: '70%',
        alignSelf: 'center',
        fontWeight: "bold",
        marginRight: 50,
        fontSize: 22,
        color: AppStyles.color.salmonred,
    },
    resetPasswordText: {
        alignSelf: 'center',
        marginTop: '20%',
        fontWeight: "bold",
        fontSize: 25,
        color: AppStyles.color.gray,
    },
    resetEmailText: {
        alignSelf: 'center',
        fontWeight: "bold",
        fontSize: 18,
        color: AppStyles.color.salmonred,
    },
    snackBarContainer: {
        paddingTop: '70%',
    }
})