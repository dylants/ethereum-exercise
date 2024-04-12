'use client';

import EnsData from '@/components/EnsData';
import { Button } from '@/components/ui/button';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function ConnectWallet() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
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
              <Button variant="default" size="sm" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </div>
          )}
        </div>
        {account?.address && <EnsData address={account.address} />}
      </div>
    </div>
  );
}
