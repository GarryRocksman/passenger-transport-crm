import React from 'react';

export const handlePhoneNumberChange = (inputPhoneNumber: string) => {
  const phoneRegex = /^[0-9\s\-\+\(\)]*$/;

  if (phoneRegex.test(inputPhoneNumber)) {
    return inputPhoneNumber;
  } else {
    return '';
  }
};
