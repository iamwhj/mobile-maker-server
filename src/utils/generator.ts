import Koa from 'koa'
import Router from 'koa-router'
import { resolve } from 'path'
import { readdirSync } from 'fs';

const router = new Router()

export const generateRouter = (app: Koa, routerPath: string, prefix = ''): void => {
  const result = readdirSync(routerPath);
    result.forEach(item => {
      const current = require(resolve(routerPath, item));
      if (current.routes) {
        router.use(prefix, current.routes(), current.allowedMethods());
      } else if (current.default && current.default.routes) {
        router.use(prefix, current.default.routes(), current.default.allowedMethods());
      }
    });
    app.use(router.routes()).use(router.allowedMethods());
  };