// @flow

import { join } from 'path';
import http from 'http';
import express from 'express';
import next from 'next';

const app = createApp();
const server = http.createServer(app);

startNextApp(app, server);

export function createApp(): express$Application {
  const app = express();
  // This is where Express middlewares can be added
  // app.use(...);

  return app;
}

export async function startNextApp(
  app: express$Application,
  server: net$Server
) {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev, dir: join(__dirname, '..') });
  const nextHandler = nextApp.getRequestHandler();

  await nextApp.prepare();

  app.get('/about', (req: express$Request, res: express$Response) => {
    return nextApp.render(req, res, '/about');
  });

  app.get(
    '/:testKindId/:sectionName',
    (req: express$Request, res: express$Response) => {
      const { testKindId, sectionName } = req.params;

      return nextApp.render(req, res, '/index', {
        testKindId,
        sectionName
      });
    }
  );

  app.get('/:testKindId', (req: express$Request, res: express$Response) => {
    return nextApp.render(req, res, '/index', {
      testKindId: req.params.testKindId
    });
  });

  app.get('*', (req: express$Request, res: express$Response) => {
    return nextHandler(req, res);
  });

  startServer(server, 3000);
}

export function startServer(server: net$Server, port: number) {
  // https://github.com/facebook/flow/issues/1684#issuecomment-222627634
  server.listen(port, undefined, undefined, err => {
    if (err) throw err;

    console.log(`> Ready on http://localhost:${port}`);
  });
}
