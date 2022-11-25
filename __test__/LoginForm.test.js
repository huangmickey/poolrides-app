import React from 'react';
import '@testing-library/jest-native/extend-expect';
import{render, fireEvent, screen} from '@testing-library/react-native';
import LoginForm from "../src/components/LoginForm";


it('elements are visible to the user', ()=>{
    const {getByText, getByPlaceholderText} = render (<LoginForm/>);
    expect(getByText('Sign In')).toBeVisible();
    expect(getByPlaceholderText('Password')).toBeVisible();
    expect(getByPlaceholderText('example@email.com')).toBeVisible();
    
});

it('displays messages if input fields are left empty', ()=>{
    const {getByText} = render (<LoginForm />);
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input password')).toBeTruthy();
    expect(screen.getByText('*Please input email')).toBeTruthy();
});

it('displays "input password" message if password input field is left empty', ()=>{
    const {getByText} = render (<LoginForm />);
    const emailInput = screen.getByPlaceholderText('example@email.com');
    fireEvent.changeText(emailInput, 'email@gmail.com');
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input password')).toBeTruthy();
    expect(screen.queryByText('*Please input email')).toBeNull();
});

it('displays "input email" message if email input field is left empty', ()=>{
    const {getByText} = render (<LoginForm />);
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'MyPassword');
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input email')).toBeTruthy();
    expect(screen.queryByText('*Please input password')).toBeNull();
});

it('displays message if invalid email is entered', ()=>{
    const {getByText} = render (<LoginForm />);
    fireEvent.changeText(screen.getByPlaceholderText('example@email.com'), 'email@gmail');
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input valid email')).toBeTruthy();
});

it('displays no message if valid email is entered', ()=>{
    const {getByText} = render (<LoginForm />);
    fireEvent.changeText(screen.getByPlaceholderText('example@email.com'), 'email@gmail.com');
    fireEvent.press(getByText('Sign In'));
    expect(screen.queryByText('*Please input valid email')).toBeNull(); 
});
