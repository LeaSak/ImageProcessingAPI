import path from 'path';
import { checkFileAccess } from '../utilities/fileUtilities';
import ImageResizer from './ImageResizer';
import { config } from '../config/config';

export interface ImageRequestData {
  filename: string;
  width: string;
  height: string;
}

/**
 * searches thumbnail image in file system
 * by name and dimensions.
 */
export default class ImageFinder {
  static async getImageByNameWidthAndHeight(
    obj: ImageRequestData
  ): Promise<string> {
    const baseImagePath: string = this.getBaseImagePath(obj);
    const thumbImagePath: string = this.getThumbImagePath(obj);
    const thumbAccess: string = thumbImagePath
      ? await this.checkImageAccessByPath(thumbImagePath)
      : '';

    if (thumbAccess) {
      return thumbImagePath;
    }

    const baseImageAccess: string = await this.checkImageAccessByPath(
      baseImagePath
    );
    if (!baseImageAccess) {
      return '';
    }
    const resizedImagePath: string = await ImageResizer.resizeImage(
      obj,
      baseImagePath,
      thumbImagePath
    );
    return resizedImagePath;
  }

  static getBaseImagePath(obj: ImageRequestData): string {
    return this.buildPath(config.paths.full, this.byNameOnly(obj));
  }

  static getThumbImagePath(obj: ImageRequestData): string {
    return this.buildPath(config.paths.thumb, this.byNameAndDimensions(obj));
  }

  static async checkImageAccessByPath(path: string): Promise<string> {
    var hasAccess = await checkFileAccess(path).catch((e) => console.error(e));
    return hasAccess ? path : '';
  }

  static buildPath(basePath: string, fileName: string): string {
    return basePath && fileName
      ? path.resolve(__dirname, '../..', basePath, fileName)
      : '';
  }

  static getImageDimensions(obj: ImageRequestData): boolean {
    return Boolean(obj.width && obj.height);
  }

  static byNameAndDimensions(obj: ImageRequestData): string {
    return this.getImageDimensions(obj)
      ? `${obj.filename}-${obj.width}x${obj.height}.jpg`
      : '';
  }

  static byNameOnly(obj: ImageRequestData): string {
    return `${obj.filename}.jpg`;
  }
}
