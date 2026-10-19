'use client';

import { useEffect, useRef } from 'react';

import type { ComponentProps, FC, PropsWithChildren } from 'react';

type ChangeHistoryDetailsProps = ComponentProps<'details'>;

const ChangeHistoryDetails: FC<
  PropsWithChildren<ChangeHistoryDetailsProps>
> = ({ children, ...props }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const detailsElement = detailsRef.current;

      if (!detailsElement || !detailsElement.open) {
        return;
      }

      if (!detailsElement.contains(event.target as Node)) {
        detailsElement.removeAttribute('open');
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <details ref={detailsRef} {...props}>
      {children}
    </details>
  );
};

export default ChangeHistoryDetails;
