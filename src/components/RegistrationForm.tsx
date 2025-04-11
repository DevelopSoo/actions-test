function RegistrationForm() {
  return (
    <form>
      <h2>회원가입</h2>
      <div>
        <label htmlFor="username">사용자 이름:</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">가입하기</button>
    </form>
  );
}

export default RegistrationForm;
