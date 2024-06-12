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

// src/routes/mark.ts
var mark_exports = {};
__export(mark_exports, {
  markRoutes: () => markRoutes
});
module.exports = __toCommonJS(mark_exports);
var import_zod = require("zod");

// src/database.ts
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});

// src/routes/mark.ts
async function markRoutes(app) {
  app.get("/", async () => {
    const marks = await knex("marcas").select().orderBy("descricao");
    return marks;
  });
  app.get("/:codigo", async (request) => {
    const markParamSchema = import_zod.z.object({
      codigo: import_zod.z.string()
    });
    const { codigo } = markParamSchema.parse(request.params);
    const marks = await knex("marcas").select().where("id", codigo).orderBy("descricao");
    return marks;
  });
  app.post("/", async (request, reply) => {
    const createMarkBodySchema = import_zod.z.object({
      descricao: import_zod.z.string()
    });
    const body = createMarkBodySchema.parse(request.body);
    await knex("marcas").insert({
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  markRoutes
});
