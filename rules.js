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
  