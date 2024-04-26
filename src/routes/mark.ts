import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

// const marcas = [
//   {
//     id: 1,
//     descricao: 'Marca 01',
//   },
//   {
//     id: 2,
//     descricao: 'Marca 02',
//   },
//   {
//     id: 3,
//     descricao: 'Marca 03',
//   },
//   {
//     id: 4,
//     descricao: 'Marca 04',
//   },
// ]

export async function markRoutes(app: FastifyInstance) {
  // app.get('/', async () => {
  //   return marcas
  // })
  app.get('/', async () => {
    const marks = await knex('marcas').select().orderBy('descricao')
    return marks
  })

  app.get('/:codigo', async (request: FastifyRequest) => {
    const markParamSchema = z.object({
      codigo: z.string(),
    })
    const { codigo } = markParamSchema.parse(request.params)
    const marks = await knex('marcas')
      .select()
      .where('id', codigo)
      .orderBy('descricao')
    return marks
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createMarkBodySchema = z.object({
      descricao: z.string(),
    })
    const body = createMarkBodySchema.parse(request.body)

    await knex('marcas').insert({
      descricao: body.descricao,
    })
    return reply.status(201).send()
  })
}
