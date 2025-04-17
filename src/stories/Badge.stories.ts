import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    colorPalette: "gray",
    children: "Badge",
  },
};

export const XSmall: Story = {
  args: {
    size: "xs",
    colorPalette: "gray",
    children: "Badge",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    colorPalette: "gray",
    children: "Badge",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    colorPalette: "gray",
    children: "Badge",
  },
};
