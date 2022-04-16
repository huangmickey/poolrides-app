import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../utils/styles';
import { Chip } from 'react-native-paper'; 

export default function CustomChip({text, map}) {
    const [selected, setSelected] = useState(false);
    const [chipBackgroundColor, setChipBackgroundColor] = useState(AppStyles.color.salmonred);
    const [chipTextColor, setChipTextColor] = useState(AppStyles.color.white);

    function changeMap() {
        map.set(text, !map.get(text))
        console.log(text + " " + map.get(text));
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
            selected={selected} 
            onPress={()=> {setSelected(!selected), changeMap(), changeChipBackgroundColor(), changeChipTextColor()}} 
            textStyle={{fontWeight: 'bold', color: chipTextColor}}
            style={[styles.chipContainer, {backgroundColor: chipBackgroundColor}]}
            >{text}</Chip>
    );
}

const styles = StyleSheet.create({
    chipContainer: {
      width: 100,
      margin:  '2%',
    },
});