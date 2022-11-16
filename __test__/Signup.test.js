import React from 'react';
import Signup from '../src/screens/Signup/Signup';
import { fireEvent, render, screen } from '@testing-library/react-native';



describe('Signup screen', () => {

    it("renders default elements", () => {
        const { getAllByText } = render(<Signup />)
        expect(getAllByText("Driver Sign Up").length).toBe(1)
        expect(getAllByText("Rider Sign Up").length).toBe(1)
        expect(getAllByText("Have an Account?").length).toBe(1)
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