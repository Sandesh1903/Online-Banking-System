const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };
  
const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };
  
const validateMobileNo = (mobileNo) => {
    const mobileNoRegex = /^[0-9]{10}$/;
    return mobileNoRegex.test(mobileNo);
  };
  
const validatePanCard = (panCardNumber) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panCardNumber);
  };
  
const validateAadharCard = (aadharCardNumber) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadharCardNumber);
  };
  
const registrationForm = (e) => {
    const { name, value } = e.target;
  
    let error = '';
    if (!value.trim()) {
      error = `This field is required`;
    } else {
      if (name === 'customerEmail' && !validateEmail(value)) {
        error = 'Invalid email address. Must be a @gmail.com email.';
      } else if (name === 'customerDateOfBirth' && !validateAge(value)) {
        error = 'Age must be above 18.';
      } else if (name === 'customerMobileNo' && !validateMobileNo(value)) {
        error = 'Mobile number must be 10 digits.';
      } else if (name === 'customerPANCardNumber' && !validatePanCard(value)) {
        error = 'Invalid PAN Card Number.';
      } else if (name === 'customerAadharCardNumber' && !validateAadharCard(value)) {
        error = 'Aadhar Card Number must be 12 digits.';
      }
    }
  
    return error;
  };
  
  const formRules = {
    registrationFormOnBlurRules: registrationForm,
    email : validateEmail,
    age : validateAge,
    aadharCardNumber : validateAadharCard,
    panCardNumber : validatePanCard,
    mobileNo : validateMobileNo 

  };
  
  export default formRules;
  