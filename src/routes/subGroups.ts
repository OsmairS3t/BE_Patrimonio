import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function subGroupRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const subgroups = await knex('subgrupos')
      .select(['subgrupos.*', 'grupos.descricao as grupo'])
      .table('subgrupos')
      .innerJoin('grupos', 'grupos.id', 'subgrupos.codgrupo')
      .orderBy('grupos.descricao', 'asc')
    return subgroups
  })

  app.get('/:id', async (request: FastifyRequest) => {
    const subGroupParamSchema = z.object({
      id: z.string(),
    })
    const { id } = subGroupParamSchema.parse(request.params)
    const subgroup = await knex('subgrupos').where('id', id).first()
    return { subgroup }
  })

  // app.get('/:idgroup', async (request) => {
  //   const deleteGroupParamSchema = z.object({
  //     idgroup: z.string(),
  //   })
  //   const { idgroup } = deleteGroupParamSchema.parse(request.params)
  //   const subgroups = await knex('subgrupos').where('codgrupo', idgroup)
  //   return { subgroups }
  // })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createGrupoBodySchema = z.object({
      codgrupo: z.string(),
      descricao: z.string(),
    })
    const body = createGrupoBodySchema.parse(request.body)

    await knex('subgrupos').insert({
      codgrupo: body.codgrupo,
      descricao: body.descricao,
    })
    return reply.status(201).send()
  })

  app.put('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const updateSubGroupBodySchema = z.object({
      id: z.number(),
      codgrupo: z.number(),
      descricao: z.string(),
    })
    const { id, codgrupo, descricao } = updateSubGroupBodySchema.parse(
      request.body,
    )
    await knex('subgrupos').where('id', id).update({
      id,
      codgrupo,
      descricao,
    })
    return reply.status(201).send()
  })

  app.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const deleteSubGroupParamSchema = z.object({
      id: z.string(),
    })
    const { id } = deleteSubGroupParamSchema.parse(request.params)
    await knex('subgrupos').where('id', id).del()
    return reply.status(201).send()
  })
}
