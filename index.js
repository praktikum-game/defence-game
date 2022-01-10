const { startServer } = require('./dist/ssr.js');

const PORT = process.env.NODE_ENV === 'production' ? 3000 : 443;

startServer(PORT);
