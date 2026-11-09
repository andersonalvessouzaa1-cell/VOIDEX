import { NextResponse } from 'next/server';
import { getCompanionLab } from '@/lib/data-engine/companion-lab-reader';
export const runtime = 'nodejs';
export async function GET() {
  try { return NextResponse.json(getCompanionLab()); }
  catch { return NextResponse.json({ error: 'Catálogo de companheiros indisponível.' }, { status: 503 }); }
}
