'use client';

import EnsData from '@/components/EnsData';
import VerifyUser from '@/components/VerifyUser';
import { Button } from '@/components/ui/button';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function ConnectWallet() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-12">
        <div className="flex flex-col gap-2 w-fit items-center border rounded border-slate-400 p-4">
          {account.status !== 'connected' && (
            <>
              <h2>Connect Wallet</h2>
              <div className="flex gap-2">
                {connectors.map((connector) => (
                  <Button
                    variant="default"
                    className="w-[80px]"
                    size="sm"
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                  </Button>
                ))}
              </div>
              <div>Status: {account.status}</div>
            </>
          )}

          {account.status === 'connected' && (
            <div className="flex flex-col gap-4">
              <div>Wallet Address: {account.address}</div>
              <div className="flex w-full justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-[150px]"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          )}
        </div>
        {account?.address && <EnsData address={account.address} />}
      </div>
      {account?.address && (
        <div className="flex flex-col gap-4 mt-8">
          <hr className="w-full h-2" />
          <VerifyUser address={account.address} />
        </div>
      )}
    </div>
  );
}
