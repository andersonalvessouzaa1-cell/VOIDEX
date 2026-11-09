import Link from 'next/link';
export default function AccountNavigation({items}:{items:{href:string;label:string}[]}) {
 return <nav aria-label="Navegação da conta e mercado" className="flex min-w-0 flex-wrap gap-2 text-sm">
  {items.map(item=><Link key={item.href} href={item.href} className="inline-flex min-h-11 max-w-full items-center justify-center border border-energy-cyan px-3 py-2 text-center text-energy-cyan transition-colors hover:bg-void-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-energy-cyan">{item.label}</Link>)}
 </nav>;
}
