module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "postgres",
    "host": process.env.DB_HOSTNAME,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
