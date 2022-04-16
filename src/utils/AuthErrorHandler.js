export default function AuthErrorHandler(errorCode) {
    let errorMessage = '';

    if (errorCode === 'auth/weak-password') {
        errorMessage = 'Weak password';
    } else if (errorCode === 'auth/internal-error') {
        errorMessage = 'Empty password';
    } else if (errorCode === 'auth/missing-email') {
        errorMessage = 'Empty email field';
    } else if (errorCode === 'auth/invalid-email') {
        errorMessage = 'Invalid email';
    } else if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
    } else if (errorCode === 'auth/user-not-found') {
        errorMessage = 'This email is not a valid account';
    } else if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Invalid credentials';
    } else if (errorCode === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts, reset password or try again later';
    }

    return errorMessage;
}