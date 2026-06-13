// src/index.ts
import express from "express";
import cors from "cors";

// src/routers/food.router.ts
import { Router } from "express";

// src/database/index.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id           String   @id @default(cuid())\n  username     String   @unique\n  email        String   @unique\n  password     String\n  profileImage String?\n  address      String?\n  role         String   @default("customer")\n  orders       Order[]\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n\nmodel Category {\n  id        String   @id @default(cuid())\n  name      String   @unique\n  foods     Food[]\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Food {\n  id          String      @id @default(cuid())\n  name        String\n  price       Float\n  image       String\n  ingredients String\n  categories  Category[]\n  orderItems  OrderItem[]\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n}\n\nmodel Order {\n  id        String      @id @default(cuid())\n  userId    String\n  user      User        @relation(fields: [userId], references: [id])\n  items     OrderItem[]\n  status    String      @default("pending")\n  address   String?\n  total     Float       @default(0)\n  createdAt DateTime    @default(now())\n  updatedAt DateTime    @updatedAt\n}\n\nmodel OrderItem {\n  id       String @id @default(cuid())\n  orderId  String\n  order    Order  @relation(fields: [orderId], references: [id])\n  foodId   String\n  food     Food   @relation(fields: [foodId], references: [id])\n  quantity Int\n  price    Float\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"profileImage","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"foods","kind":"object","type":"Food","relationName":"CategoryToFood"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Food":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"ingredients","kind":"scalar","type":"String"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToFood"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"FoodToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"status","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"total","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"foodId","kind":"scalar","type":"String"},{"name":"food","kind":"object","type":"Food","relationName":"FoodToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","order","foods","_count","categories","orderItems","food","items","orders","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Food.findUnique","Food.findUniqueOrThrow","Food.findFirst","Food.findFirstOrThrow","Food.findMany","Food.createOne","Food.createMany","Food.createManyAndReturn","Food.updateOne","Food.updateMany","Food.updateManyAndReturn","Food.upsertOne","Food.deleteOne","Food.deleteMany","_avg","_sum","Food.groupBy","Food.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","AND","OR","NOT","id","orderId","foodId","quantity","price","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","userId","status","address","total","createdAt","updatedAt","name","image","ingredients","username","email","password","profileImage","role","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "qAIzUA0LAAChAQAgZAAAnQEAMGUAABoAEGYAAJ0BADBnAQAAAAF5AQCfAQAhe0AAoAEAIXxAAKABACGAAQEAAAABgQEBAAAAAYIBAQCeAQAhgwEBAJ8BACGEAQEAngEAIQEAAAABACAMAwAArQEAIAoAAKUBACBkAACsAQAwZQAAAwAQZgAArAEAMGcBAJ4BACF3AQCeAQAheAEAngEAIXkBAJ8BACF6CACjAQAhe0AAoAEAIXxAAKABACEDAwAAlgIAIAoAAJICACB5AAC6AQAgDAMAAK0BACAKAAClAQAgZAAArAEAMGUAAAMAEGYAAKwBADBnAQAAAAF3AQCeAQAheAEAngEAIXkBAJ8BACF6CACjAQAhe0AAoAEAIXxAAKABACEDAAAAAwAgAQAABAAwAgAABQAgCgQAAKoBACAJAACrAQAgZAAAqAEAMGUAAAcAEGYAAKgBADBnAQCeAQAhaAEAngEAIWkBAJ4BACFqAgCpAQAhawgAowEAIQIEAACUAgAgCQAAlQIAIAoEAACqAQAgCQAAqwEAIGQAAKgBADBlAAAHABBmAACoAQAwZwEAAAABaAEAngEAIWkBAJ4BACFqAgCpAQAhawgAowEAIQMAAAAHACABAAAIADACAAAJACAIBQAApwEAIGQAAKYBADBlAAALABBmAACmAQAwZwEAngEAIXtAAKABACF8QACgAQAhfQEAngEAIQEFAACTAgAgCAUAAKcBACBkAACmAQAwZQAACwAQZgAApgEAMGcBAAAAAXtAAKABACF8QACgAQAhfQEAAAABAwAAAAsAIAEAAAwAMAIAAA0AIAwHAACkAQAgCAAApQEAIGQAAKIBADBlAAAPABBmAACiAQAwZwEAngEAIWsIAKMBACF7QACgAQAhfEAAoAEAIX0BAJ4BACF-AQCeAQAhfwEAngEAIQIHAACRAgAgCAAAkgIAIAwHAACkAQAgCAAApQEAIGQAAKIBADBlAAAPABBmAACiAQAwZwEAAAABawgAowEAIXtAAKABACF8QACgAQAhfQEAngEAIX4BAJ4BACF_AQCeAQAhAwAAAA8AIAEAABAAMAIAABEAIAEAAAAPACADAAAABwAgAQAACAAwAgAACQAgAQAAAAsAIAEAAAAHACABAAAABwAgAQAAAAMAIAEAAAABACANCwAAoQEAIGQAAJ0BADBlAAAaABBmAACdAQAwZwEAngEAIXkBAJ8BACF7QACgAQAhfEAAoAEAIYABAQCeAQAhgQEBAJ4BACGCAQEAngEAIYMBAQCfAQAhhAEBAJ4BACEDCwAAkAIAIHkAALoBACCDAQAAugEAIAMAAAAaACABAAAbADACAAABACADAAAAGgAgAQAAGwAwAgAAAQAgAwAAABoAIAEAABsAMAIAAAEAIAoLAACPAgAgZwEAAAABeQEAAAABe0AAAAABfEAAAAABgAEBAAAAAYEBAQAAAAGCAQEAAAABgwEBAAAAAYQBAQAAAAEBEQAAHwAgCWcBAAAAAXkBAAAAAXtAAAAAAXxAAAAAAYABAQAAAAGBAQEAAAABggEBAAAAAYMBAQAAAAGEAQEAAAABAREAACEAMAERAAAhADAKCwAAggIAIGcBALMBACF5AQDAAQAhe0AAwQEAIXxAAMEBACGAAQEAswEAIYEBAQCzAQAhggEBALMBACGDAQEAwAEAIYQBAQCzAQAhAgAAAAEAIBEAACQAIAlnAQCzAQAheQEAwAEAIXtAAMEBACF8QADBAQAhgAEBALMBACGBAQEAswEAIYIBAQCzAQAhgwEBAMABACGEAQEAswEAIQIAAAAaACARAAAmACACAAAAGgAgEQAAJgAgAwAAAAEAIBgAAB8AIBkAACQAIAEAAAABACABAAAAGgAgBQYAAP8BACAeAACBAgAgHwAAgAIAIHkAALoBACCDAQAAugEAIAxkAACcAQAwZQAALQAQZgAAnAEAMGcBAIkBACF5AQCTAQAhe0AAlAEAIXxAAJQBACGAAQEAiQEAIYEBAQCJAQAhggEBAIkBACGDAQEAkwEAIYQBAQCJAQAhAwAAABoAIAEAACwAMB0AAC0AIAMAAAAaACABAAAbADACAAABACABAAAADQAgAQAAAA0AIAMAAAALACABAAAMADACAAANACADAAAACwAgAQAADAAwAgAADQAgAwAAAAsAIAEAAAwAMAIAAA0AIAUFAAD-AQAgZwEAAAABe0AAAAABfEAAAAABfQEAAAABAREAADUAIARnAQAAAAF7QAAAAAF8QAAAAAF9AQAAAAEBEQAANwAwAREAADcAMAUFAADyAQAgZwEAswEAIXtAAMEBACF8QADBAQAhfQEAswEAIQIAAAANACARAAA6ACAEZwEAswEAIXtAAMEBACF8QADBAQAhfQEAswEAIQIAAAALACARAAA8ACACAAAACwAgEQAAPAAgAwAAAA0AIBgAADUAIBkAADoAIAEAAAANACABAAAACwAgAwYAAO8BACAeAADxAQAgHwAA8AEAIAdkAACbAQAwZQAAQwAQZgAAmwEAMGcBAIkBACF7QACUAQAhfEAAlAEAIX0BAIkBACEDAAAACwAgAQAAQgAwHQAAQwAgAwAAAAsAIAEAAAwAMAIAAA0AIAEAAAARACABAAAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAMAAAAPACABAAAQADACAAARACADAAAADwAgAQAAEAAwAgAAEQAgCQcAAO0BACAIAADuAQAgZwEAAAABawgAAAABe0AAAAABfEAAAAABfQEAAAABfgEAAAABfwEAAAABAREAAEsAIAdnAQAAAAFrCAAAAAF7QAAAAAF8QAAAAAF9AQAAAAF-AQAAAAF_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_AQCeAQAhCGwIAAAAAW0IAAAABG4IAAAABG8IAAAAAXAIAAAAAXEIAAAAAXIIAAAAAXMIAI4BACEDhQEAAAsAIIYBAAALACCHAQAACwAgA4UBAAAHACCGAQAABwAghwEAAAcAIAgFAACnAQAgZAAApgEAMGUAAAsAEGYAAKYBADBnAQCeAQAhe0AAoAEAIXxAAKABACF9AQCeAQAhA4UBAAAPACCGAQAADwAghwEAAA8AIAoEAACqAQAgCQAAqwEAIGQAAKgBADBlAAAHABBmAACoAQAwZwEAngEAIWgBAJ4BACFpAQCeAQAhagIAqQEAIWsIAKMBACEIbAIAAAABbQIAAAAEbgIAAAAEbwIAAAABcAIAAAABcQIAAAABcgIAAAABcwIAjQEAIQ4DAACtAQAgCgAApQEAIGQAAKwBADBlAAADABBmAACsAQAwZwEAngEAIXcBAJ4BACF4AQCeAQAheQEAnwEAIXoIAKMBACF7QACgAQAhfEAAoAEAIYgBAAADACCJAQAAAwAgDgcAAKQBACAIAAClAQAgZAAAogEAMGUAAA8AEGYAAKIBADBnAQCeAQAhawgAowEAIXtAAKABACF8QACgAQAhfQEAngEAIX4BAJ4BACF_AQCeAQAhiAEAAA8AIIkBAAAPACAMAwAArQEAIAoAAKUBACBkAACsAQAwZQAAAwAQZgAArAEAMGcBAJ4BACF3AQCeAQAheAEAngEAIXkBAJ8BACF6CACjAQAhe0AAoAEAIXxAAKABACEPCwAAoQEAIGQAAJ0BADBlAAAaABBmAACdAQAwZwEAngEAIXkBAJ8BACF7QACgAQAhfEAAoAEAIYABAQCeAQAhgQEBAJ4BACGCAQEAngEAIYMBAQCfAQAhhAEBAJ4BACGIAQAAGgAgiQEAABoAIAAAAAAAAY0BAQAAAAEFjQECAAAAAZMBAgAAAAGUAQIAAAABlQECAAAAAZYBAgAAAAEFjQEIAAAAAZMBCAAAAAGUAQgAAAABlQEIAAAAAZYBCAAAAAEFGAAAoQIAIBkAAKcCACCKAQAAogIAIIsBAACmAgAgkAEAAAUAIAUYAACfAgAgGQAApAIAIIoBAACgAgAgiwEAAKMCACCQAQAAEQAgAxgAAKECACCKAQAAogIAIJABAAAFACADGAAAnwIAIIoBAACgAgAgkAEAABEAIAAAAAAAAAGNAQEAAAABAY0BQAAAAAEFGAAAmQIAIBkAAJ0CACCKAQAAmgIAIIsBAACcAgAgkAEAAAEAIAsYAADEAQAwGQAAyQEAMIoBAADFAQAwiwEAAMYBADCMAQAAxwEAII0BAADIAQAwjgEAAMgBADCPAQAAyAEAMJABAADIAQAwkQEAAMoBADCSAQAAywEAMAUJAAC5AQAgZwEAAAABaQEAAAABagIAAAABawgAAAABAgAAAAkAIBgAAM8BACADAAAACQAgGAAAzwEAIBkAAM4BACABEQAAmwIAMAoEAACqAQAgCQAAqwEAIGQAAKgBADBlAAAHABBmAACoAQAwZwEAAAABaAEAngEAIWkBAJ4BACFqAgCpAQAhawgAowEAIQIAAAAJACARAADOAQAgAgAAAMwBACARAADNAQAgCGQAAMsBADBlAADMAQAQZgAAywEAMGcBAJ4BACFoAQCeAQAhaQEAngEAIWoCAKkBACFrCACjAQAhCGQAAMsBADBlAADMAQAQZgAAywEAMGcBAJ4BACFoAQCeAQAhaQEAngEAIWoCAKkBACFrCACjAQAhBGcBALMBACFpAQCzAQAhagIAtAEAIWsIALUBACEFCQAAtwEAIGcBALMBACFpAQCzAQAhagIAtAEAIWsIALUBACEFCQAAuQEAIGcBAAAAAWkBAAAAAWoCAAAAAWsIAAAAAQMYAACZAgAgigEAAJoCACCQAQAAAQAgBBgAAMQBADCKAQAAxQEAMIwBAADHAQAgkAEAAMgBADAAAAAAAAoYAADiAQAwGQAA5gEAMIoBAADjAQAwiwEAAOQBADCNAQAA5QEAMI4BAADlAQAwjwEAAOUBADCQAQAA5QEAMJEBAADnAQAwkgEAAOgBADALGAAA2QEAMBkAAN0BADCKAQAA2gEAMIsBAADbAQAwjAEAANwBACCNAQAAyAEAMI4BAADIAQAwjwEAAMgBADCQAQAAyAEAMJEBAADeAQAwkgEAAMsBADAFBAAAuAEAIGcBAAAAAWgBAAAAAWoCAAAAAWsIAAAAAQIAAAAJACAYAADhAQAgAwAAAAkAIBgAAOEBACAZAADgAQAgAREAAJgCADACAAAACQAgEQAA4AEAIAIAAADMAQAgEQAA3wEAIARnAQCzAQAhaAEAswEAIWoCALQBACFrCAC1AQAhBQQAALYBACBnAQCzAQAhaAEAswEAIWoCALQBACFrCAC1AQAhBQQAALgBACBnAQAAAAFoAQAAAAFqAgAAAAFrCAAAAAEEZwEAAAABe0AAAAABfEAAAAABfQEAAAABAgAAAA0AIBgAAOwBACADAAAADQAgGAAA7AEAIBkAAOsBACAIBQAApwEAIGQAAKYBADBlAAALABBmAACmAQAwZwEAAAABe0AAoAEAIXxAAKABACF9AQAAAAECAAAADQAgEQAA6wEAIAIAAADpAQAgEQAA6gEAIAdkAADoAQAwZQAA6QEAEGYAAOgBADBnAQCeAQAhe0AAoAEAIXxAAKABACF9AQCeAQAhB2QAAOgBADBlAADpAQAQZgAA6AEAMGcBAJ4BACF7QACgAQAhfEAAoAEAIX0BAJ4BACEEZwEAswEAIXtAAMEBACF8QADBAQAhfQEAswEAIQRnAQCzAQAhe0AAwQEAIXxAAMEBACF9AQCzAQAhBGcBAAAAAXtAAAAAAXxAAAAAAX0BAAAAAQMYAADiAQAwigEAAOMBADCQAQAA5QEAMAQYAADZAQAwigEAANoBADCMAQAA3AEAIJABAADIAQAwAAAAChgAAPMBADAZAAD3AQAwigEAAPQBADCLAQAA9QEAMI0BAAD2AQAwjgEAAPYBADCPAQAA9gEAMJABAAD2AQAwkQEAAPgBADCSAQAA-QEAMAgIAADuAQAgZwEAAAABawgAAAABe0AAAAABfEAAAAABfQEAAAABfgEAAAABfwEAAAABAgAAABEAIBgAAP0BACADAAAAEQAgGAAA_QEAIBkAAPwBACAMBwAApAEAIAgAAKUBACBkAACiAQAwZQAADwAQZgAAogEAMGcBAAAAAWsIAKMBACF7QACgAQAhfEAAoAEAIX0BAJ4BACF-AQCeAQAhfwEAngEAIQIAAAARACARAAD8AQAgAgAAAPoBACARAAD7AQAgCmQAAPkBADBlAAD6AQAQZgAA-QEAMGcBAJ4BACFrCACjAQAhe0AAoAEAIXxAAKABACF9AQCeAQAhfgEAngEAIX8BAJ4BACEKZAAA-QEAMGUAAPoBABBmAAD5AQAwZwEAngEAIWsIAKMBACF7QACgAQAhfEAAoAEAIX0BAJ4BACF-AQCeAQAhfwEAngEAIQdnAQCzAQAhawgAtQEAIXtAAMEBACF8QADBAQAhfQEAswEAIX4BALMBACF_AQCzAQAhCAgAANgBACBnAQCzAQAhawgAtQEAIXtAAMEBACF8QADBAQAhfQEAswEAIX4BALMBACF_AQCzAQAhCAgAAO4BACBnAQAAAAFrCAAAAAF7QAAAAAF8QAAAAAF9AQAAAAF-AQAAAAF_AQAAAAEDGAAA8wEAMIoBAAD0AQAwkAEAAPYBADAAAAALGAAAgwIAMBkAAIgCADCKAQAAhAIAMIsBAACFAgAwjAEAAIYCACCNAQAAhwIAMI4BAACHAgAwjwEAAIcCADCQAQAAhwIAMJEBAACJAgAwkgEAAIoCADAHCgAA0QEAIGcBAAAAAXgBAAAAAXkBAAAAAXoIAAAAAXtAAAAAAXxAAAAAAQIAAAAFACAYAACOAgAgAwAAAAUAIBgAAI4CACAZAACNAgAgAREAAJcCADAMAwAArQEAIAoAAKUBACBkAACsAQAwZQAAAwAQZgAArAEAMGcBAAAAAXcBAJ4BACF4AQCeAQAheQEAnwEAIXoIAKMBACF7QACgAQAhfEAAoAEAIQIAAAAFACARAACNAgAgAgAAAIsCACARAACMAgAgCmQAAIoCADBlAACLAgAQZgAAigIAMGcBAJ4BACF3AQCeAQAheAEAngEAIXkBAJ8BACF6CACjAQAhe0AAoAEAIXxAAKABACEKZAAAigIAMGUAAIsCABBmAACKAgAwZwEAngEAIXcBAJ4BACF4AQCeAQAheQEAnwEAIXoIAKMBACF7QACgAQAhfEAAoAEAIQZnAQCzAQAheAEAswEAIXkBAMABACF6CAC1AQAhe0AAwQEAIXxAAMEBACEHCgAAwwEAIGcBALMBACF4AQCzAQAheQEAwAEAIXoIALUBACF7QADBAQAhfEAAwQEAIQcKAADRAQAgZwEAAAABeAEAAAABeQEAAAABeggAAAABe0AAAAABfEAAAAABBBgAAIMCADCKAQAAhAIAMIwBAACGAgAgkAEAAIcCADAAAAAAAwMAAJYCACAKAACSAgAgeQAAugEAIAIHAACRAgAgCAAAkgIAIAMLAACQAgAgeQAAugEAIIMBAAC6AQAgBmcBAAAAAXgBAAAAAXkBAAAAAXoIAAAAAXtAAAAAAXxAAAAAAQRnAQAAAAFoAQAAAAFqAgAAAAFrCAAAAAEJZwEAAAABeQEAAAABe0AAAAABfEAAAAABgAEBAAAAAYEBAQAAAAGCAQEAAAABgwEBAAAAAYQBAQAAAAECAAAAAQAgGAAAmQIAIARnAQAAAAFpAQAAAAFqAgAAAAFrCAAAAAEDAAAAGgAgGAAAmQIAIBkAAJ4CACALAAAAGgAgEQAAngIAIGcBALMBACF5AQDAAQAhe0AAwQEAIXxAAMEBACGAAQEAswEAIYEBAQCzAQAhggEBALMBACGDAQEAwAEAIYQBAQCzAQAhCWcBALMBACF5AQDAAQAhe0AAwQEAIXxAAMEBACGAAQEAswEAIYEBAQCzAQAhggEBALMBACGDAQEAwAEAIYQBAQCzAQAhCAcAAO0BACBnAQAAAAFrCAAAAAF7QAAAAAF8QAAAAAF9AQAAAAF-AQAAAAF_AQAAAAECAAAAEQAgGAAAnwIAIAgDAADQAQAgZwEAAAABdwEAAAABeAEAAAABeQEAAAABeggAAAABe0AAAAABfEAAAAABAgAAAAUAIBgAAKECACADAAAADwAgGAAAnwIAIBkAAKUCACAKAAAADwAgBwAA1wEAIBEAAKUCACBnAQCzAQAhawgAtQEAIXtAAMEBACF8QADBAQAhfQEAswEAIX4BALMBACF_AQCzAQAhCAcAANcBACBnAQCzAQAhawgAtQEAIXtAAMEBACF8QADBAQAhfQEAswEAIX4BALMBACF_AQCzAQAhAwAAAAMAIBgAAKECACAZAACoAgAgCgAAAAMAIAMAAMIBACARAACoAgAgZwEAswEAIXcBALMBACF4AQCzAQAheQEAwAEAIXoIALUBACF7QADBAQAhfEAAwQEAIQgDAADCAQAgZwEAswEAIXcBALMBACF4AQCzAQAheQEAwAEAIXoIALUBACF7QADBAQAhfEAAwQEAIQIGAAkLBgIDAwABBgAICgoDAgQAAgkABAMGAAcHDgUIFAMCBRIEBgAGAQUTAAIHFQAIFgABChcAAQsYAAAAAAMGAA4eAA8fABAAAAADBgAOHgAPHwAQAAADBgAVHgAWHwAXAAAAAwYAFR4AFh8AFwAABQYAHB4AHx8AIEAAHUEAHgAAAAAABQYAHB4AHx8AIEAAHUEAHgEDAAEBAwABBQYAJR4AKB8AKUAAJkEAJwAAAAAABQYAJR4AKB8AKUAAJkEAJwIEAAIJAAQCBAACCQAEBQYALh4AMR8AMkAAL0EAMAAAAAAABQYALh4AMR8AMkAAL0EAMAwCAQ0ZAQ4cAQ8dARAeARIgARMiChQjCxUlARYnChcoDBopARsqARwrCiAuDSEvESIwBSMxBSQyBSUzBSY0BSc2BSg4Cik5Eio7BSs9Ciw-Ey0_BS5ABS9BCjBEFDFFGDJGBDNHBDRIBDVJBDZKBDdMBDhOCjlPGTpRBDtTCjxUGj1VBD5WBD9XCkJaG0NbIURcAkVdAkZeAkdfAkhgAkliAkpkCktlIkxnAk1pCk5qI09rAlBsAlFtClJwJFNxKlRyA1VzA1Z0A1d1A1h2A1l4A1p6Clt7K1x9A11_Cl6AASxfgQEDYIIBA2GDAQpihgEtY4cBMw"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/database/index.ts
var adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
var prisma = new PrismaClient({ adapter });

// src/controllers/food/get-foods.ts
var getFoods = async (_req, res) => {
  const foods = await prisma.food.findMany({
    include: { categories: true },
    orderBy: { createdAt: "desc" }
  });
  res.status(200).json(foods);
};

// src/controllers/food/create-foods.ts
var createFood = async (req, res) => {
  const body = req.body;
  const food = await prisma.food.create({
    data: {
      name: body.name,
      price: body.price,
      image: body.image,
      ingredients: body.ingredients,
      categories: {
        connect: (body.categoryIds ?? []).map((id) => ({ id }))
      }
    },
    include: { categories: true }
  });
  res.status(201).json(food);
};

// src/controllers/food/update-food.ts
var updateFood = async (req, res) => {
  const id = req.params.id;
  const { name, price, ingredients, image, categoryIds } = req.body;
  const food = await prisma.food.update({
    where: { id },
    data: {
      name,
      price: parseFloat(price),
      ingredients,
      image,
      ...categoryIds && {
        categories: { set: categoryIds.map((cid) => ({ id: cid })) }
      }
    },
    include: { categories: true }
  });
  res.status(200).json(food);
};

// src/controllers/food/delete-food.ts
var deleteFood = async (req, res) => {
  const id = req.params.id;
  await prisma.orderItem.deleteMany({ where: { foodId: id } });
  await prisma.food.delete({ where: { id } });
  res.status(200).json({ message: "Deleted" });
};

// src/routers/food.router.ts
var FoodRouter = Router();
FoodRouter.get("/", getFoods).post("/", createFood).post("/create", createFood).put("/:id", updateFood).delete("/:id", deleteFood);

// src/routers/category.router.ts
import { Router as Router2 } from "express";

// src/controllers/category/get-categories.ts
var getCategories = async (_req, res) => {
  const categories = await prisma.category.findMany({
    include: { foods: true },
    orderBy: { createdAt: "asc" }
  });
  res.status(200).json(categories);
};

// src/controllers/category/create-category.ts
var createCategory = async (req, res) => {
  const body = req.body;
  const category = await prisma.category.create({
    data: {
      name: body.name
    }
  });
  res.status(201).json(category);
};

// src/routers/category.router.ts
var CategoryRouter = Router2();
CategoryRouter.get("/", getCategories).post("/create", createCategory);

// src/routers/auth.router.ts
import { Router as Router3 } from "express";

// src/controllers/auth/login.ts
import jwt from "jsonwebtoken";
var login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });
  const { password: userPassword, ...rest } = user;
  if (userPassword !== password) return res.status(401).json({ message: "Username or password wrong" });
  const accessToken = jwt.sign({ user: rest }, "Secret");
  res.status(200).json({
    user: rest,
    accessToken
  });
};

// src/controllers/auth/register.ts
var register = async (req, res) => {
  const { username, password, email } = req.body;
  const isUsernameExist = await prisma.user.findUnique({ where: { username } });
  if (isUsernameExist) return res.status(400).json({ message: "Username already exists" });
  const isEmailExist = await prisma.user.findUnique({ where: { email } });
  if (isEmailExist) return res.status(400).json({ message: "Email already exists" });
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email
    }
  });
  res.status(200).json({ user });
};

// src/routers/auth.router.ts
var AuthRouter = Router3();
AuthRouter.post("/login", login).post("/register", register);

// src/routers/order.router.ts
import { Router as Router4 } from "express";

// src/controllers/order/create.ts
var createOrder = async (req, res) => {
  const { userId, items, address, total } = req.body;
  const order = await prisma.order.create({
    data: {
      userId,
      address,
      total,
      items: {
        create: items.map((item) => ({
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: { items: { include: { food: true } } }
  });
  res.status(201).json({ order });
};

// src/controllers/order/getByUser.ts
var getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { food: true } } },
    orderBy: { createdAt: "desc" }
  });
  res.status(200).json({ orders });
};

// src/controllers/order/getAll.ts
var getAllOrders = async (_req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { email: true, username: true } },
      items: { include: { food: { select: { name: true } } } }
    },
    orderBy: { createdAt: "desc" }
  });
  res.status(200).json({ orders });
};

// src/controllers/order/updateStatus.ts
var updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id },
    data: { status }
  });
  res.status(200).json({ order });
};

// src/routers/order.router.ts
var OrderRouter = Router4();
OrderRouter.post("/", createOrder).get("/", getAllOrders).get("/user/:userId", getOrdersByUser).patch("/:id/status", updateOrderStatus);

// src/index.ts
var app = express();
app.use(cors());
app.use(express.json());
app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/orders", OrderRouter);
if (process.env["NODE_ENV"] !== "production") {
  app.listen(4e3, () => {
    console.log("Server running on port 4000");
  });
}
var index_default = app;
export {
  index_default as default
};
