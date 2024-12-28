import { NextRequest, NextResponse } from 'next/server';

import { generateNonce, getCSP } from './helpers';

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const cspHeader = getCSP(nonce);
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);

  const headerKey = 'content-security-policy';

  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(headerKey, contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('x-nonce', nonce);
  response.headers.set(headerKey, contentSecurityPolicyHeaderValue);

  return response;
}

export const config = {
  unstable_allowDynamic: ['/node_modules/**'],
};
