import axios from 'axios';

const client = axios.create({
  baseURL: 'https://www.example.com',
});

type ErrorType = {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
  request: unknown;
  message: string;
};
const handleError = (error: ErrorType) => {
  if (error.response) {
    // 서버에서 오류 응답을 받은 경우
    const status = error.response.status;
    const message = error.response.data.message || 'API 오류';

    if (status === 404) {
      throw new Error(`리소스를 찾을 수 없습니다: ${message}`);
    } else if (status === 401 || status === 403) {
      throw new Error(`인증 오류: ${message}`);
    } else {
      throw new Error(`API 오류(${status}): ${message}`);
    }
  } else if (error.request) {
    // 요청은 보냈으나 응답을 받지 못한 경우
    throw new Error('서버 응답 없음');
  } else {
    // 요청 설정 중 오류가 발생한 경우
    throw new Error(`요청 오류: ${error.message}`);
  }
};

export const getUsers = async () => {
  try {
    const response = await client.get('/users');
    return response.data;
  } catch (error) {
    handleError(error as ErrorType);
  }
};

export const createUser = async (userData: { name: string; email: string }) => {
  try {
    const response = await client.post('/users', userData);
    return response.data;
  } catch (error) {
    handleError(error as ErrorType);
  }
};

// class ApiService {
//   constructor(baseURL: string) {
//     this.client = axios.create({
//       baseURL,
//       timeout: 5000,
//     });
//   }

//   async getUsers() {
//     try {
//       const response = await this.client.get("/users");
//       return response.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async getUserById(id) {
//     try {
//       const response = await this.client.get(`/users/${id}`);
//       return response.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async createUser(userData) {
//     try {
//       const response = await this.client.post("/users", userData);
//       return response.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async updateUser(id, userData) {
//     try {
//       const response = await this.client.put(`/users/${id}`, userData);
//       return response.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async deleteUser(id) {
//     try {
//       await this.client.delete(`/users/${id}`);
//       return true;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   handleError(error) {
//     if (error.response) {
//       // 서버에서 오류 응답을 받은 경우
//       const status = error.response.status;
//       const message = error.response.data.message || "API 오류";

//       if (status === 404) {
//         throw new Error(`리소스를 찾을 수 없습니다: ${message}`);
//       } else if (status === 401 || status === 403) {
//         throw new Error(`인증 오류: ${message}`);
//       } else {
//         throw new Error(`API 오류(${status}): ${message}`);
//       }
//     } else if (error.request) {
//       // 요청은 보냈으나 응답을 받지 못한 경우
//       throw new Error("서버 응답 없음");
//     } else {
//       // 요청 설정 중 오류가 발생한 경우
//       throw new Error(`요청 오류: ${error.message}`);
//     }
//   }
// }
