import { POST } from '@/app/api/verify/route';
import { NextRequest } from 'next/server';

const VERIFY_URL = 'http://domain/api/verify';

describe('/api/verify', () => {
  const publicKey = '0x41126f1CF7D0fcc382Bb8Aa8163E7e60762F2023';
  const signedMessage =
    '0x77a08bff27f19a454209c943c3d366c37a8afe0692fdb477891d5a39319442751f50d7bc795c55e13be6fe6fc5cf3be9f1bdcd8288e74e7a57ea86e8b65ce0501b';
  const invalidSignedMessage =
    '0x5511bf91943f502dfe1f3545b303fe01d5b2474eab91cccdefe74b3ee02fc5a44ed43f84dd2d9d4da12070dfba3aa2c9812312d1fb8e3a16c1d64c25d0a3cb031c';

  describe('POST', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should return isValid:true when successful', async () => {
      const body = {
        token: `${btoa(publicKey)}.${btoa(signedMessage)}`,
      };

      const req = new NextRequest(new Request(VERIFY_URL), {
        body: JSON.stringify(body),
        method: 'POST',
      });
      const res = await POST(req);

      expect(res.status).toEqual(200);
      expect(await res.json()).toEqual({ isValid: true });
    });

    it('should return isValid:false when unsuccessful', async () => {
      const body = {
        token: `${btoa(publicKey)}.${btoa(invalidSignedMessage)}`,
      };

      const req = new NextRequest(new Request(VERIFY_URL), {
        body: JSON.stringify(body),
        method: 'POST',
      });
      const res = await POST(req);

      expect(res.status).toEqual(200);
      expect(await res.json()).toEqual({ isValid: false });
    });

    it('should return isValid:false when error is thrown', async () => {
      const body = {
        token: `${btoa('foo')}.${btoa('bar')}`,
      };

      const req = new NextRequest(new Request(VERIFY_URL), {
        body: JSON.stringify(body),
        method: 'POST',
      });
      const res = await POST(req);

      expect(res.status).toEqual(500);
      expect(await res.json()).toEqual({ isValid: false });
    });
  });
});
