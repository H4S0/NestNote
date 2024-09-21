'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Modal from '../components/dashboard/pomodoroTimer';

const DashboradIndexPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(25); // Default 25 minutes
  const [breakTime, setBreakTime] = useState<number>(5); // Default 5 minutes
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Time left on the timer
  const [isRunning, setIsRunning] = useState<boolean>(false); // To track if the timer is running

  // Handle play button click
  const handlePlay = () => {
    if (pomodoroTime > 0) {
      setTimeLeft(pomodoroTime * 60); // Set the time for the timer (convert minutes to seconds)
      setIsRunning(true);
      setShowModal(false); // Close the modal
    } else {
      alert('Pomodoro time must be greater than 0');
    }
  };

  // Handle pause button click
  const handlePause = () => {
    setIsRunning(false);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setTimeLeft(null); // Reset the timer
    setIsRunning(false);
  };

  // Timer logic to count down
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft !== null && timeLeft > 0) {
      // If the timer is running and there is time left, start the countdown
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          // Ensure the timer never goes below 0
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            return 0; // Prevent negative time
          }
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer as unknown as NodeJS.Timeout); // Stop the timer if it reaches 0
      setIsRunning(false); // Mark the timer as not running
      alert('Pomodoro complete! Take a break.');
    }

    return () => clearInterval(timer as NodeJS.Timeout); // Cleanup the interval on component unmount
  }, [isRunning, timeLeft]);

  // Function to format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Function to handle time input change
  const handlePomodoroTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value); // Convert input to number
    if (value >= 0) {
      setPomodoroTime(value); // Only set positive values
    } else {
      alert('Pomodoro time cannot be negative');
    }
  };

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value); // Convert input to number
    if (value >= 0) {
      setBreakTime(value); // Only set positive values
    } else {
      alert('Break time cannot be negative');
    }
  };
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
            <Card className="w-full border rounded-lg shadow-lg p-4">
              <CardHeader className="text-lg font-bold mb-2">
                Pomodoro Timer
              </CardHeader>
              <CardContent>
                {timeLeft !== null ? (
                  <div className="text-center">
                    <p className="text-2xl font-semibold mb-4">{`Time Left: ${formatTime(timeLeft)}`}</p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handlePause}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                      >
                        Pause
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Create Pomodoro Timer
                  </button>
                )}
              </CardContent>
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
                onClick={handlePlay}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full"
              >
                Play
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DashboradIndexPage;
