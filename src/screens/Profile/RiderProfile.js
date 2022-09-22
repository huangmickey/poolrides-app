import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity  } from 'react-native';       
import { Avatar } from 'react-native-paper';                                                                   
import { AppStyles, AppIcon } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';


import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5); 

const profilePicture = AppIcon.images.placeHolder;
const userFriends = '16'
const userMilesTraveled = '412'
const userRating = '5.0/5.0'

const fieldOne = 'Friends';
const fieldTwo = 'Miles Traveled';
const fieldThree = 'Rating';

export default function RiderProfile({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const userUID = authentication.currentUser.uid;

        const getUserData = async () => {
            const userDocReference = doc(db, "users", userUID);
            const userDocSnapshot = await getDoc(userDocReference);
            setUserInfo(userDocSnapshot.data());
            console.log(userInfo);
        }
        getUserData();
    }, []);

    function paymentHandler() {
        
        // navigation.navigate("Payment");
    }

    function interestHandler() {
        console.log(userInfo);
        navigation.navigate("General Interests", {returnPage: "Rider Profile", generalInterest: userInfo.generalinterests, musicInterest: userInfo.musicinterests});   
    }

    function settingsHandler() {

        // navigation.navigate("Settings");
    }

    return (
        <View style={styles.container}> 
            <View style={{flex: 0.6}}>
                <ImageBackground 
                    source={AppIcon.images.profileBackground}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >            
                <View style={{paddingTop: 50}}>
                    <View style={styles.profileContent}>
                        <View style={[styles.align, { paddingTop: height * 0.1 }]}>
                            {userInfo?.profilePicture != null ? <Image source={userInfo?.profilePicture} style={styles.avatar}/> : <Image source={profilePicture} style={styles.avatar}/>}
                        </View>

                        <View style={{ paddingTop: height * 0.05 }}>

                            <View style={styles.align} >
                                <Text
                                    style={{
                                    fontWeight: "bold",
                                    fontSize: 26,
                                    color: AppStyles.color.white,
                                    }}
                                    >
                                    {userInfo?.firstname.toUpperCase()}  {userInfo?.lastname.toUpperCase()}
                                </Text>

                                <Text                                  
                                    style={{
                                    marginTop: 5,
                                    lineHeight: 20,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: AppStyles.color.gray,
                                    }}
                                >
                                    {userInfo?.usertype.toUpperCase()}
                                </Text>
                            </View>

                            <View style={styles.info}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly' }} >
                                    <View style={styles.align}>
                                        {userInfo?.numFriednds != null ? <Text style={ styles.statsText }>{userInfo?.numFriednds}</Text> : <Text style={ styles.statsText }>{userFriends}</Text>}
                                        <Text style={ styles.statsTitle }>
                                            {fieldOne}
                                        </Text>
                                    </View>

                                    <View style={styles.align}>
                                        {userInfo?.milesTraveled != null ? <Text style={ styles.statsText }>{userInfo?.milesTraveled}</Text> : <Text style={ styles.statsText }>{userMilesTraveled}</Text>}
                                        <Text style={ styles.statsTitle }>
                                            {fieldTwo}
                                        </Text>
                                    </View>

                                    <View style={styles.align}>
                                        {userInfo?.userRating != null ? <Text style={ styles.statsText }>{userInfo?.userRating}</Text> : <Text style={ styles.statsText }>{userRating}</Text>}
                                        <Text style={ styles.statsTitle }>
                                            {fieldThree}
                                        </Text>
                                    </View>
                                </View>
                            </View>   
                        </View>
                    </View>
                </View>    
            </ImageBackground>
        </View>

        <View style={styles.buttonContainer}>
            <CustomButton title={"Edit Profile"} stretch={true} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={showModal}/>  
        </View>

        <View style={{flex: 0.4, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly' }} >

            <TouchableOpacity  style={styles.align} onPress={paymentHandler}>
                <Image source={profilePicture} style={styles.bottomIcons} />
                    <Text style={ styles.bottomText }>
                        {'Add/Remove\nPayment'}
                    </Text>
                </TouchableOpacity >

                <TouchableOpacity  style={styles.align} onPress={interestHandler}>
                <Image source={profilePicture} style={styles.bottomIcons} />
                    <Text style={ styles.bottomText }>
                        {'Update\nInterests'}
                    </Text>
                </TouchableOpacity >

                <TouchableOpacity  style={styles.align} onPress={settingsHandler}>
                <Image source={profilePicture} style={styles.bottomIcons} />
                    <Text style={ styles.bottomText }>
                        {'Settings'}
                    </Text>
                    <Text></Text>
                </TouchableOpacity >

            </View>
        </View>
    </View> 
  );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: AppStyles.color.black,
    },
    profileBackground: {
        width,
        height: height * 0.6,
      },
    profileContainer: {
        flex: 1,
        zIndex: 5,
      },
    profileContent: {
        position: 'absolute',
        paddingHorizontal: 20, 
        width: width, 
        zIndex: 5, 
    },
    avatar: {
        width: thumbMeasure,
        height: thumbMeasure,
        borderRadius: 50,
        borderWidth: 0,
      },
    info: {
        marginTop: 30,
        paddingHorizontal: 10,
        height: height * 0.8,
    },
    statsText: {
        marginBottom: 4, 
        fontSize: 18,
        color: AppStyles.color.white,
    },
    statsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: AppStyles.color.white,
    },
    buttonContainer: { 
        alignSelf: 'center', 
        position: 'absolute', 
        paddingTop: height * 0.6 - 26,  
        width: width/2,
        zIndex: 99, 
    },
      bottomIcons: {
        width: thumbMeasure/1.5,
        height: thumbMeasure/1.5,
        borderRadius: 30,
        borderWidth: 0,
      },
    bottomText: { 
        paddingTop: 5, 
        fontSize: 12,
        textAlign: 'center',
        color: AppStyles.color.white,
    },
    align: {
        alignItems: 'center', 
        alignSelf: 'center',
    },
});


