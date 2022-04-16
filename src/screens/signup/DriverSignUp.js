import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'       //https://github.com/APSL/react-native-keyboard-aware-scroll-view   
import { FloatingLabelInput } from 'react-native-floating-label-input';                 //https://github.com/Cnilton/react-native-floating-label-input#version-135-or-higher---react-native-reanimated-v2
import { Agreement } from '../../utils/tos'; 
import { Checkbox, Paragraph, Dialog, Portal, Provider, Snackbar } from 'react-native-paper';
import LoadingOverlay from '../../components/LoadingOverlay';
import validator from 'validator';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';
import AuthErrorHandler from '../../utils/AuthErrorHandler';

import { AppStyles } from '../../utils/styles';


export default function DriverSignUp( {navigation} ) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [date, setDate] = useState('');    
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState(['']);

    const keyboardAppearance = 'dark';
    const maxLength = 32;           //Note that the Max length for Phone and Date are fix in the element not global
    const returnKeyType= 'next';
    const labelColor = AppStyles.color.gray;   

    const [dialogVisible, setdialogVisible] = useState(false);
    const showDialog = () => setdialogVisible(true);
    const hideDialog = () => setdialogVisible(false);

    const [isAuthenticating, setIsAuthenticating] = useState(false); // Check if firebase is auth
    
    const [snackBarVisisble, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState(''); 
    const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisisble);
    const onDismissSnackBar = () => setSnackBarVisible(false);
    
    async function signUpHandler() {

        if (firstname != "" && lastname != "" && validator.isDate(date, {format: 'MM/DD/YYYY'}) 
            && phone.length == 14 && validator.isEmail(email) 
            && confirmpassword == password && checked == true
            && validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, 
                                                   pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, 
                                                   pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
            
            setIsAuthenticating(true);
            createUserWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                // console.log(response);
                const userUID = authentication.currentUser.uid;
                console.log(userUID);
                
                const userData = {
                    dob: date,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    usertype: 'Driver',
                }
                
                console.log(userData);
                setDoc(doc(db, "users", userUID), userData);

            })
            .catch((error) => {
                setSnackBarText(AuthErrorHandler(error.code));
                onToggleSnackBar();
                setIsAuthenticating(false);
            })
            
        } else {
            
        } // end of else
    } // end of signUpHandler()

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating account..."/>
    }


    function validationHandler(text) {
        switch(text) {
            case(firstname): if (isSubmitted && text == '') { return AppStyles.color.salmonred} else { return AppStyles.color.white };
            case(lastname): if (isSubmitted && text == '') { return AppStyles.color.salmonred} else { return AppStyles.color.white };
            case(date): if (isSubmitted && text == '' || isSubmitted && !validator.isDate(text, {format: 'MM/DD/YYYY'})){ return AppStyles.color.salmonred} else { return AppStyles.color.white };
            case(email): if (isSubmitted && text == '' || isSubmitted && !validator.isEmail(text)) { return AppStyles.color.salmonred} else { return AppStyles.color.white };
            case(phone): if (isSubmitted && text == '' || isSubmitted && !validator.isMobilePhone(text)) { return AppStyles.color.salmonred} else { return AppStyles.color.white };
            case(password): if (isSubmitted && text == '' || isSubmitted && !validator.isStrongPassword(text)) { return AppStyles.color.salmonred} else { return AppStyles.color.white };
            case(confirmpassword): if (isSubmitted && text == '' || isSubmitted && !validator.isStrongPassword(text) || confirmpassword !== password) { return AppStyles.color.salmonred} else { return AppStyles.color.white };
        }
    }
    
    
    // const errorHandler = (e) => {
    //     const err = errorMsg;
    //     if (firstname == '') {
    //         setErrorMsg('First name cannot be empty \n')
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'First name cannot be empty \n'))
    //     }
    //     if (lastname == '') {
    //         setErrorMsg([...err,'Last name cannot be empty \n'])
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'Last name cannot be empty \n'))
    //     }
    //     if (date == '' || date != validator.isDate({format: 'MM/DD/YYYY'})) {
    //         setErrorMsg('Please enter a valid birth date \n')
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'Please enter a valid birth date \n'))
    //     }
    //     if (email == '' || email != validator.isEmail) {
    //         setErrorMsg('Please enter a valid Email \n')
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'Please enter a valid Email \n'))
    //     }
    //     if (phone == '' || phone != validator.isMobilePhone) {
    //         setErrorMsg('Please enter a valid phone number \n')
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'Please enter a valid phone number \n'))
    //     }
    //     if (password == '' || phone != validator.isStrongPassword) {
    //         setErrorMsg('Your password must contain a total of 8 characters, containing 1 upper case character, 1 lower case character, and 1 symbol  \n')
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'Your password must contain a total of 8 characters, containing 1 upper case character, 1 lower case character, and 1 symbol  \n'))
    //     }
    //     if (confirmpassword == '' || confirmpassword == !validator.isStrongPassword || confirmpassword == !password) {
    //         setErrorMsg('Please make sure your passwords match. \n')
    //     } else {
    //         setErrorMsg(errorMsg.filter(err => err != 'Please make sure your passwords match. \n'))
    //     }
    // }
    
    
    
    const commonHandler = () => {
        signUpHandler();
        // errorHandler();
    }

    return (
        <Provider>
        <View style={styles.container}>

        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        <Text style={[styles.formError]}>{errorMsg}</Text>
        
        <KeyboardAwareScrollView 
            contentContainerStyle={styles.scrollviewContainer}
            enableOnAndroid={true}
            extraScrollHeight={40}
        >
            <View style={[styles.InputContainer, {borderColor: validationHandler(firstname)}]}>
                <FloatingLabelInput                                    
                    containerStyles={styles.textContainer}
                    customLabelStyles={{colorBlurred: labelColor, colorFocused:labelColor}}
                    inputStyles={styles.inputTextStyle}

                    value={firstname}
                    label={'First Name:'}

                    keyboardAppearance={keyboardAppearance}
                    maxLength={maxLength}
                    returnKeyType={returnKeyType}

                    onChangeText={setFirstname}

                    blurOnSubmit={false}
                    onSubmitEditing={() => this.lastnameInput.focus()}
                    />
            </View>

            <View style={[styles.InputContainer, {borderColor: validationHandler(lastname)}]}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred:labelColor, colorFocused:labelColor}}
                inputStyles={styles.inputTextStyle}

                value={lastname}
                label={'Last Name:'}

                keyboardAppearance={keyboardAppearance}
                maxLength={maxLength}
                returnKeyType={returnKeyType}

                onChangeText={setLastname}

                ref={ref => { this.lastnameInput = ref; }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.dobInput.focus()}
                />
            </View>

            <View style={[styles.InputContainer, {borderColor: validationHandler(date)}]}>
                <FloatingLabelInput 
                    containerStyles={styles.textContainer}
                    customLabelStyles={{colorBlurred:labelColor, colorFocused:labelColor}}
                    inputStyles={styles.inputTextStyle}

                    value={date}
                    label={'Date Of Birth:'}

                    keyboardType='numeric'
                    keyboardAppearance={keyboardAppearance}
                    maxLength={10}

                    maskType={'date'}
                    mask={'99/99/9999'}
                    hint={'01/01/2001'}
                    hintTextColor={'grey'}               

                    onChangeText={setDate}

                    ref={ref => { this.dobInput = ref; }}
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.emailInput.focus()}
                />
            </View>

            <View style={[styles.InputContainer, {borderColor: validationHandler(email)}]}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred:labelColor, colorFocused:labelColor}}
                inputStyles={styles.inputTextStyle}
                
                value={email}
                label={'E-mail Address:'}

                keyboardAppearance={keyboardAppearance}
                maxLength={30}
                returnKeyType={returnKeyType}

                onChangeText={setEmail}

                ref={ref => { this.emailInput = ref; }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.phoneInput.focus()}
                />
            </View>

            <View style={[styles.InputContainer, {borderColor: validationHandler(phone)}]}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred:labelColor, colorFocused:labelColor}}
                inputStyles={styles.inputTextStyle}

                value={phone}
                label={'Phone Number:'}
                
                keyboardType='numeric'
                keyboardAppearance={keyboardAppearance}
                maxLength={14}

                maskType={'phone'}
                mask={'(999) 999-9999'}
                hint={'(555) 555-5555'}

                onChangeText={setPhone}

                ref={ref => { this.phoneInput = ref; }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.passwordInput.focus()}
            />
            </View>

            <View style={[styles.InputContainer, {borderColor: validationHandler(password)}]}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred:labelColor, colorFocused:labelColor}}
                inputStyles={styles.inputTextStyle}

                value={password}
                label={'Password:'}

                keyboardAppearance={keyboardAppearance}
                maxLength={maxLength}
                returnKeyType={returnKeyType}

                isPassword={true}
                customShowPasswordComponent={<Text></Text>}
                customHidePasswordComponent={<Text></Text>}
                onChangeText={setPassword}

                ref={ref => { this.passwordInput = ref; }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.passwordConfInput.focus()}
                />
            </View>            


            <View style={[styles.InputContainer, {borderColor: validationHandler(confirmpassword)}]}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred: labelColor, colorFocused:labelColor}}
                inputStyles={styles.inputTextStyle}

                value={confirmpassword}
                label={'Confirm Password:'}
                
                keyboardAppearance={keyboardAppearance}
                maxLength={maxLength}
                returnKeyType={returnKeyType}

                isPassword={true}
                customShowPasswordComponent={<Text></Text>}
                customHidePasswordComponent={<Text></Text>}
                onChangeText={setConfirmPassword}

                ref={ref => { this.passwordConfInput = ref; }}
                blurOnSubmit={false}
                />
            </View>

            <View style={styles.checkBoxContainer}>
                <Checkbox.Item
                    style={styles.checkBox}
                    status={checked ? 'checked' : 'unchecked'}
                    uncheckedColor={AppStyles.color.white}
                    color={AppStyles.color.salmonred}

                    mode={'android'}
                    
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    />
                    <Text style={styles.checkBoxText}>
                        I agree to the Terms of Service and the Privacy Policy
                        <Pressable onPress={showDialog}>
                        <Text style={styles.tosText}> ?
                        </Text>
                        </Pressable>

                        <Portal>
                            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                                <Dialog.ScrollArea backgroundColor={AppStyles.color.gray} extraScrollHeight={40}>
                                    <ScrollView>
                                        <Paragraph>{Agreement.tos}</Paragraph>
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
                onPress={commonHandler}
                > Sign Up
            </Button>

            </KeyboardAwareScrollView>
        </View>
        <View style={styles.snackBarContainer}>
            <Snackbar
                theme={{ colors: {onSurface: AppStyles.color.gray, surface: AppStyles.color.white, accent: AppStyles.color.salmonred},}}
                visible={snackBarVisisble}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Dismiss',
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
        flexGrow : 1, 
        alignItems : 'center',
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: '4%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
    },
    textContainer: {
        height: 48,
        paddingLeft: '5%',
        paddingRight: '5%',
        color: AppStyles.color.text
    },
    buttonContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.salmonred,
        borderRadius: AppStyles.borderRadius.main,
        padding: '3%',
        marginTop: '7%',
    },
    inputTextStyle: {
        color: AppStyles.color.white,
        paddingLeft: 5,
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
        flexShrink: 1,
        height: 25,
        paddingRight: "5%",
    },
    checkBoxText: {
        flex: 1,
        flexWrap: "wrap",
        color: AppStyles.color.white,
        fontSize: AppStyles.fontSize.normal,
    },
    tosText: {
        fontSize: AppStyles.fontSize.normal,
        color: AppStyles.color.salmonred,
    },
    snackBarContainer: {
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: AppStyles.color.gray,
    },
});

// https://www.npmjs.com/package/react-native-next-input