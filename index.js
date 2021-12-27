const { startServer } = require('./dist/ssr.js');

const PORT = process.env.PORT || 3000;

startServer(PORT);
