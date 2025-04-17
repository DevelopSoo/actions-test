import axios from "axios";

export function fetchUserById(id: string) {
  // 실제 API를 호출하여 DB로부터 데이터를 가져오는 코드라고 가정
  const userInfo = {
    id,
    name: "김철수",
    email: "kim@example.com",
  };

  return userInfo;
}

export function getUserResponseById(id: string) {
  // 1. API 호출
  const user = fetchUserById(id);

  // 추가 작업 -> 실제로는 이 과정이 잘 되는지 확인하고 싶음
  return {
    success: true,
    message: "유저 정보를 성공적으로 조회했습니다",
    data: user,
  };
}

export async function fetchUserData(id: number) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `사용자 데이터를 가져오는데 실패했습니다: ${error.message}`
      );
    }
  }
}
