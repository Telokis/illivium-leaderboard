import ClassImage from "../components/ClassImage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/ClassImage",
  component: ClassImage,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ClassImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSize: Story = {
  args: {
    klass: "Death Knight",
  },
};

export const Small: Story = {
  args: {
    klass: "Druid",
    size: 32,
  },
};

export const Smaller: Story = {
  args: {
    klass: "Warrior",
    size: 24,
  },
};

export const Big: Story = {
  args: {
    klass: "Demon Hunter",
    size: 72,
  },
};

export const Bigger: Story = {
  args: {
    klass: "Rogue",
    size: 80,
  },
};
