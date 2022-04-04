import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'       //https://github.com/APSL/react-native-keyboard-aware-scroll-view   
import { FloatingLabelInput } from 'react-native-floating-label-input';                 //https://github.com/Cnilton/react-native-floating-label-input#version-135-or-higher---react-native-reanimated-v2
import { Agreement } from '../../utils/tos'; 
import { Checkbox, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

import { AppStyles } from '../../utils/styles';


export default function RiderSignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [date, setDate] = useState('');    
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const keyboardAppearance = 'dark';
    const maxLength = 16;           //Note that the Max length for Phone and Date are fix in the element not global
    const returnKeyType= 'next';
    const labelColor = AppStyles.color.gray;   

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

function signUp() {
    if (checked == false) {
        console.log("TOS NOT AGREED");
    } else {
        console.log("TOS AGREED");
    }

    if (firstname == "") {
        console.log("FIRST NAME EMPTY");
    } else {
        console.log("FIRST NAME FILLED");
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
            <View style={styles.InputContainer}>
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

            <View style={styles.InputContainer}>
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

            <View style={styles.InputContainer}>
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

            <View style={styles.InputContainer}>
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

            <View style={styles.InputContainer}>
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

            <View style={styles.InputContainer}>
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

            <View style={styles.InputContainer}>
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
                            <Dialog visible={visible} onDismiss={hideDialog}>
                                <Dialog.ScrollArea backgroundColor={AppStyles.color.gray} extraScrollHeight={40}>
                                    <ScrollView>
                                        <Paragraph>{Agreement.tos}</Paragraph>
                                    </ScrollView>
                                </Dialog.ScrollArea>
                                {/* <Dialog.Title>PoolRides TOS</Dialog.Title>
                                    <Dialog.Content>
                                        <Paragraph>{Agreement.tos}</Paragraph>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                    <Button onPress={hideDialog}>Ok</Button>
                                </Dialog.Actions> */}
                            </Dialog>
                        </Portal>


                    </Text>
            </View>

            <Button
                containerStyle={styles.buttonContainer}
                style={styles.buttonText}
                title={'Sign Up'}
                onPress={signUp}
                > Sign Up
            </Button>

        </KeyboardAwareScrollView>
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
        // backgroundColor: 'blue',
    },
    checkBox: {
        flexShrink: 1,
        height: 25,
        paddingRight: "5%",
        // backgroundColor: "blue",
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
        textDecorationLine: 'underline',
    },
});





// https://www.npmjs.com/package/react-native-next-input