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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  playStatusSchema: () => playStatusSchema,
  socketDataSchema: () => socketDataSchema
});
module.exports = __toCommonJS(src_exports);

// src/socket.ts
var import_zod = require("zod");
var playStatusSchema = import_zod.z.union([
  import_zod.z.literal("idle"),
  import_zod.z.literal("offline"),
  import_zod.z.literal("ready"),
  import_zod.z.literal("on-hold"),
  import_zod.z.literal("voting"),
  import_zod.z.literal("voted")
]).default("idle");
var socketDataSchema = import_zod.z.object({
  id: import_zod.z.string().uuid().nonempty(),
  username: import_zod.z.string().nonempty(),
  value: import_zod.z.number().nullable().optional(),
  status: playStatusSchema
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  playStatusSchema,
  socketDataSchema
});
