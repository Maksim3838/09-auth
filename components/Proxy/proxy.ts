import { NextRequest, NextResponse } from 'next/server';

type ProxyHandler = (req: NextRequest) => NextResponse | void;

export function proxy(handler: ProxyHandler) {
  return function middleware(req: NextRequest) {
    const result = handler(req);

    if (result instanceof NextResponse) {
      return result;
    }

    return NextResponse.next();
  };
}
