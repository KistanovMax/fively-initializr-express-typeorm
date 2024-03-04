import { config } from 'dotenv';

import initApp from './app';
import { AppDataSource } from './data-source';

config();

const { PORT = 3001 } = process.env;

AppDataSource.initialize()
  .then(async () => {
    const app = await initApp();

    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });
  })
  .catch((error) => console.log(error));
