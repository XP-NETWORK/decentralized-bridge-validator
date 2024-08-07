import type { EntityManager } from "@mikro-orm/sqlite";
import express from "express";
import * as t from "io-ts";
import * as tt from "io-ts-types";
import { LockedEvent } from "../persistence/entities/locked";
import { paramsValidator, queryValidator } from "./validators";

export async function configureRouter(em: EntityManager) {
  const app = express();
  app.use(express.json());

  app.get(
    "/:chain",
    paramsValidator(
      t.type({
        chain: t.string,
      }),
    ),
    queryValidator(
      t.type({
        cursor: t.union([tt.NumberFromString, t.undefined]),
        limit: t.union([tt.NumberFromString, t.undefined]),
      }),
    ),
    async (req, res) => {
      const chain = req.params.chain;
      const cursor = req.query.cursor ?? 0;
      const limit = req.query.limit ?? 10;
      const entities = await em
        .createQueryBuilder(LockedEvent, "lb")
        .select("*")
        .from("locked_event")
        .where({ listener_chain: chain })
        .andWhere(`id >= ${cursor}`)
        .limit(limit)
        .execute("all");
      return res.json(entities);
    },
  );
  return app;
}
