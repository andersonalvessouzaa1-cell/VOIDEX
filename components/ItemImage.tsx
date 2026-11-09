/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { marketImageUrl } from '@/lib/live-market-data';

// Imagem de item/Warframe com moldura quadrada.
// Com `name` (nome em inglês): 1) arte pela base warframestat.us via /api/item-art, 2) imagem direta do Warframe Market, 3) marca do Acervo Void.
// Com `src`: endereço interno já pronto (ex.: Warframe), sem etapas extras.
export default function ItemImage({ path, name, src, alt, size = 48 }: { path?: string | null; name?: string; src?: string; alt: string; size?: number }) {
  const [stage, setStage] = useState(0);
  const sources = src ? [src] : [name ? `/api/item-art?name=${encodeURIComponent(name)}` : null, marketImageUrl(path)].filter((v): v is string => !!v);
  const url = sources[stage] ?? null;
  return (
    <span className="shrink-0 grid place-items-center bg-void-850 border border-void-border" style={{ width: size, height: size }}>
      {url ? (
        <img key={url} src={url} alt={alt} width={size} height={size} loading="lazy" referrerPolicy="no-referrer" onError={() => setStage(s => s + 1)} className="object-contain w-full h-full p-1" />
      ) : (
        <svg viewBox="0 0 120 120" className="w-1/2 h-1/2 opacity-60" fill="none" aria-hidden="true">
          <polygon points="36,4 84,4 116,36 116,84 84,116 36,116 4,84 4,36" stroke="#008F11" strokeWidth="5" />
          <rect x="52" y="52" width="16" height="16" fill="#008F11" />
        </svg>
      )}
    </span>
  );
}
