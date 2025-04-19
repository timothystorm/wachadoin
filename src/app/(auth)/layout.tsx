'use client';

import React from 'react';

/**
 * Wrap security for all secure pages/routes
 *
 * @param children - to render
 */
export default function WachaDoinLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
