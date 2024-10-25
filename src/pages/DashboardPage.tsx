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

import { addDays, format, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Attempt } from "@/models/Attempt";
import * as Api from "@/api/api";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfDay(addDays(new Date(), -7)),
    to: startOfDay(new Date()),
  });

  const [attempts, setAttempts] = useState<Attempt[] | undefined>();
  const [mostVisitedDay, setMostVisitedDay] = useState<string | undefined>();

  useEffect(() => {
    if ((date && date.to && date.from) || (date && !date.to && !date.from)) {
      Api.getAttempts(date).then((data) => setAttempts(data));
    } else {
      setAttempts(undefined);
    }
  }, [date]);

  useEffect(() => {
    if (attempts !== undefined) {
      const counter: Record<string, number> = {};

      attempts.forEach((attempt) => {
        const attemptDate = format(new Date(attempt.timestamp), "LLL dd, yy");

        if (counter[attemptDate]) {
          counter[attemptDate]++;
        } else {
          counter[attemptDate] = 1;
        }
      });

      let maxVisits = 0;
      let mostVisitedDay: string = "";
      for (const [day, count] of Object.entries(counter)) {
        if (count > maxVisits) {
          maxVisits = count;
          mostVisitedDay = day;
        }
      }

      setMostVisitedDay(mostVisitedDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts]);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl">Dashboard</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="grid grid-cols-4 justify-center items-center gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Visits</CardTitle>
            {date && date.from && date.to && (
              <CardDescription>
                From {format(date.from, "yyyy-MM-dd")} to{" "}
                {format(date.to, "yyyy-MM-dd")}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {attempts !== undefined ? (
              <p className="text-4xl text-center">{attempts.length}</p>
            ) : (
              <Spinner />
            )}
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
            {attempts !== undefined ? (
              <p className="text-4xl text-center">
                {attempts.filter((a) => a.status == "success").length}
              </p>
            ) : (
              <Spinner />
            )}
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
            {attempts !== undefined ? (
              <p className="text-4xl text-center">
                {attempts.length === 0
                  ? "N/A"
                  : `${Math.round(
                      (attempts.filter((a) => a.status == "success").length /
                        attempts.length) *
                        100,
                    )}%`}
              </p>
            ) : (
              <Spinner />
            )}
          </CardContent>
        </Card>

        <Card className="w-full h-full">
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
            {attempts !== undefined ? (
              <p className="text-3xl text-center">
                {attempts.length > 0 ? (
                  mostVisitedDay
                ) : (
                  <p className="text-4xl">N/A</p>
                )}
              </p>
            ) : (
              <Spinner />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-10 h-fit">
        <div className="col-span-3 rounded-lg h-[500px]">
          <VisitorChart date={date} visitorAttempts={attempts} />
        </div>
        <ScrollArea className="col-span-2 border rounded-lg h-[500px]  p-6">
          <div className="flex gap-3 flex-col">
            {attempts?.map((attempt) => (
              <>
                <div>
                  [{attempt.timestamp}] - Recognized User:{" "}
                  {attempt.recognized_user}, Status {attempt.status}.
                </div>
                <Separator />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardPage;
