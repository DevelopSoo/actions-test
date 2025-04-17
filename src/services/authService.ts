import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });

    const data = response.data;
    // 로컬 스토리지에 token 넣기
    localStorage.setItem("token", data.token);

    return data; // { user: { id: number; name: string; email: string; }, token: string }
  } catch {
    return {
      status: 401,
      data: { message: "잘못된 로그인 정보입니다" },
    };
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const response = await axios.get("http://localhost:3000/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
