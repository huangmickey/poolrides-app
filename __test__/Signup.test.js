import React from 'react';
import Signup from '../src/screens/Signup/Signup';
import { fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';



describe('Signup screen', () => {

    it('elements are visible to the user', () => {
        const { getByText } = render(<Signup />);
        expect(getByText("Driver Sign Up")).toBeVisible();
        expect(getByText("Rider Sign Up")).toBeVisible();
        expect(getByText("Have an Account?")).toBeVisible();
    });


    it('"Driver Sign Up" button navigates to Sign Up page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByTestId } = render(<Signup navigation={navigation} />);

        fireEvent.press(getByTestId("DriverSignUpButton"));
        expect(navigation.navigate).toHaveBeenCalledWith("Driver Sign up");
    });

    it('"Rider Sign up" button navigates to Sign Up page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByTestId } = render(<Signup navigation={navigation} />);

        fireEvent.press(getByTestId("RiderSignUpButton"))
        expect(navigation.navigate).toHaveBeenCalledWith("Rider Sign up");
    });

    it('"Sign In" link navigates to Sign In page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByText} = render(<Signup navigation={navigation} />);

        fireEvent.press(getByText("Sign In"));
        expect(navigation.navigate).toHaveBeenCalledWith("Login");
    });
    
});