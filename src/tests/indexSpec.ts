import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses for main api', (): void => {
  describe('Status 200 for main api route', function (): void {
    it('test request', async (): Promise<void> => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });
  });
});
