
import sharp from 'sharp';
import supertest from 'supertest';
import app from '../../index';
import ImageResizer from '../../services/ImageResizer';

const request = supertest(app);

describe('Image Resizer', ():void => {
  let originalTimeout: number;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  describe("resizeImage", function(): void{
    it('should return an empty string', async (): Promise <void> => {
      expect(await ImageResizer.resizeImage({filename: 'foo', width: '100', height: '100'}, "", "")).toEqual("");
      expect(await ImageResizer.resizeImage({filename: 'foo', width: '100', height: ''}, "", "")).toEqual("");
      expect(await ImageResizer.resizeImage({filename: '', width: '100', height: '100'}, "", "")).toEqual("");
      expect(await ImageResizer.resizeImage({filename: 'foo', width: '100', height: '-100'}, "", "")).toEqual("");
      expect(async function(){await ImageResizer.resizeImage({filename: 'foo', width: '100', height: '100'}, "", "")}).not.toThrow();
      expect(async function(){await ImageResizer.resizeImage({filename: 'foo', width: '-100', height: '100'}, "", "")}).not.toThrow();
      });

      it('should not throw an error', async (): Promise <void> => {
        expect(async function(){await ImageResizer.resizeImage({filename: '', width: '100', height: '100'}, "", "")}).not.toThrow();
        expect(async function(){await ImageResizer.resizeImage({filename: 'foo', width: '100', height: '100'}, "", "")}).not.toThrow();
        expect(async function(){await ImageResizer.resizeImage({filename: 'foo', width: '-100', height: '100'}, "", "")}).not.toThrow();
      });
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});



