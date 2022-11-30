import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Checkbox, Dialog, Portal, Provider, Snackbar } from 'react-native-paper';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import { setGlobalStyles, FloatingLabelInput } from 'react-native-floating-label-input';                
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import validator from 'validator';
import { Agreement } from '../../utils/tos';
import LoadingOverlay from '../../components/LoadingOverlay';
import { AppStyles } from '../../utils/styles';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
// import { db, authentication } from '../../firebase/firebase-config';
import AuthErrorHandler from '../../utils/AuthErrorHandler';

export default function RiderSignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [tosChecked, setTOSChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const keyboardAppearance = 'dark';
    const maxInputLength = 32;           //Note that the Max length for Phone and Date are fix in the element not global
    const passwordMsg = '*Must be at least 8 characters long with at least one number, capital and special character.';

    const [dialogVisible, setdialogVisible] = useState(false);
    const showDialog = () => setdialogVisible(true);
    const hideDialog = () => setdialogVisible(false);

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const [snackBarVisisble, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisisble);
    const onDismissSnackBar = () => setSnackBarVisible(false);

    function signUpHandler() {

        if (!validationHandler()) {
            setIsSubmitted(true);
        } else {
            const userData = {
                dob: date,
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                usertype: 'Rider',
            }
            setIsAuthenticating(true);
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {

                    const userUID = response.user.uid;
                    setDoc(doc(db, "users", userUID), userData)
                        .catch(error => {
                            console.log('Database entry error' + error);
                        })
                    console.log(userUID + " : " + response.user.email + " => successfuly signed up")
                    console.log(userData);
                    console.log('User Data went into database successfully');
                })
                .catch((error) => {
                    setSnackBarText(AuthErrorHandler(error.code));
                    onToggleSnackBar();
                    setIsAuthenticating(false);
                })
        }
    }

    function validationHandler(text) {
        if (text === undefined) {
            if (firstname == "" || lastname == "" || date == "" || !validator.isDate(date, { format: 'MM/DD/YYYY' }) ||
                phone == "" || phone == !validator.isMobilePhone || email == "" || email == !validator.isEmail ||
                password == "" || password == !validator.isStrongPassword || confirmpassword == "" || confirmpassword != password ||
                tosChecked == false) {
                return false;
            } else {
                return true;
            }
        } else {
            switch (text) {
                case (firstname): if (isSubmitted && text == '') { return AppStyles.color.salmonred } else { return AppStyles.color.white };
                case (lastname): if (isSubmitted && text == '') { return AppStyles.color.salmonred } else { return AppStyles.color.white };
                case (date): if (isSubmitted && text == '' || isSubmitted && !validator.isDate(text, { format: 'MM/DD/YYYY' })) { return AppStyles.color.salmonred } else { return AppStyles.color.white };
                case (email): if (isSubmitted && text == '' || isSubmitted && !validator.isEmail(text)) { return AppStyles.color.salmonred } else { return AppStyles.color.white };
                case (phone): if (isSubmitted && text == '' || isSubmitted && !validator.isMobilePhone(text)) { return AppStyles.color.salmonred } else { return AppStyles.color.white };
                case (password): if (isSubmitted && text == '' || isSubmitted && !validator.isStrongPassword(text)) { return AppStyles.color.salmonred } else { return AppStyles.color.white };
                case (confirmpassword): if (isSubmitted && text == '' || isSubmitted && confirmpassword !== password) { return AppStyles.color.salmonred } else { return AppStyles.color.white };
            }
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating account..." />
    }

    return (
        <Provider>
            <View style={styles.container}>

                <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
                {/* <Text style={[styles.title, styles.leftTitle]}>New Rider Account</Text> */}

                <KeyboardAwareScrollView contentContainerStyle={styles.scrollviewContainer}
                    enableOnAndroid={true} extraScrollHeight={60}>
                    <View testID='fname' style={[styles.InputContainer, { borderColor: validationHandler(firstname) }]}>
                        <FloatingLabelInput
                            testID='firstName'
                            value={firstname}
                            label={'First Name:'}
                            keyboardAppearance={keyboardAppearance}
                            maxLength={maxInputLength}

                            onChangeText={setFirstname}
                        />
                    </View>

                    <View testID='lname' style={[styles.InputContainer, { borderColor: validationHandler(lastname) }]}>
                        <FloatingLabelInput
                            testID='lastName'
                            value={lastname}
                            label={'Last Name:'}
                            keyboardAppearance={keyboardAppearance}
                            maxLength={maxInputLength}
                            onChangeText={setLastname}
                        />
                    </View>

                    <View testID='dob' style={[styles.InputContainer, { borderColor: validationHandler(date) }]}>
                        <FloatingLabelInput
                            testID='DOB'
                            value={date}
                            label={'Date Of Birth:'}
                            maskType={'date'}
                            mask={'99/99/9999'}
                            hint={'01/01/2001'}
                            hintTextColor={'grey'}
                            keyboardType='numeric'
                            keyboardAppearance={keyboardAppearance}
                            maxLength={10}
                            onChangeText={setDate}
                        />
                    </View>

                    <View testID='email' style={[styles.InputContainer, { borderColor: validationHandler(email) }]}>
                        <FloatingLabelInput
                            testID='Email'
                            value={email}
                            label={'E-mail Address:'}
                            keyboardAppearance={keyboardAppearance}
                            maxLength={maxInputLength}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View testID='phone' style={[styles.InputContainer, { borderColor: validationHandler(phone) }]}>
                        <FloatingLabelInput
                            testID='Phone'
                            value={phone}
                            label={'Phone Number:'}
                            maskType={'phone'}
                            mask={'(999) 999-9999'}
                            hint={'(555) 555-5555'}
                            keyboardType='numeric'
                            keyboardAppearance={keyboardAppearance}
                            maxLength={14}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View testID='password' style={[styles.InputContainer, { borderColor: validationHandler(password) }]}>
                        <FloatingLabelInput
                            testID='Password'
                            value={password}
                            label={'Password:'}
                            isPassword={true}
                            customShowPasswordComponent={<Icon name={"eye-off-outline"} style={{ color: AppStyles.color.white, fontSize: 25 }} />}
                            customHidePasswordComponent={<Icon name={"eye-outline"} style={{ color: AppStyles.color.white, fontSize: 25 }} />}
                            keyboardAppearance={keyboardAppearance}
                            maxLength={maxInputLength}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={{ width: AppStyles.textInputWidth.main }}>
                        <Text style={styles.passwordMsg} >{passwordMsg}</Text>
                    </View>

                    <View testID='confirmpassword' style={[styles.InputContainer, { borderColor: validationHandler(confirmpassword) }]}>
                        <FloatingLabelInput
                            testID='confirmPassword'
                            value={confirmpassword}
                            label={'Confirm Password:'}
                            isPassword={true}
                            customShowPasswordComponent={<Icon name={"eye-off-outline"} style={{ color: AppStyles.color.white, fontSize: 25 }} />}
                            customHidePasswordComponent={<Icon name={"eye-outline"} style={{ color: AppStyles.color.white, fontSize: 25 }} />}
                            keyboardAppearance={keyboardAppearance}
                            maxLength={maxInputLength}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    <View style={styles.checkBoxContainer}>
                        <Checkbox.Item
                            style={styles.checkBox}
                            status={tosChecked ? 'checked' : 'unchecked'}
                            uncheckedColor={AppStyles.color.white}
                            color={AppStyles.color.salmonred}
                            position={'leading'}
                            mode={'android'}

                            onPress={() => { setTOSChecked(!tosChecked); }}
                        />
                        <Text style={styles.checkBoxText}>
                            <Text>I agree to the </Text>
                            <Text onPress={() => showDialog()} style={styles.tosText}>Terms of Service</Text>
                            <Text> and the </Text>
                            <Text onPress={() => showDialog()} style={styles.tosText}>Privacy Policy.</Text>

                            <Portal>
                                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                                    <Dialog.Actions backgroundColor={AppStyles.color.darkgray} paddingRight={'5%'}>
                                        <Button onPress={hideDialog}>Done</Button>
                                    </Dialog.Actions>
                                    <Dialog.ScrollArea backgroundColor={AppStyles.color.darkgray} extraScrollHeight={40}>
                                        <ScrollView>
                                            <Text style={{ color: AppStyles.color.white }}>{Agreement.tos}</Text>
                                        </ScrollView>
                                    </Dialog.ScrollArea>
                                </Dialog>
                            </Portal>
                        </Text>
                    </View>

                    <Button
                        containerStyle={styles.buttonContainer}
                        style={styles.buttonText}
                        title={'Sign Up'}
                        onPress={signUpHandler}
                    > Sign Up
                    </Button>

                    <View style={{ height: 20 }}></View>

                </KeyboardAwareScrollView>
            </View>
            <View style={styles.snackBarContainer}>
                <Snackbar
                    theme={{ colors: { onSurface: AppStyles.color.gray, surface: AppStyles.color.white, accent: AppStyles.color.salmonred }, }}
                    visible={snackBarVisisble}
                    duration={3500}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: '',
                        onPress: () => {
                            onDismissSnackBar();
                        },
                    }}>
                    {snackBarText}
                </Snackbar>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
    },
    scrollviewContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: '4%',
        // borderWidth: 1,
        borderBottomWidth: 2,
        borderStyle: 'solid',
        borderColor: AppStyles.color.white,
        // borderRadius: AppStyles.borderRadius.main,
        // borderRadius: AppStyles.borderRadius.small,      Rounds the bottom of the lines. Do not use
    },
    buttonContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.salmonred,
        // borderRadius: AppStyles.borderRadius.main,
        borderRadius: AppStyles.borderRadius.small,
        padding: '3%',
        marginTop: '7%',
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.white,
        marginBottom: '2%',
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: '5%',
        backgroundColor: AppStyles.color.black,
    },
    formError: {
        fontSize: 14,
        color: AppStyles.color.salmonred,
        marginLeft: '12%',
    },
    buttonText: {
        color: AppStyles.color.white,
    },
    checkBoxContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: '4%',
        width: AppStyles.textInputWidth.main,
    },
    checkBox: {
        height: 25,
    },
    checkBoxText: {
        flex: 1,
        color: AppStyles.color.white,
        fontSize: AppStyles.fontSize.normal,
    },
    tosText: {
        color: AppStyles.color.salmonred,
        fontSize: AppStyles.fontSize.normal,
        textDecorationLine: 'underline',
    },
    passwordMsg: {
        flex: 1,
        position: "absolute",
        color: AppStyles.color.gray,
        fontSize: AppStyles.textFontSizes.sm,
    },
});

setGlobalStyles.labelStyles = {
    color: AppStyles.color.gray,
};
setGlobalStyles.containerStyles = {
    height: 48,
    paddingLeft: '5%',
    paddingRight: '5%',
    color: AppStyles.color.text,
};
setGlobalStyles.customLabelStyles = {
    colorBlurred: AppStyles.color.gray,
    colorFocused: AppStyles.color.gray,

};
setGlobalStyles.inputStyles = {
    color: AppStyles.color.white,
    paddingLeft: 5,
};