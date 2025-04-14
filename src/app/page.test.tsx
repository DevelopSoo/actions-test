describe("할 일 목록 페이지 테스트", () => {
  test("임시", () => {});
  // test("초기 상태에서는 할 일이 없어야 한다.", () => {
  //   render(<Home />);
  //   expect(screen.getByText("할 일이 없습니다")).toBeInTheDocument();
  //   expect(screen.getByText("총 0개의 할 일이 있습니다")).toBeInTheDocument();
  // });
  // test("새로운 할 일을 추가하면 할 일 목록에 추가되어야 한다.", () => {
  //   render(<Home />);
  //   const input = screen.getByPlaceholderText("할 일을 입력하세요");
  //   fireEvent.change(input, { target: { value: "리액트 공부하기" } });
  //   fireEvent.click(screen.getByText("추가"));
  //   expect(screen.getByText("리액트 공부하기")).toBeInTheDocument();
  //   expect(screen.getByText("총 1개의 할 일이 있습니다")).toBeInTheDocument();
  //   expect(screen.getByText("완료: 0개")).toBeInTheDocument();
  // });
  // test("할 일을 완료하면 완료 상태가 반영되어야 한다.", () => {
  //   render(<Home />);
  //   const input = screen.getByPlaceholderText("할 일을 입력하세요");
  //   fireEvent.change(input, { target: { value: "리액트 공부하기" } });
  //   fireEvent.click(screen.getByText("추가"));
  //   const checkbox = screen.getByRole("checkbox");
  //   fireEvent.click(checkbox);
  //   expect(checkbox).toBeChecked();
  //   expect(screen.getByText("리액트 공부하기")).toHaveClass("line-through");
  //   expect(screen.getByText("완료: 1개")).toBeInTheDocument();
  // });
  // test("할 일을 삭제하면 할 일 목록에서 제거되어야 한다.", () => {
  //   render(<Home />);
  //   const input = screen.getByPlaceholderText("할 일을 입력하세요");
  //   fireEvent.change(input, { target: { value: "리액트 공부하기" } });
  //   fireEvent.click(screen.getByText("추가"));
  //   fireEvent.click(screen.getByText("삭제"));
  //   expect(screen.queryByText("리액트 공부하기")).not.toBeInTheDocument();
  //   expect(screen.getByText("할 일이 없습니다")).toBeInTheDocument();
  //   expect(screen.getByText("총 0개의 할 일이 있습니다")).toBeInTheDocument();
  // });
  // test("여러 할 일을 추가, 완료, 삭제하는 시나리오를 테스트한다.", () => {
  //   render(<Home />);
  //   const input = screen.getByPlaceholderText("할 일을 입력하세요");
  //   // 3개 할 일 추가
  //   fireEvent.change(input, { target: { value: "리액트 공부하기" } });
  //   fireEvent.click(screen.getByText("추가"));
  //   fireEvent.change(input, { target: { value: "테스트 코드 작성하기" } });
  //   fireEvent.click(screen.getByText("추가"));
  //   fireEvent.change(input, { target: { value: "블로그 포스팅하기" } });
  //   fireEvent.click(screen.getByText("추가"));
  //   expect(screen.getByText("총 3개의 할 일이 있습니다")).toBeInTheDocument();
  //   // 2개 완료
  //   const checkboxes = screen.getAllByRole("checkbox");
  //   fireEvent.click(checkboxes[0]);
  //   fireEvent.click(checkboxes[2]);
  //   expect(screen.getByText("완료: 2개")).toBeInTheDocument();
  //   // 1개 삭제
  //   const deleteButtons = screen.getAllByText("삭제");
  //   fireEvent.click(deleteButtons[1]);
  //   expect(screen.queryByText("테스트 코드 작성하기")).not.toBeInTheDocument();
  //   expect(screen.getByText("총 2개의 할 일이 있습니다")).toBeInTheDocument();
  //   expect(screen.getByText("완료: 2개")).toBeInTheDocument();
  // });
});
