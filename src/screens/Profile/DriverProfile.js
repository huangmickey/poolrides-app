import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { EvilIcons, Feather, MaterialIcons, Octicons } from '@expo/vector-icons';
import { AppStyles, AppIcon } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';

import { doc, getDoc } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/firebase-config';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = ((width - 48 - 32) / 2.5);

const userFriends = 'N/A'
const userMilesTraveled = 'N/A'
const userRating = 'N/A'

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

    function editProfileHandler() {
        navigation.navigate("Account Settings");
    }

    function paymentHandler() {

        // navigation.navigate("Payment");
    }

    function interestHandler() {
        console.log(userInfo);
        navigation.navigate("General Interests", { returnPage: "Rider Profile", generalInterest: userInfo.generalinterests, musicInterest: userInfo.musicinterests });
    }

    function settingsHandler() {

        navigation.navigate("Settings");
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.6, zIndex: 1 }}>
                <ImageBackground
                    source={AppIcon.images.profileBackground}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <View style={{ paddingTop: 50 }}>
                        <View style={styles.profileContent}>
                            <View style={[styles.align, { paddingTop: height * 0.1 }]}>
                                {userInfo?.ProfilePicture == null || userInfo?.ProfilePicture == ""
                                    ?
                                    <EvilIcons name="user" size={150} color="white" />
                                    :
                                    <Image source={{ uri: userInfo.ProfilePicture }} style={styles.bottomIcons} />
                                }
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

                                {/* <View style={styles.info}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                                        <View style={styles.align}>
                                            {userInfo?.numFriednds != null ? <Text style={styles.statsText}>{userInfo?.numFriednds}</Text> : <Text style={styles.statsText}>{userFriends}</Text>}
                                            <Text style={styles.statsTitle}>
                                                {fieldOne}
                                            </Text>
                                        </View>

                                        <View style={styles.align}>
                                            {userInfo?.milesTraveled != null ? <Text style={styles.statsText}>{userInfo?.milesTraveled}</Text> : <Text style={styles.statsText}>{userMilesTraveled}</Text>}
                                            <Text style={styles.statsTitle}>
                                                {fieldTwo}
                                            </Text>
                                        </View>

                                        <View style={styles.align}>
                                            {userInfo?.userRating != null ? <Text style={styles.statsText}>{userInfo?.userRating}/5.0</Text> : <Text style={styles.statsText}>{userRating}/5.0</Text>}
                                            <Text style={styles.statsTitle}>
                                                {fieldThree}
                                            </Text>
                                        </View>
                                    </View>
                                </View> */}

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton title={"Edit Profile"} stretch={true} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={editProfileHandler} />
            </View>

            <View style={{ flex: 0.4, justifyContent: 'center', zIndex: 9 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >

                    <TouchableOpacity style={styles.align} onPress={paymentHandler}>
                        <MaterialIcons name="payment" size={50} color="white" />
                        <Text style={styles.bottomText}>
                            {'Add/Remove\nPayment'}
                        </Text>
                    </TouchableOpacity >

                    <TouchableOpacity style={styles.align} onPress={interestHandler}>
                        <Octicons name="tasklist" size={50} color="white" />
                        <Text style={styles.bottomText}>
                            {'Update Interests\n'}
                        </Text>
                    </TouchableOpacity >

                    <TouchableOpacity style={styles.align} onPress={settingsHandler}>
                        <Feather name="settings" size={50} color="white" />
                        <Text style={styles.bottomText}>
                            {'Settings\n'}
                        </Text>
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
        width: width / 2,
        zIndex: 99,
    },
    bottomIcons: {
        width: thumbMeasure / 1.5,
        height: thumbMeasure / 1.5,
        borderRadius: 30,
        borderWidth: 0,
    },
    bottomText: {
        paddingTop: 15,
        fontSize: 12,
        textAlign: 'center',
        color: AppStyles.color.white,
    },
    align: {
        alignItems: 'center',
        alignSelf: 'center',
    },
});