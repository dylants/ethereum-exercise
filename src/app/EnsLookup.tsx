'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEnsName } from 'wagmi';

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

  return (
    <div className="flex gap-8">
      <div className="flex flex-col border border-slate-400 rounded p-4 w-[300px]">
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
      <div>{ensName && <div>ENS name: {ensName}</div>}</div>
    </div>
  );
}
