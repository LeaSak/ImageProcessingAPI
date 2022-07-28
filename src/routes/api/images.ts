import express, { Router } from 'express';
import ImageController from '../../controllers/ImageController';

const images: Router = express.Router();

images.get('/', async (req:express.Request, res:express.Response): Promise<void> => {
  ImageController.processImageRequest(req, res);
});
export default images;
