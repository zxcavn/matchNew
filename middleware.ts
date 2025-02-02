import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  unstable_allowDynamic: ['/node_modules/**'],
};
