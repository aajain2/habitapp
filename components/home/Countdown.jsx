import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const Countdown = ({
  containerStyles
}) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeLeft = nextDay - now;

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return { hours, minutes, seconds };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <View className={containerStyles}>
      <Text className="text-white text-3xl font-inter-regular">
        {`${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`}
      </Text>

      <Text className="text-white font-inter-medium text-xs w-52">Left to complete habit</Text>
    </View>
  )
}

export default Countdown