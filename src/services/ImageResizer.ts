import sharp from 'sharp';
import {ImageRequestData}  from '../services/ImageFinder';

export default class ImageResizer {
 static async resizeImage(obj: ImageRequestData, baseImagePath: string, thumbImagePath: string ): Promise<string> {
  try {
    const sharpImage = thumbImagePath ? await sharp(baseImagePath).resize(Number(obj.width), Number(obj.height)).toFile(thumbImagePath): '';
    return (sharpImage) ? thumbImagePath : "";
  } catch (error) {
    console.error(error);
    return "";
  }
}
}
