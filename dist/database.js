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

// src/database.ts
var database_exports = {};
__export(database_exports, {
  knex: () => knex
});
module.exports = __toCommonJS(database_exports);
var import_knex = require("knex");
var knex = (0, import_knex.knex)({
  client: "pg",
  connection: {
    connectionString: "postgresql://solutions:sol_fin_2019@192.168.1.6:5435/patrimonio?schema=public"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  knex
});
