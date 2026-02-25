// Login Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Error message elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Validation functions
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
    
    // Real-time validation
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
    
    passwordInput.addEventListener('blur', function() {
        validateField(
            passwordInput,
            validatePassword,
            passwordError,
            'Password must be at least 6 characters long'
        );
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.length > 0) {
            validateField(
                passwordInput,
                validatePassword,
                passwordError,
                'Password must be at least 6 characters long'
            );
        }
    });
    
    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
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
            'Password must be at least 6 characters long'
        );
        
        // If all validations pass
        if (isEmailValid && isPasswordValid) {
            // Handle "Remember Me" functionality
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedEmail', emailInput.value.trim());
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Disable submit button to prevent multiple submissions
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Signing In...';
            
            // Simulate login process (replace with actual authentication)
            setTimeout(function() {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = 'Sign In';
                
                // Show success message (in a real app, redirect to dashboard)
                alert('Login successful! (This is a demo - replace with actual authentication)');
                
                // Clear form for demo purposes
                loginForm.reset();
                hideError(emailError);
                hideError(passwordError);
            }, 2000);
        }
    });
    
    // Add visual feedback for form interaction
    const inputs = [emailInput, passwordInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});