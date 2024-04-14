import DurationInput from "../components/DurationInput/DurationInput";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
  title: "DurationInput",
  component: DurationInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DurationInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
    value: 0,
  },
};
