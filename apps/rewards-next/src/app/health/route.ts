import { NextRequest, NextResponse } from 'next/server'

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  // Do whatever you want
  return new NextResponse('OK2')
}
