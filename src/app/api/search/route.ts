// app/api/search/route.ts;

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  throw new Error('검색 에러');
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q) return Response.json({ error: '검색어 필요' });

  // 가상의 검색 결과
  const results = [
    { id: 1, title: `${q} 관련 결과 1` },
    { id: 2, title: `${q} 관련 결과 2` },
  ];
  return Response.json(results);
}
