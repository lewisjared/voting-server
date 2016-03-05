module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "postgres",
    "host": process.env.DB_HOSTNAME,
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
