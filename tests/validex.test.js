const RouteValidator = require('../index');
const rules = require('../rules');

const validator = new RouteValidator(rules);

describe('RouteValidator', () => {
  test('should reject invalid role values', () => {
    const request = {
      body: {
        username: 'john_doe',
        email: 'john@example.com',
        roles: ['user', 'invalid-role'],
      },
      headers: {
        'api-key': 'valid-api-key',
      },
    };

    const result = validator.validate('/api/users', request);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'body.roles[1]',
        message: 'Invalid value for roles',
      })
    );
  });

  test('should reject missing required header', () => {
    const request = {
      body: {
        username: 'john_doe',
        email: 'john@example.com',
      },
      headers: {}, 
    };

    const result = validator.validate('/api/users', request);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'headers.api-key',
        message: 'api-key is required in headers.',
      })
    );
  });

  test('should accept valid request', () => {
    const request = {
      body: {
        username: 'john_doe',
        email: 'john@example.com',
        roles: ['user', 'admin'],
      },
      headers: {
        'api-key': 'valid-api-key',
      },
    };

    const result = validator.validate('/api/users', request);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('should reject missing required body fields', () => {
    const request = {
      body: {},
      headers: {
        'api-key': 'valid-api-key',
      },
    };

    const result = validator.validate('/api/users', request);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'body.username',
        message: 'username is required in the body.',
      })
    );
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'body.email',
        message: 'email is required in the body.',
      })
    );
    expect(result.errors).toContainEqual(
      expect.objectContaining({
        field: 'body.roles',
        message: 'roles is required in the body.',
      })
    );
  });
});
