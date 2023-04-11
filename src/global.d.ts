import firebase from 'firebase/compat';

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    confirmationResult: firebase.default.auth.ConfirmationResult;
  }
}

export {};
