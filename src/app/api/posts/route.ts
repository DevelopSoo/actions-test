// /src/app/api/posts/route.ts
import { NextRequest } from "next/server";
import { POSTS } from "./_data/mockPosts";

export async function GET() {
  console.log("GET");
  return Response.json(POSTS);
}

export async function POST(request: NextRequest) {
  const newPost = await request.json();

  if (
    typeof newPost.title !== "string" ||
    typeof newPost.content !== "string"
  ) {
    return Response.json(
      { error: "제목과 내용은 문자열이어야 합니다." },
      { status: 400 }
    );
  }

  const postWithId = {
    id: POSTS.length + 1,
    title: newPost.title,
    content: newPost.content,
  };
  console.log({ postWithId });
  POSTS.push(postWithId);
  console.log({ POSTS });
  return Response.json(postWithId, { status: 201 });
}
