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

// src/routes/subGroups.ts
var subGroups_exports = {};
__export(subGroups_exports, {
  subGroupRoutes: () => subGroupRoutes
});
module.exports = __toCommonJS(subGroups_exports);

// src/database.ts
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});

// src/routes/subGroups.ts
var import_zod = require("zod");
async function subGroupRoutes(app) {
  app.get("/", async () => {
    const subgroups = await knex("subgrupos").select(["subgrupos.*", "grupos.descricao as grupo"]).table("subgrupos").innerJoin("grupos", "grupos.id", "subgrupos.codgrupo").orderBy("grupos.descricao", "asc");
    return subgroups;
  });
  app.get("/:id", async (request) => {
    const subGroupParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = subGroupParamSchema.parse(request.params);
    const subgroup = await knex("subgrupos").where("id", id).first();
    return { subgroup };
  });
  app.post("/", async (request, reply) => {
    const createGrupoBodySchema = import_zod.z.object({
      codgrupo: import_zod.z.string(),
      descricao: import_zod.z.string()
    });
    const body = createGrupoBodySchema.parse(request.body);
    await knex("subgrupos").insert({
      codgrupo: body.codgrupo,
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
  app.put("/", async (request, reply) => {
    const updateSubGroupBodySchema = import_zod.z.object({
      id: import_zod.z.number(),
      codgrupo: import_zod.z.number(),
      descricao: import_zod.z.string()
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
  app.delete("/:id", async (request, reply) => {
    const deleteSubGroupParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = deleteSubGroupParamSchema.parse(request.params);
    await knex("subgrupos").where("id", id).del();
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  subGroupRoutes
});
