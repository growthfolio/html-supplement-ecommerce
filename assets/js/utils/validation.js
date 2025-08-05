// Form Validation Utilities
export const Validation = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },
  
  // Phone validation (Brazilian format)
  isValidPhone: (phone) => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  },
  
  // Password validation
  isValidPassword: (password) => {
    return password.length >= 8;
  },
  
  // Name validation
  isValidName: (name) => {
    return name.trim().length >= 2;
  },
  
  // Required field validation
  isRequired: (value) => {
    return value.trim().length > 0;
  },
  
  // Min length validation
  minLength: (value, min) => {
    return value.length >= min;
  },
  
  // Max length validation
  maxLength: (value, max) => {
    return value.length <= max;
  },
  
  // Numeric validation
  isNumeric: (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  },
  
  // Format phone number
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phone;
  },
  
  // Validation rules
  rules: {
    required: {
      validate: (value) => Validation.isRequired(value),
      message: 'Este campo é obrigatório'
    },
    
    email: {
      validate: (value) => Validation.isValidEmail(value),
      message: 'Digite um e-mail válido'
    },
    
    phone: {
      validate: (value) => Validation.isValidPhone(value),
      message: 'Digite um telefone válido no formato (xx) xxxxx-xxxx'
    },
    
    password: {
      validate: (value) => Validation.isValidPassword(value),
      message: 'A senha deve ter pelo menos 8 caracteres'
    },
    
    name: {
      validate: (value) => Validation.isValidName(value),
      message: 'Nome deve ter pelo menos 2 caracteres'
    },
    
    confirmPassword: {
      validate: (value, originalPassword) => value === originalPassword,
      message: 'As senhas não coincidem'
    }
  },
  
  // Validate single field
  validateField: (value, rules, originalValue = null) => {
    const errors = [];
    
    rules.forEach(rule => {
      const ruleConfig = Validation.rules[rule];
      if (ruleConfig) {
        const isValid = rule === 'confirmPassword' 
          ? ruleConfig.validate(value, originalValue)
          : ruleConfig.validate(value);
          
        if (!isValid) {
          errors.push(ruleConfig.message);
        }
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  // Validate entire form
  validateForm: (formData, validationRules) => {
    const results = {};
    let isFormValid = true;
    
    Object.entries(validationRules).forEach(([fieldName, rules]) => {
      const value = formData[fieldName] || '';
      const originalValue = rules.includes('confirmPassword') ? formData.password : null;
      
      const result = Validation.validateField(value, rules, originalValue);
      results[fieldName] = result;
      
      if (!result.isValid) {
        isFormValid = false;
      }
    });
    
    return {
      isValid: isFormValid,
      fields: results
    };
  }
};