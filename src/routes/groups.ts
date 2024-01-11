import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function groupRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const groups = await knex('grupos').select()
    return groups
  })

  app.get('/:id', async (request: FastifyRequest) => {
    const groupParamSchema = z.object({
      id: z.string(),
    })
    const { id } = groupParamSchema.parse(request.params)
    const grupo = await knex('grupos').where('id', id).first()
    return grupo
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createGrupoBodySchema = z.object({
      descricao: z.string(),
    })
    const body = createGrupoBodySchema.parse(request.body)

    await knex('grupos').insert({
      descricao: body.descricao,
    })
    return reply.status(201).send()
  })

  app.put('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const updateGroupBodySchema = z.object({
      id: z.number(),
      descricao: z.string(),
    })
    const { id, descricao } = updateGroupBodySchema.parse(request.body)
    await knex('grupos').where('id', id).update({
      id,
      descricao,
    })
    return reply.status(201).send()
  })

  app.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteGroupParamSchema = z.object({
      id: z.string(),
    })
    const { id } = deleteGroupParamSchema.parse(request.params)
    await knex('grupos').where('id', id).del()
    return reply.status(201).send()
  })
}
