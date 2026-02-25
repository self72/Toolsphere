// Combined Login, Signup, and Forgot Password Functionality

// --- LOGIN FORM ---
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const rememberMeCheckbox = document.getElementById('rememberMe');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        function validatePassword(password) {
            return password.length >= 6;
        }
        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }
        function hideError(element) {
            element.textContent = '';
            element.style.display = 'none';
        }
        function validateField(input, validator, errorElement, errorMessage) {
            const value = input.value.trim();
            if (value === '') {
                showError(errorElement, 'This field is required');
                return false;
            } else if (!validator(value)) {
                showError(errorElement, errorMessage);
                return false;
            } else {
                hideError(errorElement);
                return true;
            }
        }

        emailInput.addEventListener('blur', function() {
            validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
        });
        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() !== '') {
                validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            }
        });
        passwordInput.addEventListener('blur', function() {
            validateField(passwordInput, validatePassword, passwordError, 'Password must be at least 6 characters long');
        });
        passwordInput.addEventListener('input', function() {
            if (passwordInput.value.length > 0) {
                validateField(passwordInput, validatePassword, passwordError, 'Password must be at least 6 characters long');
            }
        });

        // Load remembered email if exists
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        }

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const isEmailValid = validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            const isPasswordValid = validateField(passwordInput, validatePassword, passwordError, 'Password must be at least 6 characters long');
            if (isEmailValid && isPasswordValid) {
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', emailInput.value.trim());
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Signing In...';
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Sign In';
                    alert('Login successful! (This is a demo - replace with actual authentication)');
                    loginForm.reset();
                    hideError(emailError);
                    hideError(passwordError);
                }, 2000);
            }
        });

        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
});

// --- SIGNUP FORM ---
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('termsAgreement');
        const fullNameError = document.getElementById('fullNameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        function validateFullName(name) {
            return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
        }
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        function validatePassword(password) {
            return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
        }
        function validatePasswordMatch(password, confirmPassword) {
            return password === confirmPassword && password.length > 0;
        }
        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }
        function hideError(element) {
            element.textContent = '';
            element.style.display = 'none';
        }
        function validateField(input, validator, errorElement, errorMessage) {
            const value = input.value.trim();
            if (value === '') {
                showError(errorElement, 'This field is required');
                return false;
            } else if (!validator(value)) {
                showError(errorElement, errorMessage);
                return false;
            } else {
                hideError(errorElement);
                return true;
            }
        }
        function validatePasswordConfirmation() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            if (confirmPassword === '') {
                showError(confirmPasswordError, 'Please confirm your password');
                return false;
            } else if (!validatePasswordMatch(password, confirmPassword)) {
                showError(confirmPasswordError, 'Passwords do not match');
                return false;
            } else {
                hideError(confirmPasswordError);
                return true;
            }
        }

        fullNameInput.addEventListener('blur', function() {
            validateField(fullNameInput, validateFullName, fullNameError, 'Please enter a valid full name (letters and spaces only, minimum 2 characters)');
        });
        fullNameInput.addEventListener('input', function() {
            if (fullNameInput.value.trim() !== '') {
                validateField(fullNameInput, validateFullName, fullNameError, 'Please enter a valid full name (letters and spaces only, minimum 2 characters)');
            }
        });
        emailInput.addEventListener('blur', function() {
            validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
        });
        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() !== '') {
                validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            }
        });
        passwordInput.addEventListener('blur', function() {
            validateField(passwordInput, validatePassword, passwordError, 'Password must be at least 8 characters with letters and numbers');
            if (confirmPasswordInput.value !== '') {
                validatePasswordConfirmation();
            }
        });
        passwordInput.addEventListener('input', function() {
            if (passwordInput.value.length > 0) {
                validateField(passwordInput, validatePassword, passwordError, 'Password must be at least 8 characters with letters and numbers');
            }
            if (confirmPasswordInput.value !== '') {
                validatePasswordConfirmation();
            }
        });
        confirmPasswordInput.addEventListener('blur', function() {
            validatePasswordConfirmation();
        });
        confirmPasswordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value !== '') {
                validatePasswordConfirmation();
            }
        });

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const isFullNameValid = validateField(fullNameInput, validateFullName, fullNameError, 'Please enter a valid full name (letters and spaces only, minimum 2 characters)');
            const isEmailValid = validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            const isPasswordValid = validateField(passwordInput, validatePassword, passwordError, 'Password must be at least 8 characters with letters and numbers');
            const isPasswordConfirmValid = validatePasswordConfirmation();
            if (!termsCheckbox.checked) {
                alert('Please agree to the Terms and Conditions');
                return;
            }
            if (isFullNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid) {
                const submitButton = signupForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Creating Account...';
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    alert('Account created successfully! (This is a demo - replace with actual registration)');
                    signupForm.reset();
                    hideError(fullNameError);
                    hideError(emailError);
                    hideError(passwordError);
                    hideError(confirmPasswordError);
                }, 2000);
            }
        });

        [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });

        const termsLink = document.querySelector('.terms-link');
        if (termsLink) {
            termsLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Terms and Conditions would open here. (This is a demo)');
            });
        }
    }
});

// --- FORGOT PASSWORD FORM ---
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const messageArea = document.getElementById('messageArea');

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }
        function hideError(element) {
            element.textContent = '';
            element.style.display = 'none';
        }
        function showMessage(type, message) {
            messageArea.className = `message-area ${type}`;
            messageArea.textContent = message;
            messageArea.style.display = 'block';
        }
        function hideMessage() {
            messageArea.className = 'message-area';
            messageArea.textContent = '';
            messageArea.style.display = 'none';
        }
        function validateField(input, validator, errorElement, errorMessage) {
            const value = input.value.trim();
            if (value === '') {
                showError(errorElement, 'This field is required');
                return false;
            } else if (!validator(value)) {
                showError(errorElement, errorMessage);
                return false;
            } else {
                hideError(errorElement);
                return true;
            }
        }

        emailInput.addEventListener('blur', function() {
            validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            hideMessage();
        });
        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() !== '') {
                validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            }
            hideMessage();
        });

        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            hideMessage();
            const isEmailValid = validateField(emailInput, validateEmail, emailError, 'Please enter a valid email address');
            if (isEmailValid) {
                const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    const email = emailInput.value.trim().toLowerCase();
                    if (email.includes('test') || email.includes('demo')) {
                        showMessage('success', 'Reset link sent successfully! Please check your email inbox and spam folder.');
                        setTimeout(function() {
                            forgotPasswordForm.reset();
                            hideError(emailError);
                            hideMessage();
                        }, 3000);
                    } else {
                        showMessage('success', 'If an account with that email exists, we\'ve sent you a reset link. Please check your email inbox and spam folder.');
                        setTimeout(function() {
                            forgotPasswordForm.reset();
                            hideError(emailError);
                            hideMessage();
                        }, 5000);
                    }
                }, 2000);
            }
        });

        emailInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        emailInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });

        emailInput.focus();
    }
});