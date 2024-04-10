'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEnsName } from 'wagmi';

export type EnsFormInput = {
  address: `0x${string}`;
};

export default function EnsLookup() {
  const [address, setAddress] = useState<`0x${string}` | undefined>();

  const { handleSubmit, register, reset } = useForm<EnsFormInput>();

  const onSubmit = useCallback(
    (data: EnsFormInput) => {
      setAddress(data.address);
      reset();
    },
    [reset],
  );

  const { data: ensName } = useEnsName({ address });

  return (
    <>
      <div>
        <h2>Find an ENS</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            placeholder="0x12345..."
            {...register('address', { required: true })}
          />
          <button type="submit">Submit</button>
        </form>

        {ensName && <div>ENS name: {ensName}</div>}
      </div>
    </>
  );
}
