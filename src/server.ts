import fastify from 'fastify'
import cors from '@fastify/cors'
import { groupRoutes } from './routes/groups'
import { subGroupRoutes } from './routes/subGroups'
import { markRoutes } from './routes/mark'
import { costCenterRoutes } from './routes/costcenter'
import { activeRoutes } from './routes/actives'
import { noteRoutes } from './routes/note'

const app = fastify()

app.register(cors, {
  origin: true,
})

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


app.register(noteRoutes, {
  prefix: 'notes',
})

// app.listen({ port: 3333 }).then(() => {
//   console.log('HTTP Server Running!')
// })

app.listen({ port: 3333, host: '192.168.1.93' }).then(() => {
  console.log('HTTP Server Running!')
})
