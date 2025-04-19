import { NextRequest } from 'next/server';
import { POSTS } from '../_data/mockPosts';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log({ id: Number(id) });
  console.log({ POSTS });
  const postIndex = POSTS.findIndex((post) => post.id === Number(id));
  if (postIndex === -1) {
    return Response.json(
      { error: '게시물을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  POSTS.splice(postIndex, 1);
  return Response.json({ message: '삭제 완료' }, { status: 200 });
}
