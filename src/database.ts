import { knex as configKnex } from 'knex'
import { env } from './env'

export const knex = configKnex({
  client: 'pg',
  connection: {
    connectionString: env.DATABASE_CONNECTIONSTRING,
  },
})
