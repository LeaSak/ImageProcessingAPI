import express, { Router } from 'express';
import images from './api/images';
import fs from 'fs';

const routes: Router = express.Router();
routes.get('/', (req, res) => {
  res.send('Main api route');
});
routes.use('/images', images);
export default routes;
