// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'prototipo',
      password: 'postgres',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src'
    },
    log: {
      warn(message) {
      },
      error(message) {
      },
      deprecate(message) {
      },
      debug(message) {
      },
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'prototipo',
      password: 'postgres',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
