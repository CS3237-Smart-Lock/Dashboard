import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";

import { Attempt } from "@/models/Attempt";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--foreground))",
  },
  success: {
    label: "Success",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type VisitorChartProps = {
  date: DateRange | undefined;
  visitorAttempts: Attempt[] | undefined;
};

const generateChartData = (visitorAttempts: Attempt[]) => {
  const totalCounter: Record<string, number> = {};
  const successCounter: Record<string, number> = {};

  for (let i = 0; i < visitorAttempts.length; i++) {
    const attempt = visitorAttempts[i];
    const date = format(new Date(attempt.timestamp), "yyyy-MM-dd");
    if (!totalCounter[date]) {
      totalCounter[date] = 0;
      successCounter[date] = 0;
    }

    totalCounter[date]++;
    if (attempt.status === "success") {
      successCounter[date]++;
    }
  }

  const chartData = Object.keys(totalCounter).map((date) => ({
    date: date,
    total: totalCounter[date],
    success: successCounter[date],
  }));

  return chartData;
};

const getChange = (
  chartData: { date: string; total: number; success: number }[],
) => {
  if (chartData.length < 2) return 0;
  const firstDay = chartData[0];
  const lastDay = chartData[chartData.length - 1];

  const percentage = (lastDay.total - firstDay.total) / firstDay.total;
  return parseFloat(percentage.toFixed(2));
};

export const VisitorChart = ({ date, visitorAttempts }: VisitorChartProps) => {
  const chartData = generateChartData(visitorAttempts || []);
  const delta = getChange(chartData);

  return (
    <Card>
      <CardHeader>
        {date && date.from && date.to && (
          <CardDescription>
            Showing total visitors from {format(date.from, "yyyy-MM-dd")} to{" "}
            {format(date.to, "yyyy-MM-dd")}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {visitorAttempts !== undefined ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillsuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-success)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-success)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="filltotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-total)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-total)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="success"
                type="natural"
                fill="url(#fillsuccess)"
                fillOpacity={0.4}
                stroke="var(--color-success)"
                stackId="a"
              />
              <Area
                dataKey="total"
                type="natural"
                fill="url(#filltotal)"
                fillOpacity={0.4}
                stroke="var(--color-total)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <Spinner />
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {delta >= 0 ? (
                <p className="flex gap-1">
                  Trending up by {delta}% <TrendingUp className="h-4 w-4" />
                </p>
              ) : (
                <p className="flex gap-1">
                  Trending down by {-delta}%{" "}
                  <TrendingDown className="h-4 w-4" />
                </p>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
