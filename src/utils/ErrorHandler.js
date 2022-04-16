export default function ErrorHandler(errorCode) {
    let errorMessage = '';

    if (errorCode === 'auth/weak-password') {
        errorMessage = 'Weak password';
    } else if (errorCode === 'auth/internal-error') {
        errorMessage = 'Empty password';
    } else if (errorCode === 'auth/missing-email') {
        errorMessage='Empty email field';
    } else if (errorCode === 'auth/invalid-email') {
        errorMessage='Invalid email';
    } else if (errorCode === 'auth/email-already-in-use') {
        errorMessage='This email is already registered';
    }

    return errorMessage;
}