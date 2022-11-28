import React from 'react';
import{render, fireEvent, screen} from '@testing-library/react-native';
import { AppStyles } from '../src/utils/styles';
import Chip from "../src/components/Chip";
import '@testing-library/jest-native/extend-expect';


const defaultInterests = [
    {
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
    }
]

describe('Chip element', () => {

    it('buttons are visible to the user ', ()=>{
        const {getByText} = render (<Chip interest = 'Food' interestsObj = {defaultInterests} />);
        expect(getByText('Food')).toBeVisible();
    });
    it('button style changes on press', ()=>{
        const {getByText} = render (<Chip interest = 'Food' interestsObj = {defaultInterests} />);
        const FoodBtn = getByText('Food');
        expect(FoodBtn).toHaveStyle({color: AppStyles.color.white});
        fireEvent.press(FoodBtn);
        expect(FoodBtn).toHaveStyle({color: AppStyles.color.gray});
        fireEvent.press(FoodBtn);
        expect(FoodBtn).toHaveStyle({color: AppStyles.color.white}); 
    });   
});

