import { render } from '@testing-library/react';

import SnapshotButton from './SnapshotButton';

describe('Button 컴포넌트가 올바르게 렌더링됩니다.', () => {
  test('기본 상태', () => {
    const { container } = render(<SnapshotButton>클릭</SnapshotButton>);
    expect(container).toMatchSnapshot();
  });

  test('비활성화 상태', () => {
    const { container } = render(
      <SnapshotButton disabled>클릭</SnapshotButton>
    );
    expect(container).toMatchSnapshot();
  });

  test('로딩 상태', () => {
    const { container } = render(
      <SnapshotButton isLoading>클릭</SnapshotButton>
    );
    expect(container).toMatchSnapshot();
  });
});
