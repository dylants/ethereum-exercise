'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { normalize } from 'viem/ens';
import { useBalance, useEnsAvatar, useEnsName } from 'wagmi';

export type EnsFormInput = {
  address: `0x${string}`;
};

export default function EnsLookup() {
  const [address, setAddress] = useState<`0x${string}` | undefined>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<EnsFormInput>();

  const onSubmit = useCallback(
    (data: EnsFormInput) => {
      setAddress(data.address);
      reset();
    },
    [reset],
  );

  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: normalize(ensName || '') });
  const { data: ensBalance } = useBalance({ address });

  return (
    <div className="flex gap-12">
      <div
        className={clsx(
          // width = width + 2 * padding
          `flex flex-col p-[6px] w-[312px] rounded-lg`,
          // borrowed heavily from: https://codepen.io/unnegative/pen/dVwYBq
          '[background-image:linear-gradient(to_bottom_right,#b827fc_0,#2c90fc_25%,#b8fd33_50%,#fec837_75%,#fd1892_100%)]',
        )}
      >
        <div className="flex flex-col p-4 w-[300px] bg-white rounded-lg">
          <h2 className="font-bold">Find an ENS</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-4">
              <div>
                <label className="text-sm" htmlFor="address">
                  Address:
                </label>
                <Input
                  type="text"
                  placeholder="0x12345..."
                  variant={errors.address ? 'error' : 'default'}
                  {...register('address', { required: true })}
                />
              </div>
              <Button variant="default" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="border rounded-full border-slate-50 p-2 shadow-md">
          {ensAvatar ? (
            <Image
              alt="ENS Avatar"
              src={ensAvatar}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="border rounded-full w-[64px] h-[64px] flex justify-center items-center text-xs">
              No Image
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-xl">{ensName || 'ENS domain'}</div>
          <div className="text-xs">
            {ensBalance
              ? `${ensBalance.symbol} ${ensBalance.value}`
              : 'Balance'}
          </div>
        </div>
      </div>
    </div>
  );
}
