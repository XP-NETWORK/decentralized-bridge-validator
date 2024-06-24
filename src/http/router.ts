import { EntityManager } from "@mikro-orm/sqlite";
import express from "express";
import { LockedEvent } from "../persistence/entities/locked";

export async function configureRouter(em: EntityManager) {
  const app = express();
  app.use(express.json());

  app.get<"/", { page: number; limit: number }>("/", async (req, res) => {
    const page = req.params.page ?? 1;
    const limit = req.params.limit ?? 10;
    const entities = await em
      .createQueryBuilder(LockedEvent, "lb")
      .select("*")
      .from("locked_event")
      .offset((page - 1) * limit)
      .limit(limit)
      .execute("all");
    return res.json(entities);
  });
  return app;
}
