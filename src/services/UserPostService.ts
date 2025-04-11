import { getUser } from "./UserService";

export async function getUserPosts(userId: number) {
  const user = await getUser(userId);

  // 추가 조작을 했다고 가정
  return [
    {
      id: 1,
      title: "Post 1",
      body: "Body 1",
      userId: user.id,
      name: user.name,
    },
  ];
}
