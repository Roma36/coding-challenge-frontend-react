import React from 'react';

export default function Error({ children }: { children: any }) {
  // [todo] fix typing
  return <span style={{ color: 'red' }}>{children}</span>;
}
