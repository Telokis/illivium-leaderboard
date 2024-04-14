import { TotalScore } from "../components/ScoreCalculatorForm/TotalScore";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "TotalScore",
  component: TotalScore,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TotalScore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalScore: 0,
  },
};

/*
538
1366
1893
2210
2583
2869
2998
3062
3100
3218
3492
3692
3766
3896
*/
