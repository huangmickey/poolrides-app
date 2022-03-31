import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'       //https://github.com/APSL/react-native-keyboard-aware-scroll-view   
import { FloatingLabelInput } from 'react-native-floating-label-input';                 //https://github.com/Cnilton/react-native-floating-label-input#version-135-or-higher---react-native-reanimated-v2

import { AppStyles } from '../utils/styles';
// import { colors } from '../utils/colors';
// import { sizes } from '../utils/sizes';

export default function RiderSignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [date, setDate] = useState('');    
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const keyboardAppearance = 'dark';
    const maxLength = 16;           //Note that the Max length for Phone and Date are fix in the element not global
    const returnKeyType= 'next';    

return (
  <View style={styles.container}>

  <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
  
  <KeyboardAwareScrollView 
    contentContainerStyle={styles.scrollviewContainer}
    enableOnAndroid={true}
    extraScrollHeight={40}
    >
        <View style={styles.InputContainer}>
        <FloatingLabelInput                                    
            containerStyles={styles.textContainer}
            customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <View style={styles.InputContainer}>
        <FloatingLabelInput 
            containerStyles={styles.textContainer}
            customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <View style={styles.InputContainer}>
            <FloatingLabelInput 
                containerStyles={styles.textContainer}
                customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <View style={styles.InputContainer}>
        <FloatingLabelInput 
            containerStyles={styles.textContainer}
            customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <View style={styles.InputContainer}>
        <FloatingLabelInput 
            containerStyles={styles.textContainer}
            customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <View style={styles.InputContainer}>
        <FloatingLabelInput 
            containerStyles={styles.textContainer}
            customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <View style={styles.InputContainer}>
        <FloatingLabelInput 
            containerStyles={styles.textContainer}
            customLabelStyles={{colorBlurred:'white', colorFocused:'white'}}
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

        <Button
            containerStyle={[styles.buttonContainer, {marginTop: 50}]}
            style={styles.buttonText}
            title={'Sign Up'}
            onPress={() => onRegister()}
            > Sign Up
        </Button>

    </KeyboardAwareScrollView>
  </View>
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
        marginTop: '5%',
    },
    inputTextStyle: {
        color: AppStyles.color.white,
        paddingLeft: 5,
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.white,
        marginTop: '10%',
        marginBottom: '5%',
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
});




// https://www.npmjs.com/package/react-native-next-input