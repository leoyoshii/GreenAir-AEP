import { app } from './app';

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Is running in ${process.env.APP_PORT}`);
});
