import expressPromiseRouter from 'express-promise-router';
import { routerHandlers } from '../app/modules';
import cors from 'cors';

const router = expressPromiseRouter();

routerHandlers.forEach((routerProperty) => {
  routerProperty.routes.forEach((config) => {
    const {
      method = '',
      route = '',
      handlers = []
    } = config;

    const endpoint = routerProperty.baseUrl + route;

    router.route(endpoint).options(cors());
    router.route(endpoint)[method.toLowerCase()](...handlers);
  });
});

export default router;