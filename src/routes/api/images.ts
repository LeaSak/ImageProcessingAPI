import express, { Router } from 'express';
import ImageController from '../../controllers/ImageController';

const images: Router = express.Router();

images.get('/', async (req, res): Promise<void> => {
  ImageController.processImageRequest(req, res);
});
export default images;
