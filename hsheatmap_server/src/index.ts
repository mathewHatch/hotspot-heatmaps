import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { HeatmapResolver } from "./resolvers/heatmap";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import puppeteer from "puppeteer";
import { DomainResolver } from "./resolvers/domain";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig); //connect to the database
  await orm.getMigrator().up(); //run migrations

  const app = express();
  //redis for session authentication
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  //allow for front end communication
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "asdflkajsdfljasldfj", //make environment variable
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, HeatmapResolver, UserResolver, DomainResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  //get screenshots to render for dealer websites.
  app.get("/screenshot", async (req, res) => {
    if (typeof req.query.url === "string") {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(req.query.url);
      const screenshotBuffer = await page.screenshot({
        type: "png",
      });

      if (!screenshotBuffer) {
      } else {
        res.writeHead(200, {
          ContentType: "image/png",
          "Content-Length": screenshotBuffer.length,
        });
        res.end(screenshotBuffer);

        await browser.close;
      }
    }
  });
  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(1337, () => {
    console.log("Server started on localhost:1337");
  });
};

main().catch((err) => {
  console.error(err);
});
