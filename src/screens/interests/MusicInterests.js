import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import CustomChip from '../../components/Chip';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { db, authentication } from '../../firebase/firebase-config';

export default function GeneralInterests( { navigation } ) {
    const [musicInterests] = useState({
      music1: false,
      music2: false,
      music3: false,
    });
    
    return (
        <View style={styles.container}>

          <View style={styles.headingTextContainer}>
            <Text style={styles.headingText}>Select your general interests</Text>
          </View>
        
          <View>
            <ScrollView persistentScrollbar={true} style={styles.scrollView}>
              <View style={styles.chipContainer}>
                {Array.from(Object.entries(musicInterests)).map((entry) => {
                  const [key] = entry;
                  return (<CustomChip key={key} interest={key} interestsObj={musicInterests}/>);
                })} 
              </View>
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton 
              textColor={AppStyles.color.gray} 
              onPress={continueHandler}
              title='Continue' 
              color={AppStyles.color.mint}>
            </CustomButton>
          </View>
          
          <View style={styles.underButtonTextContainer}>
            <Text style={styles.underButtonText}>You can always change your interests later!</Text>
          </View>

        </View>
    )
  
    async function continueHandler() {
      const uid = authentication.currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      
      await updateDoc(userDocRef, {
        musicinterests: musicInterests,
      });
      
      navigation.navigate('Verify Account');
      // authentication.currentUser.reload();
    
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    chipContainer: {
      flexWrap: 'wrap',
      flexDirection:'row',
      justifyContent: 'center',
      // backgroundColor: 'green',
    },
    buttonContainer: {
      paddingStart: '10%',
      paddingEnd: '10%',
      marginTop: '20%',
      // backgroundColor: AppStyles.color.orange,
    },
    scrollView: {
      height: '20%',
      marginTop: '20%',
    },
    headingTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20%',
      // backgroundColor: 'blue',
    },
    headingText: {
      color: AppStyles.color.gray,
      fontSize: AppStyles.textFontSizes.xxl,
    },
    underButtonTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1%',
      // backgroundColor: 'white',
    },
    underButtonText: {
      color: AppStyles.color.gray,
      fontSize: AppStyles.textFontSizes.md,
    }
});