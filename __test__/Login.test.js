import React from 'react';
import Login from '../src/screens/Login';
import { fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';




describe('Login screen', () => {
    
    it('links are visible to the user', () => {
        const { getByText } = render (<Login />);
        expect(getByText("Forgot Password?")).toBeVisible();
        expect(getByText("Sign Up")).toBeVisible();
    }); 
    it('"Forgot Password?" link navigates to the recover screen', ()=>{
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByText } = render(<Login navigation={navigation} />);
        fireEvent.press(getByText("Forgot Password?"));
        expect(navigation.navigate).toHaveBeenCalledWith("Recover");
    });
    it('"Sign Up" link navigates to the signup screen', ()=>{
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByText } = render(<Login navigation={navigation} />);
        fireEvent.press(getByText("Sign Up"));
        expect(navigation.navigate).toHaveBeenCalledWith("Sign up");
    });
});