const { app } = require('./dist/ssr.js');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Yo! Bro! Server started on port:', PORT);
});
