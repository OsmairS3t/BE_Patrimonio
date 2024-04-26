import { knex as configKnex } from 'knex'

export const knex = configKnex({
  client: 'pg',
  connection: {
    connectionString:
      'postgresql://postgres:postgres@localhost:5433/patrimonio?schema=public',
  },
})
