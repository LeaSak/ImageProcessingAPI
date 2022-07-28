import express from 'express';
import routes from './routes/index';
import path from 'path';
import { buildDirectories } from './utilities/fileUtilities';
import { config } from './config/config';

const app = express();
const port:number = config.port;

app.use('/api', routes);

app.listen(port, (): void =>{
  const fullDirName = path.join(__dirname, '..', config.paths.full);
  const thumbDirName = path.join(__dirname, '..', config.paths.thumb);
  buildDirectories(fullDirName);
  buildDirectories(thumbDirName);
  console.log(`server started at localhost:${port}`);
});

export default app;
