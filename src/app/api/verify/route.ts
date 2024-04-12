import { VERIFY_MESSAGE_STRING } from '@/lib/constants';
import { verifyMessage } from 'ethers';
import { NextRequest } from 'next/server';

const decodeBase64 = (data: string) => {
  const buff = new Buffer(data, 'base64');
  const text = buff.toString('binary');
  return text;
};

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return Response.json(
        { isValid: false },
        {
          status: 400,
          statusText: 'token is required',
        },
      );
    }

    const [publicKeyB64, signatureB64] = token.split('.');
    const publicKey = decodeBase64(publicKeyB64);
    const signature = decodeBase64(signatureB64);
    const recoveredPublicKey = verifyMessage(VERIFY_MESSAGE_STRING, signature);
    if (publicKey !== recoveredPublicKey) {
      return Response.json(
        { isValid: false },
        {
          status: 400,
          statusText: 'public key does not match recovered public key',
        },
      );
    }

    return Response.json({ isValid: true });
  } catch (error: unknown) {
    // TODO better error logging
    console.error(error);
    return Response.json({ isValid: false }, { status: 400 });
  }
}
