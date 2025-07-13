import React from 'react';
import { notFound } from "next/navigation";

export default async function ManualRoutePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  // You can add custom logic here to handle routes manually
  const resolvedParams = await params;
  if (!resolvedParams.slug) return notFound();
  return (
    <div style={{ padding: 32 }}>
      <h1>Manual Route Handler</h1>
      <p>This page catches all routes under <code>/routes/*</code>.</p>
      <pre>{JSON.stringify(resolvedParams, null, 2)}</pre>
    </div>
  );
} 