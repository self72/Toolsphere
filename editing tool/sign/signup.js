// Signup Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsAgreement');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    // Validation functions
    function validateFullName(name) {
        return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePassword(password) {
        // Password must be at least 8 characters and contain at least one letter and one number
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
    
    // Real-time validation for full name
    fullNameInput.addEventListener('blur', function() {
        validateField(
            fullNameInput,
            validateFullName,
            fullNameError,
            'Please enter a valid full name (letters and spaces only, minimum 2 characters)'
        );
    });
    
    fullNameInput.addEventListener('input', function() {
        if (fullNameInput.value.trim() !== '') {
            validateField(
                fullNameInput,
                validateFullName,
                fullNameError,
                'Please enter a valid full name (letters and spaces only, minimum 2 characters)'
            );
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('blur', function() {
        validateField(
            emailInput,
            validateEmail,
            emailError,
            'Please enter a valid email address'
        );
    });
    
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '') {
            validateField(
                emailInput,
                validateEmail,
                emailError,
                'Please enter a valid email address'
            );
        }
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('blur', function() {
        validateField(
            passwordInput,
            validatePassword,
            passwordError,
            'Password must be at least 8 characters with letters and numbers'
        );
        
        // Also revalidate confirm password if it has a value
        if (confirmPasswordInput.value !== '') {
            validatePasswordConfirmation();
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.length > 0) {
            validateField(
                passwordInput,
                validatePassword,
                passwordError,
                'Password must be at least 8 characters with letters and numbers'
            );
        }
        
        // Also revalidate confirm password if it has a value
        if (confirmPasswordInput.value !== '') {
            validatePasswordConfirmation();
        }
    });
    
    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener('blur', function() {
        validatePasswordConfirmation();
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value !== '') {
            validatePasswordConfirmation();
        }
    });
    
    // Password strength indicator
    function getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    }
    
    function updatePasswordStrength() {
        const password = passwordInput.value;
        const strength = getPasswordStrength(password);
        
        // You can add visual strength indicator here if needed
        // For now, we'll just use the validation messages
    }
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFullNameValid = validateField(
            fullNameInput,
            validateFullName,
            fullNameError,
            'Please enter a valid full name (letters and spaces only, minimum 2 characters)'
        );
        
        const isEmailValid = validateField(
            emailInput,
            validateEmail,
            emailError,
            'Please enter a valid email address'
        );
        
        const isPasswordValid = validateField(
            passwordInput,
            validatePassword,
            passwordError,
            'Password must be at least 8 characters with letters and numbers'
        );
        
        const isPasswordConfirmValid = validatePasswordConfirmation();
        
        // Check terms agreement
        if (!termsCheckbox.checked) {
            alert('Please agree to the Terms and Conditions');
            return;
        }
        
        // If all validations pass
        if (isFullNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid) {
            const submitButton = signupForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable submit button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.textContent = 'Creating Account...';
            
            // Simulate account creation process (replace with actual registration)
            setTimeout(function() {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Show success message (in a real app, redirect to login or dashboard)
                alert('Account created successfully! (This is a demo - replace with actual registration)');
                
                // Clear form for demo purposes
                signupForm.reset();
                hideError(fullNameError);
                hideError(emailError);
                hideError(passwordError);
                hideError(confirmPasswordError);
            }, 2000);
        }
    });
    
    // Add visual feedback for form interaction
    const inputs = [fullNameInput, emailInput, passwordInput, confirmPasswordInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Terms and conditions link handler
    const termsLink = document.querySelector('.terms-link');
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Terms and Conditions would open here. (This is a demo)');
    });
});