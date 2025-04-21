export async function POST() {
  return Response.json(
    {
      message: '로그인 실패 500',
    },
    {
      status: 500,
    }
  );
}
