import fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './env'
import { groupRoutes } from './routes/groups'
import { subGroupRoutes } from './routes/subGroups'
import { markRoutes } from './routes/mark'
import { costCenterRoutes } from './routes/costcenter'
import { activeRoutes } from './routes/actives'

const app = fastify()

app.register(cors)

app.register(groupRoutes, {
  prefix: 'grupos',
})

app.register(subGroupRoutes, {
  prefix: 'subgrupos',
})

app.register(markRoutes, {
  prefix: 'marcas',
})

app.register(costCenterRoutes, {
  prefix: 'centrocusto',
})

app.register(activeRoutes, {
  prefix: 'ativos',
})

app.listen({ port: Number(env.SERVER_PORT) }).then(() => {
  console.log('HTTP Server Running!')
})
