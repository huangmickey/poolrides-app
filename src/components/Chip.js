import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../utils/styles';
import { Chip } from 'react-native-paper'; 

export default function CustomChip({interest, interestsObj}) {
    const [isSelected, setIsSelected] = useState(interestsObj[interest]);           //I for the life of me dont know why you cant comment this out without breaking everything
    
    function changeMap() {
        interestsObj[interest] = !interestsObj[interest];
        setIsSelected(!isSelected);                                                 //I for the life of me dont know why you cant comment this out without breaking everything
        console.log("Result of selecting chip: " + interest + " : " + interestsObj[interest]);
    }

    function checkTextColor() {
        if(interestsObj[interest]){
            return AppStyles.color.gray;
        }
        return AppStyles.color.white;
    }

    function checkChipColor() {
        if(interestsObj[interest]){
            return AppStyles.color.mint;
        }
        return AppStyles.color.salmonred;
    }
    
    return (
        
        <Chip 
            selected={interestsObj[interest]}
            onPress={()=> { changeMap() }} 
            textStyle={{fontWeight: 'bold', color: checkTextColor()}}
            style={[styles.chipContainer, {backgroundColor: checkChipColor()}]}
            >{interest}</Chip>
    );
}

const styles = StyleSheet.create({
    chipContainer: {
      width: 100,
      margin:  '2%',
    },
});