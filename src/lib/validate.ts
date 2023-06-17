const validatePassword = (password: string): boolean => {
    // Regular expression pattern for password validation and one spceical character
    if (password.length < 8) return false;

    const alphabets = /[a-zA-Z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (!alphabets.test(password)) return false;
    if (!numbers.test(password)) return false;
    if (!specialCharacters.test(password)) return false;

    return true;

    // At least one letter (uppercase or lowercase)
    // At least one digit
    // The password must be at least 8 characters long
};

const validateEmail = (email: string): boolean => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the pattern
    return emailPattern.test(email);
};

const validateName = (name: string): boolean => {
    // Regular expression pattern for name validation
    const namePattern = /^[a-zA-Z]+$/;

    // Test the name against the pattern
    return namePattern.test(name);
}

const validateUsername = (username: string): boolean => {
    // Regular expression pattern for username validation
    const usernamePattern = /^[a-zA-Z0-9._]{3,}$/;

    // Test the username against the pattern
    return usernamePattern.test(username);
};



export const validate = {
    password: validatePassword,
    email: validateEmail,
    name: validateName,
    username: validateUsername,
}
