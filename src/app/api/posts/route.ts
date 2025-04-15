let POSTS = [
  {
    id: 1,
    title: "리액트를 재밌게 공부하는 법",
    content: "리액트를 재밌게 공부하는 법이란 ~",
  },
  {
    id: 2,
    title: "Next.js를 재밌게 공부하는 법",
    content: "Next.js를 재밌게 공부하는 법이란 ~",
  },
];

export async function GET() {
  return Response.json(POSTS);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const newPost = { id: POSTS.length + 1, title, content };
  POSTS = [...POSTS, newPost];
  return Response.json(POSTS);
}
