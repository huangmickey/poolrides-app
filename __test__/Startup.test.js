import React from 'react';
import Startup from '../src/screens/Startup';
import { fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';


describe('Startup screen', () => {

    it('elements are visible to the user', () => {
        const { getByText } = render(<Startup />)
        expect(getByText("Login")).toBeVisible()
        expect(getByText("Sign Up")).toBeVisible()
        expect(getByText("Forgot account?")).toBeVisible()
    });


    it('"Login" button navigates to Login page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByText } = render(<Startup navigation={navigation} />);

        fireEvent.press(getByText("Login"));
        expect(navigation.navigate).toHaveBeenCalledWith("Login");

    });

    it('"Sign Up" button navigates to Sign Up page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByText } = render(<Startup navigation={navigation} />);

        fireEvent.press(getByText("Sign Up"))
        expect(navigation.navigate).toHaveBeenCalledWith("Sign up");
    });

    it('"Recover" link navigates to Recover page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByText} = render(<Startup navigation={navigation} />);

        fireEvent.press(getByText("Recover"));
        expect(navigation.navigate).toHaveBeenCalledWith("Recover");
    });
    
});