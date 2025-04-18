const customMatchers = {
  toBeValidUser: (received: {
    name: string;
    password: string;
    email: string;
  }) => {
    if (!received || typeof received !== "object") {
      return {
        pass: false,
        message: () => "올바른 유저 객체를 전달해주세요.",
      };
    }

    if (!received.name || !received.email || !received.password) {
      return {
        pass: false,
        message: () => "name, email, password 속성이 필요합니다.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(received.email)) {
      return {
        pass: false,
        message: () => "이메일 형식이 올바르지 않습니다.",
      };
    }

    if (received.password.length < 8) {
      return {
        pass: false,
        message: () => "비밀번호는 8자 이상이어야 합니다.",
      };
    }

    if (received.name.length < 2) {
      return {
        pass: false,
        message: () => "이름은 2자 이상이어야 합니다.",
      };
    }

    return {
      pass: true,
      message: () => "유효한 유저 객체입니다.",
    };
  },
};

expect.extend(customMatchers);

export default customMatchers;
