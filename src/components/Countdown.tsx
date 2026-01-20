import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  title: string;
  size?: 'small' | 'large';
  currentTickets?: number;
  maxTickets?: number;
  lotteryTitle?: string;
}

const Countdown: React.FC<CountdownProps> = ({ 
  targetDate, 
  title, 
  size = 'large',
  currentTickets = 0,
  maxTickets = 3000,
  lotteryTitle
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isSmall = size === 'small';
  const progressPercentage = Math.min((currentTickets / maxTickets) * 100, 100);

  // Labels en français
  const labels = {
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes'
  };
  return (
    <div className={`text-center ${isSmall ? 'p-3' : 'p-5'}`}>
      <h3 className={`${isSmall ? 'text-sm' : 'text-base'} font-medium text-gray-700 mb-3`}>
        {title}
      </h3>
      
      <div className={`flex gap-${isSmall ? '2' : '3'} justify-center mb-4`}>
        {Object.entries(timeLeft).map(([unit, value]) => {
          return (
          <div key={unit} className="text-center">
            <div className={`${isSmall ? 'w-10 h-10 text-base' : 'w-12 h-12 text-xl'} bg-black text-white flex items-center justify-center font-bold`}>
              {value.toString().padStart(2, '0')}
            </div>
            <span className={`${isSmall ? 'text-xs' : 'text-sm'} text-gray-500 mt-1 block capitalize`}>
              {labels[unit as keyof typeof labels]}
            </span>
          </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="mb-3">
        {lotteryTitle ? (
          <h4 className="font-semibold text-gray-900 mb-2 text-center">
            {lotteryTitle}
          </h4>
        ) : (
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Participants :</span>
            <span className="font-semibold">{currentTickets} tickets vendus</span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;