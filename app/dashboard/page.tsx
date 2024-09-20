'use client';

import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const DashboradIndexPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-row w-full gap-4">
            <Card className="w-full ">
              <CardHeader>Total Notebooks</CardHeader>
              <CardContent>notebooks_number</CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>Total Notebooks</CardHeader>
              <CardContent>notebooks_number</CardContent>
            </Card>
          </div>
          <div className="flex flex-row w-full gap-4">
            <Card className="w-full">
              <CardHeader>Total Notebooks</CardHeader>
              <CardContent>notebooks_number</CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>Total Notebooks</CardHeader>
              <CardContent>notebooks_number</CardContent>
            </Card>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-fit"
        />
      </div>
    </>
  );
};

export default DashboradIndexPage;
