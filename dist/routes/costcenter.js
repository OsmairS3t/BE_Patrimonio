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

// src/routes/costcenter.ts
var costcenter_exports = {};
__export(costcenter_exports, {
  costCenterRoutes: () => costCenterRoutes
});
module.exports = __toCommonJS(costcenter_exports);
var import_zod = require("zod");

// src/database.ts
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});

// src/routes/costcenter.ts
async function costCenterRoutes(app) {
  app.get("/", async () => {
    const costCenter = await knex("centro_custo").select();
    return costCenter;
  });
  app.post("/", async (request, reply) => {
    const createCenterCostBodySchema = import_zod.z.object({
      descricao: import_zod.z.string()
    });
    const body = createCenterCostBodySchema.parse(request.body);
    await knex("centro_custo").insert({
      descricao: body.descricao
    });
    return reply.status(201).send();
  });
  app.delete("/:id", async (request, reply) => {
    const deleteCostCenterParamSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = deleteCostCenterParamSchema.parse(request.params);
    await knex("centro_custo").where("id", id).del();
    return reply.status(201).send();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  costCenterRoutes
});
