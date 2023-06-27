
    var form = document.getElementById('signup-form');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var passwordInput = document.getElementById('password');
    var nameError = document.getElementById('name-error');
    var emailError = document.getElementById('email-error');
    var phoneError = document.getElementById('phone-error');
    var passwordError = document.getElementById('password-error');
    var passwordStrength = document.getElementById('password-strength');

    form.addEventListener('submit', function(event) {
      let isValid = true;
      
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
      } else {
        nameError.textContent = '';
      }
      
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format';
        isValid = false;
      } else {
        emailError.textContent = '';
      }

      if (phoneInput.value.trim() === '') {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
      } else if (!validatePhoneNumber(phoneInput.value.trim())) {
        phoneError.textContent = 'Invalid phone number format';
        isValid = false;
      } else {
        phoneError.textContent = '';
      }
      
      if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
      } else if (!validatePassword(passwordInput.value.trim())) {
        passwordError.textContent = 'Invalid password format';
        isValid = false;
      } else {
        passwordError.textContent = '';
      }
      
      if (!isValid) {
        event.preventDefault();
      }
    });

    passwordInput.addEventListener('input', function() {
      const passwordStrengthText = document.createElement('span');
      const strength = measurePasswordStrength(passwordInput.value);
      passwordStrength.innerHTML = '';
      passwordStrengthText.textContent = 'Password Strength: ';
      if (strength === 'weak') {
        passwordStrengthText.innerHTML += '<strong class="weak">Weak</strong>';
      } else if (strength === 'medium') {
        passwordStrengthText.innerHTML += '<strong class="medium">Medium</strong>';
      } else if (strength === 'strong') {
        passwordStrengthText.innerHTML += '<strong class="strong">Strong</strong>';
      }
      passwordStrength.appendChild(passwordStrengthText);
    });

    function validateEmail(email) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(email);
    }

    function validatePhoneNumber(phone) {
      const phoneRegex = /^(\d{3}[-.\s]??\d{3}[-.\s]??\d{4})$/;
      return phoneRegex.test(phone);
    }

    function validatePassword(password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordRegex.test(password);
    }

    function measurePasswordStrength(password) {
      const weakRegex = /^(?=.*\d).{1,7}$/;
      const mediumRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      
      if (weakRegex.test(password)) {
        return 'weak';
      } else if (mediumRegex.test(password)) {
        return 'medium';
      } else {
        return 'strong';
      }
    }