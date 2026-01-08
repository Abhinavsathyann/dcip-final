import express from "express";

export function createServer() {
  const app = express();

  app.get("/api/health", (_, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
