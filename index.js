const { startServer } = require('./dist/ssr.js');

const PORT = process.env.PORT || 3000;

startServer(443);
// app.listen(PORT, () => {
//   console.log('\x1b[32m', 'Web server started on port:', PORT);
//   console.log('\x1b[0m');
// });
