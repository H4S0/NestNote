'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Modal from '../components/dashboard/pomodoroTimerModal';
import { Button } from '@/components/ui/button';
import { off } from 'process';
import Loading from '../components/loading';

const DashboradIndexPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/sites');
        const data = await response.json();
        const { count } = data;
        setCount(count);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCount();
  }, []);

  const handlePlay = () => {
    if (pomodoroTime > 0) {
      setTimeLeft(pomodoroTime * 60);
      setIsRunning(true);
      setIsPaused(false);
      setShowModal(false);
    } else {
      alert('Pomodoro time must be greater than 0');
    }
  };

  const handleResume = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleCancel = () => {
    setTimeLeft(null);
    setIsRunning(false);
    setIsPaused(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          } else {
            return 0;
          }
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer as unknown as NodeJS.Timeout);
      setIsRunning(false);
      alert('Pomodoro complete! Take a break.');
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePomodoroTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPomodoroTime(value);
    } else {
      alert('Pomodoro time cannot be negative');
    }
  };

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setBreakTime(value);
    } else {
      alert('Break time cannot be negative');
    }
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card className="h-full">
            <CardHeader>Total Notebooks</CardHeader>
            <CardContent>
              Number of total notebooks that your created:{' '}
              {loading ? 'loading..' : count}{' '}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>Total Notebooks</CardHeader>
            <CardContent>notebooks_number</CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>Total Notebooks</CardHeader>
            <CardContent>notebooks_number</CardContent>
          </Card>

          <Card className="h-full border rounded-lg shadow-lg p-4">
            <CardHeader className="text-lg font-bold mb-2">
              Pomodoro Timer
            </CardHeader>
            <CardContent>
              {timeLeft !== null ? (
                <div className="text-center">
                  <p className="text-2xl font-semibold mb-4">{`Time Left: ${formatTime(timeLeft)}`}</p>
                  <div className="flex justify-center space-x-4">
                    {isPaused ? (
                      <Button
                        onClick={handleResume}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Play
                      </Button>
                    ) : (
                      <Button
                        onClick={handlePause}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                      >
                        Pause
                      </Button>
                    )}
                    <Button
                      onClick={handleCancel}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowModal(true)}>
                  Create Pomodoro Timer
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-fit mt-4"
      />

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
              <Button
                onClick={handlePlay}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full"
              >
                Play
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DashboradIndexPage;
