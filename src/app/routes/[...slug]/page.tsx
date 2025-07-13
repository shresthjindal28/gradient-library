import React from 'react';
import { notFound } from "next/navigation";

export default function ManualRoutePage({ params }: { params: { slug?: string[] } }) {
  // You can add custom logic here to handle routes manually
  if (!params.slug) return notFound();
  return (
    <div style={{ padding: 32 }}>
      <h1>Manual Route Handler</h1>
      <p>This page catches all routes under <code>/routes/*</code>.</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
} 