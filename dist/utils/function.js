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

// src/utils/function.ts
var function_exports = {};
__export(function_exports, {
  ZeroLeft: () => ZeroLeft
});
module.exports = __toCommonJS(function_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZeroLeft
});
