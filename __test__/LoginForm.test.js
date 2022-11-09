import React from 'react';
import{render, fireEvent, screen} from '@testing-library/react-native';

import LoginForm from "../src/components/LoginForm";


// it('renders default elements', ()=>{
//     const {getAllByText} = render (<LoginForm/>);
//     expect(getAllByText('Sign In').length).toBe(1);
//     screen.getByPlaceholderText('Password');
//     screen.getByPlaceholderText('example@email.com');
    
// });

it('displays messages if input fields are left empty', ()=>{
    const {getByText} = render (<LoginForm />);
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input password')).toBeTruthy();
    expect(screen.getByText('*Please input email')).toBeTruthy();
});

it('displays "input password" message if password input fields is left empty', ()=>{
    const {getByText} = render (<LoginForm />);
    const emailInput = screen.getByPlaceholderText('example@email.com')
    fireEvent.changeText(emailInput, 'email@gmail.com');
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input password')).toBeTruthy();
    expect(screen.queryByText('*Please input email')).toBeNull();
});

it('displays "input email" message if email input fields is left empty', ()=>{
    const {getByText} = render (<LoginForm />);
    const passwordInput = screen.getByPlaceholderText('Password')
    fireEvent.changeText(passwordInput, 'Password');
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input email')).toBeTruthy();
    expect(screen.queryByText('*Please input password')).toBeNull();
});

it('displays message if invalid email is entered', ()=>{
    const {getByText} = render (<LoginForm />);
    fireEvent.changeText(screen.getByPlaceholderText('example@email.com'), 'email');
    fireEvent.press(getByText('Sign In'));
    expect(screen.getByText('*Please input valid email')).toBeTruthy();
});

it('displays no message if valid email is entered', ()=>{
    const {getByText} = render (<LoginForm />);
    fireEvent.changeText(screen.getByPlaceholderText('example@email.com'), 'email@gmail.com');
    fireEvent.press(getByText('Sign In'));
    expect(screen.queryByText('*Please input valid email')).toBeNull(); 
});