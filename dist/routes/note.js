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

// src/routes/note.ts
var note_exports = {};
__export(note_exports, {
  noteRoutes: () => noteRoutes
});
module.exports = __toCommonJS(note_exports);

// src/database.ts
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});

// src/routes/note.ts
var import_zod = require("zod");
async function noteRoutes(app) {
  app.get("/", async () => {
    const notes = await knex("notes").select("notes.*", "centro_custo.descricao as centrocusto").innerJoin("centro_custo", "centro_custo.id", "notes.costcenterorigin");
    return notes;
  });
  app.post("/", async (request, reply) => {
    const lastId = await knex("notes").select().max("id");
    const noteBodySchema = import_zod.z.object({
      costcenterorigin: import_zod.z.number(),
      active: import_zod.z.string(),
      obs: import_zod.z.string()
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
  app.delete("/:id", async (request, reply) => {
    const noteParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = noteParamSchema.parse(request.params);
    await knex("notes").where("id", id).del();
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  noteRoutes
});
