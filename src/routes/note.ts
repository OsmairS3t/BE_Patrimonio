import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function noteRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const notes = await knex('notes')
      .select('notes.*', 'centro_custo.descricao as centrocusto')
      .innerJoin('centro_custo', 'centro_custo.id', 'notes.costcenterorigin')
    return notes
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const lastId = await knex('notes').select().max('id')
    const noteBodySchema = z.object({
      costcenterorigin: z.number(),
      active: z.string(),
      obs: z.string(),
    })
    const body = noteBodySchema.parse(request.body)
    const idNote = lastId[0].max === null ? 1 : Number(lastId[0].max) + 1
    await knex('notes').insert({
      id: idNote,
      costcenterorigin: body.costcenterorigin,
      active: body.active,
      obs: body.obs,
    })
    return reply.status(201).send()
  })

  app.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const noteParamSchema = z.object({
      id: z.string(),
    })
    const { id } = noteParamSchema.parse(request.params)
    await knex('notes').where('id', id).del()
    return reply.status(201).send()
  })
}
