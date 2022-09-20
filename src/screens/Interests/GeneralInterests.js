import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import CustomChip from '../../components/Chip';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';

import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';


export default function GeneralInterests({ navigation, route }) {

  const [generalInterests] = useState({
    Anime: false,
    Art: false,
    Cars: false,
    Chess: false,
    Church: false,
    Cooking: false,
    Dance: false,
    Fishing: false,
    Fashion: false,
    Food: false,
    Gaming: false,
    Garden: false,
    Gym: false,
    Movies: false,
    Nature: false,
    Party: false,
    Pets: false,
    Reading: false,
    Singing: false,
    Sports: false,
    Tech: false,
    Travel: false,
    Writing: false,
    Yoga: false,
  });

  async function continueHandler() {
    const uid = authentication.currentUser.uid;
    const userDocRef = doc(db, "users", uid);

    await updateDoc(userDocRef, {
      generalinterests: generalInterests,
    });

    navigation.navigate('Music Interests');
  }

  return (
    <View style={styles.container}>

      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>Select your general interests</Text>
        
        <ScrollView persistentScrollbar={true} style={styles.scrollView}>
          <View style={styles.chipContainer}>
            {Array.from(Object.entries(generalInterests)).map((entry) => {
              const [key] = entry;
              return (<CustomChip key={key} interest={key} interestsObj={generalInterests} />);
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.underButtonTextContainer}>
        <Text style={styles.underButtonText}>By selecting interests, we can better tailor your ride experience.</Text>
        <Text style={styles.underButtonText}>You can always change your interests later in your settings!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          textColor={AppStyles.color.black}
          onPress={continueHandler}
          title='Continue'
          stretch={true}
          color={AppStyles.color.mint}>
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
  },
  headingTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  headingText: {
    color: AppStyles.color.gray,
    fontSize: AppStyles.textFontSizes.lgg,
  },
  scrollView: {
    height: '50%',
    marginTop: '10%',
  },
  chipContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  underButtonTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
  underButtonText: {
    color: AppStyles.color.platinum,
    fontSize: AppStyles.textFontSizes.sm,
  },
  buttonContainer: {
    paddingStart: '10%',
    paddingEnd: '10%',
    marginTop: '10%',
  },
});