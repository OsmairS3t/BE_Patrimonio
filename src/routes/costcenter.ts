import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function costCenterRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const costCenter = await knex('centro_custo')
      .orderBy('centro_custo.descricao', 'asc')
      .select()
    return costCenter
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createCenterCostBodySchema = z.object({
      descricao: z.string(),
    })
    const body = createCenterCostBodySchema.parse(request.body)

    await knex('centro_custo').insert({
      descricao: body.descricao,
    })
    return reply.status(201).send()
  })

  app.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteCostCenterParamSchema = z.object({
      id: z.string(),
    })
    const { id } = deleteCostCenterParamSchema.parse(request.params)
    await knex('centro_custo').where('id', id).del()
    return reply.status(201).send()
  })
}
