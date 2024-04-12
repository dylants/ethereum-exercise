'use client';

import { Skeleton } from '@/components/ui/skeleton';
import jazzicon from 'jazzicon-ts';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { normalize } from 'viem/ens';
import { useBalance, useEnsAvatar, useEnsName } from 'wagmi';

export type EnsDataProps = {
  address: `0x${string}`;
};

export default function EnsData({ address }: EnsDataProps) {
  const htmlDivRef = useRef<HTMLDivElement>(null);

  const { data: ensName, isFetched: isFetchedEnsName } = useEnsName({
    address,
  });
  const { data: ensAvatar, isFetched: isFetchedAvatar } = useEnsAvatar({
    name: normalize(ensName || ''),
  });
  const { data: ensBalance, isFetched: isFetchedBalance } = useBalance({
    address,
  });

  useEffect(() => {
    if (address && htmlDivRef.current) {
      const icon = jazzicon(64, parseInt(address.slice(2, 10), 16));
      htmlDivRef.current.replaceChildren(icon);
    }
  }, [address, ensAvatar]);

  return (
    <div className="flex items-center gap-3">
      <div className="border rounded-full border-slate-50 p-2 shadow-md">
        {!isFetchedAvatar ? (
          <Skeleton className="h-[64px] w-[64px] rounded-full" />
        ) : (
          <>
            {ensAvatar ? (
              <Image
                alt="ENS Avatar"
                src={ensAvatar}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <div
                className="border rounded-full w-[64px] h-[64px] flex justify-center items-center text-xs"
                ref={htmlDivRef}
              />
            )}
          </>
        )}
      </div>
      <div className="flex flex-col w-[200px] gap-1">
        {!isFetchedEnsName ? (
          <Skeleton className="h-7 w-full" />
        ) : (
          <div className="font-bold text-xl">{ensName || 'Unknown'}</div>
        )}
        {!isFetchedBalance ? (
          <Skeleton className="h-4 w-full" />
        ) : (
          <div className="text-xs">
            {ensBalance
              ? `${ensBalance.symbol} ${ensBalance.value}`
              : 'Unknown balance'}
          </div>
        )}
      </div>
    </div>
  );
}
