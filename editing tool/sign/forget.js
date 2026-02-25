// Forgot Password Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const messageArea = document.getElementById('messageArea');
    
    // Validation functions
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
    
    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        validateField(
            emailInput,
            validateEmail,
            emailError,
            'Please enter a valid email address'
        );
        hideMessage(); // Hide any previous messages when user starts typing
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
        hideMessage(); // Hide any previous messages when user starts typing
    });
    
    // Form submission
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any previous messages
        hideMessage();
        
        // Validate email field
        const isEmailValid = validateField(
            emailInput,
            validateEmail,
            emailError,
            'Please enter a valid email address'
        );
        
        // If validation passes
        if (isEmailValid) {
            const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate password reset process
            setTimeout(function() {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Simulate different scenarios
                const email = emailInput.value.trim().toLowerCase();
                
                // Simulate success for most emails
                if (email.includes('test') || email.includes('demo')) {
                    showMessage('success', 'Reset link sent successfully! Please check your email inbox and spam folder.');
                    
                    // Clear the form after successful submission
                    setTimeout(function() {
                        forgotPasswordForm.reset();
                        hideError(emailError);
                        hideMessage();
                    }, 3000);
                } else {
                    // Show success message regardless for security reasons
                    // (In real applications, don't reveal if email exists or not)
                    showMessage('success', 'If an account with that email exists, we\'ve sent you a reset link. Please check your email inbox and spam folder.');
                    
                    // Clear the form after successful submission
                    setTimeout(function() {
                        forgotPasswordForm.reset();
                        hideError(emailError);
                        hideMessage();
                    }, 5000);
                }
            }, 2000);
        }
    });
    
    // Add visual feedback for form interaction
    emailInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    emailInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
    
    // Auto-focus on email input when page loads
    emailInput.focus();
});