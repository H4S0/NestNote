import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PomodoroTimer = ({
  showModal,
  setShowModal,
  pomodoroTime,
  breakTime,
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Time left on the timer
  const [isRunning, setIsRunning] = useState<boolean>(false); // To track if the timer is running
  const [isPaused, setIsPaused] = useState<boolean>(false); // To track if the timer is paused

  const handlePlay = () => {
    if (pomodoroTime > 0) {
      setTimeLeft(pomodoroTime * 60); // Set the time for the timer (convert minutes to seconds)
      setIsRunning(true);
      setIsPaused(false);
      setShowModal(false); // Close the modal
    } else {
      alert('Pomodoro time must be greater than 0');
    }
  };

  // Timer logic to count down
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) =>
          prevTime !== null && prevTime > 0 ? prevTime - 1 : 0
        );
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer as unknown as NodeJS.Timeout); // Stop the timer if it reaches 0
      setIsRunning(false);
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

  return (
    <Card className="h-full border rounded-lg shadow-lg p-4">
      <CardHeader className="text-lg font-bold mb-2">Pomodoro Timer</CardHeader>
      <CardContent>
        {timeLeft !== null ? (
          <div className="text-center">
            <p className="text-2xl font-semibold mb-4">{`Time Left: ${formatTime(timeLeft)}`}</p>
            <div className="flex justify-center space-x-4">
              {isPaused ? (
                <Button
                  onClick={() => setIsPaused(false)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Play
                </Button>
              ) : (
                <Button
                  onClick={() => setIsPaused(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                >
                  Pause
                </Button>
              )}
              <Button
                onClick={() => setTimeLeft(null)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white"
          >
            Create Pomodoro Timer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
