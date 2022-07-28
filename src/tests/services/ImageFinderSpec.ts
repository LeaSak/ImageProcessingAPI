
import path from 'path';
import {config} from '../../config/config';
import ImageFinder from '../../services/ImageFinder';

describe('ImageFinder', ():void => {
  let originalTimeout: number;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  describe("getImageByNameWidthAndHeight", function(): void{
    it('should return an empty string', async (): Promise <void> => {
      expect(await ImageFinder.getImageByNameWidthAndHeight({filename: 'foo', width: '100', height: '100'})).toEqual("");
      });

      it('should return a thumbail path', async (): Promise <void> => {
        const expectedPath:string = path.resolve(config.paths.thumb, "santamonica-100x100.jpg");
        expect(await ImageFinder.getImageByNameWidthAndHeight({filename: 'santamonica', width: '100', height: '100'})).toEqual(expectedPath);
      });

      it('should return an empty string', async (): Promise <void> => {
        expect(await ImageFinder.getImageByNameWidthAndHeight({filename: 'santamonica', width: '', height: ''})).toEqual("");
        expect(async function(){ await ImageFinder.getImageByNameWidthAndHeight({filename: 'santamonica', width: '', height: ''})}).not.toThrow();
      });

  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});



