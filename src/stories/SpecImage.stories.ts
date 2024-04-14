import SpecImage from "../components/SpecImage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/SpecImage",
  component: SpecImage,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SpecImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSize: Story = {
  args: {
    klass: "Death Knight",
    spec: "Blood",
  },
};

export const Small: Story = {
  args: {
    klass: "Druid",
    spec: "Restoration",
    size: 32,
  },
};

export const Smaller: Story = {
  args: {
    klass: "Warrior",
    spec: "Fury",
    size: 24,
  },
};

export const Big: Story = {
  args: {
    klass: "Demon Hunter",
    spec: "Vengeance",
    size: 72,
  },
};

export const Bigger: Story = {
  args: {
    klass: "Rogue",
    spec: "Outlaw",
    size: 80,
  },
};
