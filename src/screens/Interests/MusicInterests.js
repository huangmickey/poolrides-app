import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import CustomChip from '../../components/Chip';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';

export default function MusicInterests({ navigation, route }) {
  
  const [returnPage, setReturnPage] = useState();
  const [userInterests, setUserInterest] = useState();
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    if(route.params.returnPage != null) { 
      setReturnPage(route.params.returnPage); 
    } 
  
    if(route.params.musicInterest != null) { 
      setUserInterest(route.params.musicInterest); 
      setIsDefault(false);
    } 
  }, []);

  const [defaultInterests] = useState({
    'Classical': false,
    'Country': false,
    'EDM': false,
    'Folk': false,
    'Funk': false,
    'Hip Hop': false,
    'Jazz': false,
    'K-Pop': false,
    'Latin': false,
    'Lofi': false,
    'Metal': false,
    'Pop': false,
    'Rap': false,
    'Reggae': false,
    'Rock': false,
    'R&B': false,
    'Soul': false,
  });

  async function continueHandler() {
    const uid = authentication.currentUser.uid;
    const userDocRef = doc(db, "users", uid);

    console.log("Return Page: " + returnPage);
    console.log("User:  " + userInterests);
    console.log("isDefault: " + isDefault);

    if(isDefault) {
      await updateDoc(userDocRef, {
        musicinterests: defaultInterests,
      });
      navigation.navigate('Verify Account');
    } else {
      await updateDoc(userDocRef, {
        musicinterests: userInterests,
      });
      navigation.navigate(returnPage);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>Select your music interests</Text>

        <ScrollView persistentScrollbar={true} style={styles.scrollView}>
          <View style={styles.chipContainer}>
          {isDefault ? 
              Array.from(Object.entries(defaultInterests).sort()).map((entry) => {
                const [key] = entry;
                return (<CustomChip key={key} interest={key} interestsObj={defaultInterests} />);
              })
            : 
              Array.from(Object.entries(userInterests).sort()).map((entry) => {
                const [key] = entry;
                return (<CustomChip key={key} interest={key} interestsObj={userInterests} />);
              })
          }



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