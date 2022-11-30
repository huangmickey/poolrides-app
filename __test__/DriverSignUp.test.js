import React from 'react';
import DriverSignUp from '../src/screens/Signup/DriverSignUp';
import '@testing-library/jest-native/extend-expect';
import{render, fireEvent} from '@testing-library/react-native';
import { AppStyles } from '../src/utils/styles';

it('elements are visible to the user', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    expect(getByTestId('fname')).toBeVisible();
    expect(getByTestId('lname')).toBeVisible();
    expect(getByTestId('dob')).toBeVisible();
    expect(getByTestId('email')).toBeVisible();
    expect(getByTestId('phone')).toBeVisible();
    expect(getByTestId('password')).toBeVisible();
    expect(getByTestId('confirmpassword')).toBeVisible();
    expect(getByText('Sign Up')).toBeVisible();
});

it('shows red border if first name field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const fname = getByTestId('fname');
    fireEvent.changeText(getByTestId('firstName'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(fname).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if last name field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const lname = getByTestId('lname');
    fireEvent.changeText(getByTestId('lastName'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(lname).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if date of birth field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const dob = getByTestId('dob');
    fireEvent.changeText(getByTestId('DOB'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(dob).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if email field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const email = getByTestId('email');
    fireEvent.changeText(getByTestId('Email'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(email).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if phone field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const phone = getByTestId('phone');
    fireEvent.changeText(getByTestId('Phone'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(phone).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if password field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const password = getByTestId('password');
    fireEvent.changeText(getByTestId('Password'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(password).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if confirm password field is unfilled', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const confirmpassword = getByTestId('confirmpassword');
    fireEvent.changeText(getByTestId('confirmPassword'), '');
    fireEvent.press(getByText('Sign Up'));
    expect(confirmpassword).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows red border if password is not strong', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const password = getByTestId('password');
    fireEvent.changeText(getByTestId('Password'), 'password');
    fireEvent.press(getByText('Sign Up'));
    expect(password).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows white border if password is strong', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const password = getByTestId('password');
    fireEvent.changeText(getByTestId('Password'), 'Password#1');
    fireEvent.press(getByText('Sign Up'));
    expect(password).toHaveStyle({borderColor: AppStyles.color.white});
});
it('shows red border if date of birth is wrong format', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const dob = getByTestId('dob');
    fireEvent.changeText(getByTestId('DOB'), '01/01/01');
    fireEvent.press(getByText('Sign Up'));
    expect(dob).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows white border if date of birth is correct format', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const dob = getByTestId('dob');
    fireEvent.changeText(getByTestId('DOB'), '01/01/2001');
    fireEvent.press(getByText('Sign Up'));
    expect(dob).toHaveStyle({borderColor: AppStyles.color.white});
});
it('shows red border if email is not valid', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const email = getByTestId('email');
    fireEvent.changeText(getByTestId('Email'), 'email@gmail');
    fireEvent.press(getByText('Sign Up'));
    expect(email).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows white border if email is valid', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const email = getByTestId('email');
    fireEvent.changeText(getByTestId('Email'), 'email@gmail.com');
    fireEvent.press(getByText('Sign Up'));
    expect(email).toHaveStyle({borderColor: AppStyles.color.white});
});
it('shows red border if phone is not valid', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const phone = getByTestId('phone');
    fireEvent.changeText(getByTestId('Phone'), '(777) 777-777');
    fireEvent.press(getByText('Sign Up'));
    expect(phone).toHaveStyle({borderColor: AppStyles.color.salmonred});
});
it('shows white border if phone is valid', ()=>{
    const {getByTestId, getByText} = render (<DriverSignUp />);
    const phone = getByTestId('phone');
    fireEvent.changeText(getByTestId('Phone'), '(777) 777-7777');
    fireEvent.press(getByText('Sign Up'));
    expect(phone).toHaveStyle({borderColor: AppStyles.color.white});
});