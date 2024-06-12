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

// src/routes/groups.ts
var groups_exports = {};
__export(groups_exports, {
  groupRoutes: () => groupRoutes
});
module.exports = __toCommonJS(groups_exports);

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
async function groupRoutes(app) {
  app.get("/", async () => {
    const groups = await knex("grupos").select();
    return groups;
  });
  app.get("/:id", async (request) => {
    const groupParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = groupParamSchema.parse(request.params);
    const grupo = await knex("grupos").where("id", id).first();
    return grupo;
  });
  app.post("/", async (request, reply) => {
    const createGrupoBodySchema = import_zod.z.object({
      descricao: import_zod.z.string()
    });
    const body = createGrupoBodySchema.parse(request.body);
    await knex("grupos").insert({
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
  app.put("/", async (request, reply) => {
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
  app.delete("/:id", async (request, reply) => {
    const deleteGroupParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = deleteGroupParamSchema.parse(request.params);
    await knex("grupos").where("id", id).del();
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupRoutes
});
