'use client';

import EnsData from '@/components/EnsData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  } = useForm<EnsFormInput>({
    values: {
      address: '' as `0x${string}`,
    },
  });

  const onSubmit = useCallback(
    (data: EnsFormInput) => {
      if (data) {
        setAddress(data.address);
        reset();
      }
    },
    [reset],
  );

  return (
    <div className="flex gap-12">
      <div
        className={clsx(
          // width = width of inner div + 2 * padding
          `flex flex-col p-[6px] w-[312px] rounded-lg`,
          // rainbow border, borrowed heavily from: https://codepen.io/unnegative/pen/dVwYBq
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
      {address && <EnsData address={address} />}
    </div>
  );
}
