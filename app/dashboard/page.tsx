'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PomodoroTimer from '../components/dashboard/pomodoroTimer';
import Modal from '../components/dashboard/pomodoroTimerModal';

const DashboradIndexPage = () => {
  // State management for Pomodoro timer modal and times
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);

  const [date, setDate] = useState<Date | undefined>(new Date());

  // Handlers to modify time for the Pomodoro timer
  const handlePomodoroTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPomodoroTime(Number(e.target.value));
  };

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBreakTime(Number(e.target.value));
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card className="h-full">
            <CardHeader>Total Notebooks</CardHeader>
            <CardContent>notebooks_number</CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>Total Notebooks</CardHeader>
            <CardContent>notebooks_number</CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>Total Notebooks</CardHeader>
            <CardContent>notebooks_number</CardContent>
          </Card>

          {/* Pass the modal state and handlers to PomodoroTimer */}
          <PomodoroTimer
            showModal={showModal}
            setShowModal={setShowModal}
            pomodoroTime={pomodoroTime}
            breakTime={breakTime}
          />
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-fit mt-4"
        />
      </div>

      {/* Modal component will show up when showModal is true */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Set Pomodoro Timer</h2>
            <div className="space-y-4">
              <label className="block">
                Pomodoro Time (minutes):
                <input
                  type="number"
                  value={pomodoroTime}
                  onChange={handlePomodoroTimeChange}
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
              <label className="block">
                Break Time (minutes):
                <input
                  type="number"
                  value={breakTime}
                  onChange={handleBreakTimeChange}
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
              <button
                onClick={() => setShowModal(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full"
              >
                Save & Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DashboradIndexPage;
