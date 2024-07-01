import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { ZeroLeft } from '../utils/function'

export async function activeRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const actives = await knex('ativos').select()
    return actives
  })

  app.get('/list/:centrocusto/:subgrupo', async (request: FastifyRequest) => {
    const condictionParamSchema = z.object({
      centrocusto: z.string().default('0'),
      subgrupo: z.string().default('0'),
    })
    const { subgrupo, centrocusto } = condictionParamSchema.parse(
      request.params,
    )

    let condition = ''
    let lines = 10
    if (centrocusto !== '0') {
      condition += 'ativos.codcentrocusto=' + centrocusto
      lines = 500
    }
    if (subgrupo !== '0') {
      if (condition !== '') {
        condition += ' and ativos.codsubgrupo=' + subgrupo
        lines = 500
      } else {
        condition += 'ativos.codsubgrupo=' + subgrupo
        lines = 500
      }
    }
    const actives = await knex('ativos')
      .select(['ativos.*', 'subgrupos.descricao as subgrupo'])
      .select(['ativos.*', 'centro_custo.descricao as centrocusto'])
      .select(['ativos.*', 'marcas.descricao as marca'])
      .table('ativos')
      .innerJoin('subgrupos', 'subgrupos.id', 'ativos.codsubgrupo')
      .innerJoin('centro_custo', 'centro_custo.id', 'ativos.codcentrocusto')
      .innerJoin('marcas', 'marcas.id', 'ativos.codmarca')
      .whereRaw(`${condition}`)
      .orderBy([
        { column: 'centro_custo', order: 'asc' },
        { column: 'subgrupo', order: 'asc' },
        { column: 'codigo', order: 'asc' },
        { column: 'descricao', order: 'asc' },
      ])
      .limit(lines, { skipBinding: true })
    return actives
  })

  app.get('/listactive/:centrocusto', async (request: FastifyRequest) => {
    const condictionParamSchema = z.object({
      centrocusto: z.string().default('0'),
    })
    const { centrocusto } = condictionParamSchema.parse(
      request.params,
    )
    let condition = ''
    let lines = 10
    if (centrocusto !== '0') {
      condition += 'ativos.codcentrocusto=' + centrocusto +' and ativos.status <> '
      lines = 500
    }
    const actives = await knex('ativos')
      .select(['ativos.*', 'subgrupos.descricao as subgrupo'])
      .select(['ativos.*', 'centro_custo.descricao as centrocusto'])
      .select(['ativos.*', 'marcas.descricao as marca'])
      .table('ativos')
      .innerJoin('subgrupos', 'subgrupos.id', 'ativos.codsubgrupo')
      .innerJoin('centro_custo', 'centro_custo.id', 'ativos.codcentrocusto')
      .innerJoin('marcas', 'marcas.id', 'ativos.codmarca')
      .where('ativos.codcentrocusto', centrocusto)
      .andWhere('ativos.status','<>','Baixado')
      .orderBy([
        { column: 'subgrupo', order: 'asc' },
        { column: 'codigo', order: 'asc' }
      ])
      .limit(lines, { skipBinding: true })
    return actives
  })

  app.get('/rel/:codcentrocusto', async (request: FastifyRequest) => {
    const activeParamSchema = z.object({
      codcentrocusto: z.string(),
    })
    const { codcentrocusto } = activeParamSchema.parse(request.params)
    const actives = await knex.raw('SELECT ativos.descricao as ativo, Count(ativos.descricao) AS qtde FROM ativos INNER JOIN centro_custo ON ativos.codcentrocusto = centro_custo.id WHERE ativos.codcentrocusto=? GROUP BY ativos.codcentrocusto, centro_custo.descricao, ativos.descricao ORDER BY centro_custo.descricao',[codcentrocusto])
    return actives.rows
  })

  app.get('/:codigo', async (request: FastifyRequest) => {
    const activeParamSchema = z.object({
      codigo: z.string(),
    })
    const { codigo } = activeParamSchema.parse(request.params)
    const active = await knex('ativos')
      .select(['ativos.*', 'subgrupos.descricao as subgrupo'])
      .select(['ativos.*', 'centro_custo.descricao as centrocusto'])
      .table('ativos')
      .innerJoin('subgrupos', 'subgrupos.id', 'ativos.codsubgrupo')
      .innerJoin('centro_custo', 'centro_custo.id', 'ativos.codcentrocusto')
      .where('codigo', codigo)
      .first()
    return active
  })

  app.put('/', async (request: FastifyRequest) => {
    const activeBodySchema = z.object({
      id: z.number(),
      status: z.string(),
      codcentrocusto: z.number(),
    })
    const body = activeBodySchema.parse(request.body)
    await knex('ativos')
      .update({
        status: body.status,
        codcentrocusto: body.codcentrocusto,
      })
      .where({ id: body.id })
  })

  app.put('/:id', async (request: FastifyRequest) => {
    const activeParamSchema = z.object({
      id: z.string()
    })
    const activeBodySchema = z.object({ encontrado: z.string() })
    const { id } = activeParamSchema.parse(request.params)
    const body = activeBodySchema.parse(request.body)
    try {
      await knex('ativos')
      .where({ id: Number(id) })
      .update({
        ultima_atualizacao: new Date(),
        encontrado: body.encontrado,
      })
    } catch (error) {
      throw error
    }
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const activeBodySchema = z.object({
      codigo: z.string(),
      status: z.string(),
      descricao: z.string(),
      aquisicao: z.string(),
      valor_aquisicao: z.string(),
      valor_atual: z.string(),
      depreciacao: z.string(),
      codsubgrupo: z.number(),
      codcentrocusto: z.number(),
      codmarca: z.number(),
    })
    const body = activeBodySchema.parse(request.body)
    const codAtivo = ZeroLeft(body.codigo, 6)
    await knex('ativos').insert({
      codigo: codAtivo,
      status: body.status,
      descricao: body.descricao,
      aquisicao: body.aquisicao,
      valor_aquisicao: body.valor_aquisicao,
      valor_atual: body.valor_atual,
      depreciacao: body.depreciacao,
      codsubgrupo: body.codsubgrupo,
      codcentrocusto: body.codcentrocusto,
      codmarca: body.codmarca,
    })
    return reply.status(201).send()
  })
}
