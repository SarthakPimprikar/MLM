import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'Server is running',
    time: new Date().toISOString(),
    message: 'If you see this, the server is NOT the problem. The issue is likely MongoDB.'
  });
}
