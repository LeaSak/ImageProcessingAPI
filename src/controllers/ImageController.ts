
import {Request, Response} from 'express';
import {ImageRequestData} from '../services/ImageFinder';
import ImageFinder from '../services/ImageFinder';

export default class ImageController {
    
    static async processImageRequest(req: Request, res: Response): Promise<void> {
        const imageData = ImageController.collectRequestData(req);
        const validRequest = ImageController.validateRequest(imageData);
        if (!validRequest){
            ImageController.sendInvalidURLRequest(res);
            return;
        }
        const imagePath = await ImageFinder.getImageByNameWidthAndHeight(imageData);
        return (imagePath) ? this.sendResizedFile(res, imagePath) : this.sendErrorStatus(res);
    }

    static collectRequestData(req:Request): ImageRequestData{
        const imageRequest: ImageRequestData = {
            filename: req.query.filename as string,
            width: req.query.width as string,
            height: req.query.height as string,
          };
        return imageRequest;
    }

    static validateRequest(obj: ImageRequestData): boolean{
        return Boolean((obj.filename && obj.width && obj.height) && this.isPositiveInteger(obj));
    }

    static isPositiveInteger(obj: ImageRequestData): boolean{
        const widthAsNumber = (obj.width) ? parseInt(obj.width, 10) : 0;
        const heightAsNumber = (obj.height) ? parseInt(obj.height, 10) : 0;
        return Boolean(widthAsNumber > 0 && heightAsNumber > 0);
    }

    static sendInvalidURLRequest(res:Response): void{
        res.status(400).send('Invalid parameters. Please provide name, with and height. Width and height should be non negative.');
    }

    static sendErrorStatus(res:Response): void{
        res.status(404).send('Error finding requested image');
    }

    static sendResizedFile(res:Response, path: string): void{
        res.status(200).sendFile(path);
    }

}