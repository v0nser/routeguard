class RouteValidator {
    constructor(rules) {
      this.rules = rules;
    }
  
    validate(path, request) {
      const routeRules = this.rules[path];
      const errors = [];
      if (!routeRules) {
        return { isValid: true, errors };
      }
  
      // Validate headers
      if (routeRules.headers) {
        for (const [header, rules] of Object.entries(routeRules.headers)) {
          if (rules.required && !request.headers[header]) {
            errors.push({
              field: `headers.${header}`,
              message: `${header} is required in headers.`,
            });
          }
        }
      }
  
      // Validate body
      if (routeRules.body) {
        for (const [key, rules] of Object.entries(routeRules.body)) {
          const value = request.body[key];
  
          if (rules.required && (value === undefined || value === null)) {
            errors.push({
              field: `body.${key}`,
              message: `${key} is required in the body.`,
            });
          }
  
          if (rules.type && typeof value !== rules.type) {
            errors.push({
              field: `body.${key}`,
              message: `${key} must be of type ${rules.type}.`,
            });
          }
  
          if (rules.enum && Array.isArray(value)) {
            value.forEach((v, index) => {
              if (!rules.enum.includes(v)) {
                errors.push({
                  field: `body.${key}[${index}]`,
                  message: `Invalid value for ${key}`,
                });
              }
            });
          } else if (rules.enum && !rules.enum.includes(value)) {
            errors.push({
              field: `body.${key}`,
              message: `Invalid value for ${key}`,
            });
          }
        }
      }
  
      return { isValid: errors.length === 0, errors };
    }
  }
  
  module.exports = RouteValidator;
  