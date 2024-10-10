import { DatePickerWithRange } from "@/components/DatePicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { VisitorChart } from "@/components/VisitorChart";

import { addDays, format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const DashboardPage = () => {
  // TODO: fetch logs according to date

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  console.log(date);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl">Dashboard</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="grid grid-cols-4 justify-center items-center gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Attempts</CardTitle>
            {date && date.from && date.to && (
              <CardDescription>
                From {format(date.from, "yyyy-MM-dd")} to{" "}
                {format(date.to, "yyyy-MM-dd")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Success</CardTitle>
            {date && date.from && date.to && (
              <CardDescription>
                From {format(date.from, "yyyy-MM-dd")} to{" "}
                {format(date.to, "yyyy-MM-dd")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            {date && date.from && date.to && (
              <CardDescription>
                From {format(date.from, "yyyy-MM-dd")} to{" "}
                {format(date.to, "yyyy-MM-dd")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Most visited day</CardTitle>
            {date && date.from && date.to && (
              <CardDescription>
                From {format(date.from, "yyyy-MM-dd")} to{" "}
                {format(date.to, "yyyy-MM-dd")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-10 h-fit">
        <div className="col-span-3 rounded-lg h-[500px]">
          <VisitorChart date={date} />
        </div>
        <ScrollArea className="col-span-2 border rounded-lg h-[500px] gap-10 p-6">
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
          <div>log</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardPage;
