import { auth } from "@/lib/auth";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  return auth(request as any, ctx);
}

export async function POST(request: NextRequest, ctx: any) {
  return auth(request as any, ctx);
}

export const dynamic = "force-dynamic";