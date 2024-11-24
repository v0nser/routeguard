
# Route Guard

A flexible and extensible Node.js module for validating API requests based on predefined validation rules. This utility ensures that incoming requests conform to the required structure and data types, making your API more robust and secure.

**Features**
- Validate headers and body fields against defined rules.
- Support for required fields, type checking, and enumerated values.
- Detailed error reporting for invalid or missing fields.

**Installation**
 1. Clone the repository:
 ```git clone https://github.com/v0nser/routeguard.git```

2. Navigate to the project directory:
```cd routeguard```

3. Install dependencies:
```npm install```

**Usage**
1. Define Validation Rules

Create a rules.js file to define the validation rules for your API routes.

Example:
```
module.exports = {
  '/api/users': {
    headers: {
      'api-key': { required: true },
    },
    body: {
      username: { required: true, type: 'string' },
      email: { required: true, type: 'string' },
      roles: { required: true, type: 'object', enum: ['user', 'admin', 'manager'] },
    },
  },
};
```
2. Integrate the Validator

Use the ```RouteValidator``` class to validate incoming requests.

Example:

```
const RouteValidator = require('./RouteValidator');
const rules = require('./validatorRules');

const validator = new RouteValidator(rules);

const request = {
  headers: {
    'api-key': 'valid-api-key',
  },
  body: {
    username: 'john_doe',
    email: 'john@example.com',
    roles: ['user', 'admin'],
  },
};

const result = validator.validate('/api/users', request);

if (result.isValid) {
  console.log('Request is valid!');
} else {
  console.error('Validation errors:', result.errors);
}
```

**Testing**
1. Run the test suite:
```npm test```

2. Example output:

```
PASS  tests/validex.test.js
  RouteValidator
    ✓ should reject invalid role values (50 ms)
    ✓ should reject missing required header (20 ms)
    ✓ should accept valid request (15 ms)
    ✓ should reject missing required body fields (18 ms)
```

**Project Structure**

```
.
├── index.js      # Core validation logic
├── rules.js      # Predefined validation rules
├── tests
│   └── validex.test.js    # Unit tests for RouteValidator
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

**Example Scenarios**
1. Missing Required Header
- Request:

```
{
  "headers": {},
  "body": {
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```
- Response:

```
{
  "isValid": false,
  "errors": [
    {
      "field": "headers.api-key",
      "message": "api-key is required in headers."
    }
  ]
}
```
2. Invalid Role Value
- Request:
```
{
  "headers": {
    "api-key": "valid-api-key"
  },
  "body": {
    "username": "john_doe",
    "email": "john@example.com",
    "roles": ["user", "invalid-role"]
  }
}
```

- Response:

```
{
  "isValid": false,
  "errors": [
    {
      "field": "body.roles[1]",
      "message": "Invalid value for roles"
    }
  ]
}
```

# Contributing
Feel free to submit issues or pull requests to improve the validator. Contributions are welcome!

# License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or feedback, please contact:

<<<<<<< HEAD
- Name: Vaibhav Singh
- Email: raghuvanshivaibhav01@gmail.com
- GitHub: [v0nser](https://github.com/v0nser)
