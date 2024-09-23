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
import Modal from '../components/dashboard/pomodoroTimerModal';
import { Button } from '@/components/ui/button';
import { off } from 'process';
import Loading from '../components/loading';
import { TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartData = {
  series: [
    {
      name: 'Mobile',
      data: [30, 40, 35, 50, 49, 60],
    },
    {
      name: 'Desktop',
      data: [20, 30, 25, 40, 39, 50],
    },
  ],
  options: {
    chart: {
      type: 'area',
      stacked: true,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    fill: {
      opacity: 0.4,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  },
};

interface PomodoroState {
  pomodoroTime: number;
  breakTime: number;
  timeLeft: number | null;
  isRunning: boolean;
  isPaused: boolean;
}

const DashboradIndexPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>({
    pomodoroTime: 25,
    breakTime: 5,
    timeLeft: null,
    isRunning: false,
    isPaused: false,
  });
  const [data, setData] = useState<[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/sitecount');
        const count = await response.json();
        setData(count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching count:', error);
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  const handlePlay = () => {
    if (pomodoroState.pomodoroTime > 0) {
      setPomodoroState((prevState) => ({
        ...prevState,
        timeLeft: pomodoroState.pomodoroTime * 60,
        isRunning: true,
        isPaused: false,
      }));
      setShowModal(false);
    } else {
      alert('Pomodoro time must be greater than 0');
    }
  };

  const handleResume = () => {
    setPomodoroState((prevState) => ({
      ...prevState,
      isRunning: true,
      isPaused: false,
    }));
  };

  const handlePause = () => {
    setPomodoroState((prevState) => ({
      ...prevState,
      isRunning: false,
      isPaused: true,
    }));
  };

  const handleCancel = () => {
    setPomodoroState((prevState) => ({
      ...prevState,
      timeLeft: null,
      isRunning: false,
      isPaused: false,
    }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (
      pomodoroState.isRunning &&
      pomodoroState.timeLeft !== null &&
      pomodoroState.timeLeft > 0
    ) {
      timer = setInterval(() => {
        setPomodoroState((prevState) => {
          if (prevState.timeLeft !== null && prevState.timeLeft > 0) {
            return {
              ...prevState,
              timeLeft: prevState.timeLeft - 1,
            };
          } else {
            return prevState;
          }
        });
      }, 1000);
    } else if (pomodoroState.timeLeft === 0) {
      clearInterval(timer as unknown as NodeJS.Timeout);
      setPomodoroState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
      alert('Pomodoro complete! Take a break.');
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [pomodoroState.isRunning, pomodoroState.timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePomodoroTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPomodoroState((prevState) => ({ ...prevState, pomodoroTime: value }));
    } else {
      alert('Pomodoro time cannot be negative');
    }
  };

  const handleBreakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPomodoroState((prevState) => ({ ...prevState, breakTime: value }));
    } else {
      alert('Break time cannot be negative');
    }
  };

  const { count } = data;
  console.log(data);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card className="h-full">
          <CardHeader>Total Notebooks</CardHeader>
          <CardContent>
            Number of total notebooks that your created:{' '}
            {loading ? 'loading...' : count}{' '}
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>Create new notebook</CardHeader>
          <CardContent>
            <Link href="/dashboard/sites/new">
              <Button>Create notebook</Button>
            </Link>
          </CardContent>
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
            {pomodoroState.timeLeft !== null ? (
              <div className="text-center">
                <p className="text-2xl font-semibold mb-4">{`Time Left: ${formatTime(pomodoroState.timeLeft)}`}</p>
                <div className="flex justify-center space-x-4">
                  {pomodoroState.isPaused ? (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
        {/* Calendar */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Area Chart - Stacked</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={350}
            />
          </CardContent>
        </Card>
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
                  value={pomodoroState.pomodoroTime}
                  onChange={handlePomodoroTimeChange}
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
              <label className="block">
                Break Time (minutes):
                <input
                  type="number"
                  value={pomodoroState.breakTime}
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
    </div>
  );
};

export default DashboradIndexPage;
