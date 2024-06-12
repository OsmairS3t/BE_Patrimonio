import { knex as configKnex } from 'knex'

export const knex = configKnex({
  client: 'pg',
  connection: {
    connectionString:
      'postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public',
  },
})
