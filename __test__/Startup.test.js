import React from 'react';
import Startup from '../src/screens/Startup';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CustomButton from '../src/components/CustomButton';


describe('Startup screen', () => {

    it("renders default elements", () => {
        const { getAllByText } = render(<Startup />)
        expect(getAllByText("Login").length).toBe(1)
        expect(getAllByText("Sign Up").length).toBe(1)
        expect(getAllByText("Forgot account?").length).toBe(1)
    })


    it('"Login" button should navigate to login page', () => {
        const navigation = { navigate: () => { } };
        spyOn(navigation, 'navigate');
        const { getByTestId } = render(<Startup navigation={navigation} />);

        fireEvent.press(getByTestId("Login Button"));
        expect(navigation.navigate).toHaveBeenCalledWith("Login");

        fireEvent.press(getByTestId("Sign Up Button"))
        expect(navigation.navigate).toHaveBeenCalledWith("Sign up");
    })
})