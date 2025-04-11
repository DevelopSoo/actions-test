const mockUser = (id: number) => {
  return {
    id,
    name: "김철수",
    email: "kim@example.com",
  };
};

export async function getUser(id: number) {
  return Promise.resolve(mockUser(id));
}
