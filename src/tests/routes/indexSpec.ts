import supertest from 'supertest';
import app from '../../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoint responses', (): void => {
  describe('Status 400 if missing parametes width and height', function (): void {
    it('test request: api/images', async (): Promise<void> => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(400);
    });
  });

  describe('Status 400 if missing parameters height', function (): void {
    it('test request: api/images', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=santamonica&width=100'
      );
      expect(response.status).toBe(400);
    });
  });

  describe('Status 400 if missing parameters width', function (): void {
    it('test request: api/images', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=santamonica&height=100'
      );
      expect(response.status).toBe(400);
    });
  });

  describe('Status 400 if dimensions are not zero positive', function (): void {
    it('test request: api/images', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=santamonica&height=-100'
      );
      expect(response.status).toBe(400);
    });
  });

  describe('Status 200 if dimensions are not zero parameters', function (): void {
    it('test request: api/images', async (): Promise<void> => {
      const response = await request.get(
        '/api/images?filename=santamonica&width=100&height=100'
      );
      expect(response.status).toBe(200);
    });
  });
});
