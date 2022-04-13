import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'       //https://github.com/APSL/react-native-keyboard-aware-scroll-view   
import { FloatingLabelInput } from 'react-native-floating-label-input';                 //https://github.com/Cnilton/react-native-floating-label-input#version-135-or-higher---react-native-reanimated-v2
import { Agreement } from '../../utils/tos'; 
import { Checkbox, Paragraph, Dialog, Portal, Provider, Snackbar } from 'react-native-paper';
import LoadingOverlay from '../../components/LoadingOverlay';

import { AppStyles } from '../../utils/styles';
import { createUser } from '../../services/auth';
import { AuthContext } from '../../services/auth-context';

import { storeUser } from '../../utils/http';

export default function RiderSignUp( {navigation} ) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [date, setDate] = useState('');    
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const keyboardAppearance = 'dark';
    const maxLength = 16;           //Note that the Max length for Phone and Date are fix in the element not global
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
    
    const authCtx = useContext(AuthContext);

    async function signUpHandler() {

        setIsSubmitted(true);
        if (firstname == "" || lastname == "" || date == "" || validator.isDate(date, {format: 'MM/DD/YYYY'}) || phone == "" || email == "" || password == "" || confirmpassword == "" || checked == false) {

        } else {

            setIsAuthenticating(true);
            try {
                const token = await createUser(email, password);
                authCtx.authenticate(token);
            } catch (error) {
                const errorMessage = error.response.data.error.message;
                console.log(errorMessage);
                switch(errorMessage) {
                    case 'INVALID_EMAIL':
                        setSnackBarText('Invalid Email Entered');
                        onToggleSnackBar();
                        break;
                    case 'EMAIL_EXISTS':
                        setSnackBarText('Email already exists!');
                        onToggleSnackBar();
                        break;
                    case 'MISSING_PASSWORD':
                        setSnackBarText('Missing password!');
                        onToggleSnackBar();
                        break;
                    default:
                }
                setIsAuthenticating(false);
            }

            const UserData = {
                email: email,
                firstName: firstname,
                lastName: lastname,
                phone: phone,
                date: date,
            };
            const userType = 'riders';
            console.log(UserData);
            storeUser(userType, UserData);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating account..."/>
    }

function isEmpty(text) {
    if(isSubmitted && text == '') {
        return AppStyles.color.salmonred;
    } else {
        return AppStyles.color.white;
    }
}

function isValidDate(text) {
    console.log(text);
    if(isSubmitted && text =="" || isSubmitted && !validator.isDate(text, {format: 'MM/DD/YYYY'})) {
        return AppStyles.color.salmonred;
    } else {
        return AppStyles.color.white;
    }
}

    return (
        <Provider>
        <View style={styles.container}>

        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        
        <KeyboardAwareScrollView 
            contentContainerStyle={styles.scrollviewContainer}
            enableOnAndroid={true}
            extraScrollHeight={40}
        >
            <View style={[styles.InputContainer, {borderColor: isEmpty(firstname)}]}>
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

            <View style={[styles.InputContainer, {borderColor: isEmpty(lastname)}]}>
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

            <View style={[styles.InputContainer, {borderColor: isValidDate(date)}]}>
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

            <View style={[styles.InputContainer, {borderColor: isEmpty(email)}]}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred:labelColor, colorFocused:labelColor}}
                inputStyles={styles.inputTextStyle}
                
                value={email}
                label={'E-mail Address:'}

                keyboardAppearance={keyboardAppearance}
                maxLength={maxLength}
                returnKeyType={returnKeyType}

                onChangeText={setEmail}

                ref={ref => { this.emailInput = ref; }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.phoneInput.focus()}
                />
            </View>

            <View style={[styles.InputContainer, {borderColor: isEmpty(phone)}]}>
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

            <View style={[styles.InputContainer, {borderColor: isEmpty(password)}]}>
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


            <View style={[styles.InputContainer, {borderColor: isEmpty(confirmpassword)}]}>
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
                onPress={signUpHandler}
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