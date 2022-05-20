const hapi = require('@hapi/hapi');
const route = require('./route');

const init = async () => {
  const server = hapi.server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(route);

  await server.start();

  console.log(`Server is running on ${server.info.uri}`);
};

init();
