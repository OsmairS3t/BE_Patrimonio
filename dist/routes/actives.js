"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/actives.ts
var actives_exports = {};
__export(actives_exports, {
  activeRoutes: () => activeRoutes
});
module.exports = __toCommonJS(actives_exports);

// src/database.ts
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});

// src/routes/actives.ts
var import_zod = require("zod");

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
async function activeRoutes(app) {
  app.get("/", async () => {
    const actives = await knex("ativos").select();
    return actives;
  });
  app.get("/list/:centrocusto/:subgrupo", async (request) => {
    const condictionParamSchema = import_zod.z.object({
      centrocusto: import_zod.z.string().default("0"),
      subgrupo: import_zod.z.string().default("0")
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
    const actives = await knex("ativos").select(["ativos.*", "subgrupos.descricao as subgrupo"]).select(["ativos.*", "centro_custo.descricao as centrocusto"]).table("ativos").innerJoin("subgrupos", "subgrupos.id", "ativos.codsubgrupo").innerJoin("centro_custo", "centro_custo.id", "ativos.codcentrocusto").whereRaw(`${condition}`).orderBy([
      { column: "codcentrocusto", order: "asc" },
      { column: "subgrupo", order: "asc" },
      { column: "descricao", order: "asc" },
      { column: "codigo", order: "asc" }
    ]).limit(lines, { skipBinding: true });
    return actives;
  });
  app.get("/:codigo", async (request) => {
    const activeParamSchema = import_zod.z.object({
      codigo: import_zod.z.string()
    });
    const { codigo } = activeParamSchema.parse(request.params);
    const active = await knex("ativos").select(["ativos.*", "subgrupos.descricao as subgrupo"]).select(["ativos.*", "centro_custo.descricao as centrocusto"]).table("ativos").innerJoin("subgrupos", "subgrupos.id", "ativos.codsubgrupo").innerJoin("centro_custo", "centro_custo.id", "ativos.codcentrocusto").where("codigo", codigo).first();
    return active;
  });
  app.put("/", async (request) => {
    const activeBodySchema = import_zod.z.object({
      id: import_zod.z.number(),
      status: import_zod.z.string(),
      codcentrocusto: import_zod.z.number()
    });
    const body = activeBodySchema.parse(request.body);
    await knex("ativos").update({
      status: body.status,
      codcentrocusto: body.codcentrocusto
    }).where({ id: body.id });
  });
  app.post("/", async (request, reply) => {
    const activeBodySchema = import_zod.z.object({
      codigo: import_zod.z.string(),
      status: import_zod.z.string(),
      descricao: import_zod.z.string(),
      aquisicao: import_zod.z.string(),
      valor_aquisicao: import_zod.z.string(),
      valor_atual: import_zod.z.string(),
      depreciacao: import_zod.z.string(),
      codsubgrupo: import_zod.z.number(),
      codcentrocusto: import_zod.z.number(),
      codmarca: import_zod.z.number()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activeRoutes
});
