import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../utils/styles';
import { Chip } from 'react-native-paper'; 

export default function CustomChip({interest, interestsObj}) {
    const [isSelected, setIsSelected] = useState(false);
    const [chipBackgroundColor, setChipBackgroundColor] = useState(AppStyles.color.salmonred);
    const [chipTextColor, setChipTextColor] = useState(AppStyles.color.white);
    
    function changeMap() {
        interestsObj[interest] = !interestsObj[interest];
        console.log("Result of selecting chip: " + interest + " : " + interestsObj[interest]);
    }

    function changeChipBackgroundColor() {
        if (chipBackgroundColor === AppStyles.color.salmonred) {
            setChipBackgroundColor(AppStyles.color.mint);
        } else {
            setChipBackgroundColor(AppStyles.color.salmonred);
        }
    }

    function changeChipTextColor() {
        if (chipTextColor === AppStyles.color.white) {
            setChipTextColor(AppStyles.color.gray);
        } else {
            setChipTextColor(AppStyles.color.white);
        }
    }
    
    return (
        
        <Chip 
            selected={isSelected}
            onPress={()=> { setIsSelected(!isSelected), changeMap(), changeChipBackgroundColor(), changeChipTextColor() }} 
            textStyle={{fontWeight: 'bold', color: chipTextColor}}
            style={[styles.chipContainer, {backgroundColor: chipBackgroundColor}]}
            >{interest}</Chip>
    );
}

const styles = StyleSheet.create({
    chipContainer: {
      width: 100,
      margin:  '2%',
    },
});