import React from 'react';
import Startup from '../src/screens/Startup';
import { fireEvent, render, screen } from '@testing-library/react-native';



describe('Startup screen', () => {

    it("renders default elements", () => {
        const { getAllByText } = render(<Startup />)
        expect(getAllByText("Login").length).toBe(1)
        expect(getAllByText("Sign Up").length).toBe(1)
        expect(getAllByText("Forgot account?").length).toBe(1)
    });


    it('"Login" button navigates to Login page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByTestId } = render(<Startup navigation={navigation} />);

        fireEvent.press(getByTestId("Login Button"));
        expect(navigation.navigate).toHaveBeenCalledWith("Login");

    });

    it('"Sign Up" button navigates to Sign Up page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByTestId } = render(<Startup navigation={navigation} />);

        fireEvent.press(getByTestId("Sign Up Button"))
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