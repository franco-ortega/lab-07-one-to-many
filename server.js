const app = require('./lib/app')

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);

});
