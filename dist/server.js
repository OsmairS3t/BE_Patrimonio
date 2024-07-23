"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/database.ts
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});

// src/routes/groups.ts
var import_zod = require("zod");
async function groupRoutes(app2) {
  app2.get("/", async () => {
    const groups = await knex("grupos").select();
    return groups;
  });
  app2.get("/:id", async (request) => {
    const groupParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = groupParamSchema.parse(request.params);
    const grupo = await knex("grupos").where("id", id).first();
    return grupo;
  });
  app2.post("/", async (request, reply) => {
    const createGrupoBodySchema = import_zod.z.object({
      descricao: import_zod.z.string()
    });
    const body = createGrupoBodySchema.parse(request.body);
    await knex("grupos").insert({
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
  app2.put("/", async (request, reply) => {
    const updateGroupBodySchema = import_zod.z.object({
      id: import_zod.z.number(),
      descricao: import_zod.z.string()
    });
    const { id, descricao } = updateGroupBodySchema.parse(request.body);
    await knex("grupos").where("id", id).update({
      id,
      descricao
    });
    return reply.status(201).send();
  });
  app2.delete("/:id", async (request, reply) => {
    const deleteGroupParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = deleteGroupParamSchema.parse(request.params);
    await knex("grupos").where("id", id).del();
    return reply.status(201).send();
  });
}

// src/routes/subGroups.ts
var import_zod2 = require("zod");
async function subGroupRoutes(app2) {
  app2.get("/", async () => {
    const subgroups = await knex("subgrupos").select(["subgrupos.*", "grupos.descricao as grupo"]).table("subgrupos").innerJoin("grupos", "grupos.id", "subgrupos.codgrupo").orderBy("grupos.descricao", "asc");
    return subgroups;
  });
  app2.get("/:id", async (request) => {
    const subGroupParamSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = subGroupParamSchema.parse(request.params);
    const subgroup = await knex("subgrupos").where("id", id).first();
    return { subgroup };
  });
  app2.post("/", async (request, reply) => {
    const createGrupoBodySchema = import_zod2.z.object({
      codgrupo: import_zod2.z.string(),
      descricao: import_zod2.z.string()
    });
    const body = createGrupoBodySchema.parse(request.body);
    await knex("subgrupos").insert({
      codgrupo: body.codgrupo,
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
  app2.put("/", async (request, reply) => {
    const updateSubGroupBodySchema = import_zod2.z.object({
      id: import_zod2.z.number(),
      codgrupo: import_zod2.z.number(),
      descricao: import_zod2.z.string()
    });
    const { id, codgrupo, descricao } = updateSubGroupBodySchema.parse(
      request.body
    );
    await knex("subgrupos").where("id", id).update({
      id,
      codgrupo,
      descricao
    });
    return reply.status(201).send();
  });
  app2.delete("/:id", async (request, reply) => {
    const deleteSubGroupParamSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = deleteSubGroupParamSchema.parse(request.params);
    await knex("subgrupos").where("id", id).del();
    return reply.status(201).send();
  });
}

// src/routes/mark.ts
var import_zod3 = require("zod");
async function markRoutes(app2) {
  app2.get("/", async () => {
    const marks = await knex("marcas").select().orderBy("descricao");
    return marks;
  });
  app2.get("/:codigo", async (request) => {
    const markParamSchema = import_zod3.z.object({
      codigo: import_zod3.z.string()
    });
    const { codigo } = markParamSchema.parse(request.params);
    const marks = await knex("marcas").select().where("id", codigo).orderBy("descricao");
    return marks;
  });
  app2.post("/", async (request, reply) => {
    const createMarkBodySchema = import_zod3.z.object({
      descricao: import_zod3.z.string()
    });
    const body = createMarkBodySchema.parse(request.body);
    await knex("marcas").insert({
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
}

// src/routes/costcenter.ts
var import_zod4 = require("zod");
async function costCenterRoutes(app2) {
  app2.get("/", async () => {
    const costCenter = await knex("centro_custo").orderBy("centro_custo.descricao", "asc").select();
    return costCenter;
  });
  app2.get("/:id", async (request) => {
    const createParamSchema = import_zod4.z.object({
      id: import_zod4.z.string()
    });
    const { id } = createParamSchema.parse(request.params);
    const costCenter = await knex("centro_custo").select("*").where("id", id);
    return costCenter;
  });
  app2.post("/", async (request, reply) => {
    const createCenterCostBodySchema = import_zod4.z.object({
      descricao: import_zod4.z.string()
    });
    const body = createCenterCostBodySchema.parse(request.body);
    await knex("centro_custo").insert({
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
  app2.delete("/:id", async (request, reply) => {
    const deleteCostCenterParamSchema = import_zod4.z.object({
      id: import_zod4.z.string()
    });
    const { id } = deleteCostCenterParamSchema.parse(request.params);
    await knex("centro_custo").where("id", id).del();
    return reply.status(201).send();
  });
}

// src/routes/actives.ts
var import_zod5 = require("zod");

// src/utils/function.ts
function ZeroLeft(value, size) {
  let add = "";
  if (value.length < size) {
    const rest = size - value.length;
    for (let i = 1; i <= rest; i++) {
      add += "0";
    }
  }
  return add + value;
}

// src/routes/actives.ts
async function activeRoutes(app2) {
  app2.get("/", async () => {
    const actives = await knex("ativos").select();
    return actives;
  });
  app2.get("/list/:centrocusto/:subgrupo", async (request) => {
    const condictionParamSchema = import_zod5.z.object({
      centrocusto: import_zod5.z.string().default("0"),
      subgrupo: import_zod5.z.string().default("0")
    });
    const { subgrupo, centrocusto } = condictionParamSchema.parse(
      request.params
    );
    let condition = "";
    let lines = 10;
    if (centrocusto !== "0") {
      condition += "ativos.codcentrocusto=" + centrocusto;
      lines = 500;
    }
    if (subgrupo !== "0") {
      if (condition !== "") {
        condition += " and ativos.codsubgrupo=" + subgrupo;
        lines = 500;
      } else {
        condition += "ativos.codsubgrupo=" + subgrupo;
        lines = 500;
      }
    }
    const actives = await knex("ativos").select(["ativos.*", "subgrupos.descricao as subgrupo"]).select(["ativos.*", "centro_custo.descricao as centrocusto"]).select(["ativos.*", "marcas.descricao as marca"]).table("ativos").innerJoin("subgrupos", "subgrupos.id", "ativos.codsubgrupo").innerJoin("centro_custo", "centro_custo.id", "ativos.codcentrocusto").innerJoin("marcas", "marcas.id", "ativos.codmarca").whereRaw(`${condition}`).orderBy([
      { column: "centro_custo", order: "asc" },
      { column: "subgrupo", order: "asc" },
      { column: "codigo", order: "asc" },
      { column: "descricao", order: "asc" }
    ]).limit(lines, { skipBinding: true });
    return actives;
  });
  app2.get("/listactive/:centrocusto", async (request) => {
    const condictionParamSchema = import_zod5.z.object({
      centrocusto: import_zod5.z.string().default("0")
    });
    const { centrocusto } = condictionParamSchema.parse(
      request.params
    );
    let condition = "";
    let lines = 10;
    if (centrocusto !== "0") {
      condition += "ativos.codcentrocusto=" + centrocusto + " and ativos.status <> ";
      lines = 500;
    }
    const actives = await knex("ativos").select(["ativos.*", "subgrupos.descricao as subgrupo"]).select(["ativos.*", "centro_custo.descricao as centrocusto"]).select(["ativos.*", "marcas.descricao as marca"]).table("ativos").innerJoin("subgrupos", "subgrupos.id", "ativos.codsubgrupo").innerJoin("centro_custo", "centro_custo.id", "ativos.codcentrocusto").innerJoin("marcas", "marcas.id", "ativos.codmarca").where("ativos.codcentrocusto", centrocusto).andWhere("ativos.status", "<>", "Baixado").orderBy([
      { column: "codigo", order: "asc" }
    ]).limit(lines, { skipBinding: true });
    return actives;
  });
  app2.get("/rel/:codcentrocusto", async (request) => {
    const activeParamSchema = import_zod5.z.object({
      codcentrocusto: import_zod5.z.string()
    });
    const { codcentrocusto } = activeParamSchema.parse(request.params);
    const actives = await knex.raw("SELECT ativos.descricao as ativo, Count(ativos.descricao) AS qtde FROM ativos INNER JOIN centro_custo ON ativos.codcentrocusto = centro_custo.id WHERE ativos.codcentrocusto=? GROUP BY ativos.codcentrocusto, centro_custo.descricao, ativos.descricao ORDER BY centro_custo.descricao", [codcentrocusto]);
    return actives.rows;
  });
  app2.get("/:codigo", async (request) => {
    const activeParamSchema = import_zod5.z.object({
      codigo: import_zod5.z.string()
    });
    const { codigo } = activeParamSchema.parse(request.params);
    const active = await knex("ativos").select(["ativos.*", "subgrupos.descricao as subgrupo"]).select(["ativos.*", "centro_custo.descricao as centrocusto"]).table("ativos").innerJoin("subgrupos", "subgrupos.id", "ativos.codsubgrupo").innerJoin("centro_custo", "centro_custo.id", "ativos.codcentrocusto").where("codigo", codigo).first();
    return active;
  });
  app2.put("/", async (request) => {
    const activeBodySchema = import_zod5.z.object({
      id: import_zod5.z.number(),
      status: import_zod5.z.string(),
      codcentrocusto: import_zod5.z.number()
    });
    const body = activeBodySchema.parse(request.body);
    await knex("ativos").update({
      status: body.status,
      codcentrocusto: body.codcentrocusto
    }).where({ id: body.id });
  });
  app2.put("/:id", async (request) => {
    const activeParamSchema = import_zod5.z.object({
      id: import_zod5.z.string()
    });
    const activeBodySchema = import_zod5.z.object({ encontrado: import_zod5.z.string() });
    const { id } = activeParamSchema.parse(request.params);
    const body = activeBodySchema.parse(request.body);
    try {
      await knex("ativos").where({ id: Number(id) }).update({
        ultima_atualizacao: /* @__PURE__ */ new Date(),
        encontrado: body.encontrado
      });
    } catch (error) {
      throw error;
    }
  });
  app2.post("/", async (request, reply) => {
    const activeBodySchema = import_zod5.z.object({
      codigo: import_zod5.z.string(),
      status: import_zod5.z.string(),
      descricao: import_zod5.z.string(),
      aquisicao: import_zod5.z.string(),
      valor_aquisicao: import_zod5.z.string(),
      valor_atual: import_zod5.z.string(),
      depreciacao: import_zod5.z.string(),
      codsubgrupo: import_zod5.z.number(),
      codcentrocusto: import_zod5.z.number(),
      codmarca: import_zod5.z.number()
    });
    const body = activeBodySchema.parse(request.body);
    const codAtivo = ZeroLeft(body.codigo, 6);
    await knex("ativos").insert({
      codigo: codAtivo,
      status: body.status,
      descricao: body.descricao,
      aquisicao: body.aquisicao,
      valor_aquisicao: body.valor_aquisicao,
      valor_atual: body.valor_atual,
      depreciacao: body.depreciacao,
      codsubgrupo: body.codsubgrupo,
      codcentrocusto: body.codcentrocusto,
      codmarca: body.codmarca
    });
    return reply.status(201).send();
  });
}

// src/routes/note.ts
var import_zod6 = require("zod");
async function noteRoutes(app2) {
  app2.get("/", async () => {
    const notes = await knex("notes").select("notes.*", "centro_custo.descricao as centrocusto").innerJoin("centro_custo", "centro_custo.id", "notes.costcenterorigin");
    return notes;
  });
  app2.post("/", async (request, reply) => {
    const lastId = await knex("notes").select().max("id");
    const noteBodySchema = import_zod6.z.object({
      costcenterorigin: import_zod6.z.number(),
      active: import_zod6.z.string(),
      obs: import_zod6.z.string()
    });
    const body = noteBodySchema.parse(request.body);
    const idNote = lastId[0].max === null ? 1 : Number(lastId[0].max) + 1;
    await knex("notes").insert({
      id: idNote,
      costcenterorigin: body.costcenterorigin,
      active: body.active,
      obs: body.obs
    });
    return reply.status(201).send();
  });
  app2.delete("/:id", async (request, reply) => {
    const noteParamSchema = import_zod6.z.object({
      id: import_zod6.z.string()
    });
    const { id } = noteParamSchema.parse(request.params);
    await knex("notes").where("id", id).del();
    return reply.status(201).send();
  });
}

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: true
});
app.register(groupRoutes, {
  prefix: "grupos"
});
app.register(subGroupRoutes, {
  prefix: "subgrupos"
});
app.register(markRoutes, {
  prefix: "marcas"
});
app.register(costCenterRoutes, {
  prefix: "centrocusto"
});
app.register(activeRoutes, {
  prefix: "ativos"
});
app.register(noteRoutes, {
  prefix: "notes"
});
app.listen({ port: 3333, host: "192.168.1.93" }).then(() => {
  console.log("HTTP Server Running!");
});
