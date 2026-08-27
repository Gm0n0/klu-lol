import { auth } from "@/lib/auth";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  return (auth as any)(req, ctx);
}

export async function POST(req: NextRequest, ctx: any) {
  return (auth as any)(req, ctx);
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";