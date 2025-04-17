import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // 컴포넌트를 가운데에 배치
    layout: "centered",
    backgrounds: {
      values: [
        {
          name: "red",
          value: "red",
        },
        {
          name: "blue",
          value: "blue",
        },
      ],
    },
  },
  // 자동으로 문서를 만들어주는 기능
  tags: ["autodocs"],
  // 컴포넌트의 속성을 제어하는 기능
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // 클릭 이벤트를 스파이하는 기능
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
