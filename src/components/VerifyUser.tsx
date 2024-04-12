'use client';

import { Button } from '@/components/ui/button';
import { VERIFY_MESSAGE_STRING } from '@/lib/constants';
import { CircleCheckBigIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useSignMessage } from 'wagmi';

export type VerifyUserProps = {
  address: `0x${string}`;
};

export default function VerifyUser({ address }: VerifyUserProps) {
  const { signMessage } = useSignMessage();
  const [isVerified, setIsVerified] = useState(false);

  const onSignMessage = useCallback(
    () =>
      signMessage(
        { message: VERIFY_MESSAGE_STRING },
        {
          async onSettled(signedMessage) {
            const response = await fetch('/api/verify', {
              body: JSON.stringify({
                token: `${btoa(address)}.${btoa(signedMessage as string)}`,
              }),
              headers: { 'Content-Type': 'application/json' },
              method: 'POST',
            });
            const { isValid } = await response.json();
            setIsVerified(isValid);
          },
        },
      ),
    [address, signMessage],
  );

  return (
    <div className="flex flex-col items-center w-full mt-4 gap-4">
      <h2>Verify User</h2>
      {!isVerified ? (
        <>
          <div className="flex flex-col items-center">
            <p>Sign the following message to verify:</p>
            <p>&quot;{VERIFY_MESSAGE_STRING}&quot;</p>
          </div>
          <Button variant="default" onClick={onSignMessage}>
            Sign and Verify
          </Button>
        </>
      ) : (
        <div className="flex gap-2">
          Verified: <CircleCheckBigIcon color="green" />
        </div>
      )}
    </div>
  );
}
