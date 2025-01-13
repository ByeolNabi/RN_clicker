import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';

interface TimerProps {}

const Freezer: React.FC<TimerProps> = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // 경과 시간
  const [isRunning, setIsRunning] = useState<boolean>(false); // 실행 상태
  const startTimeRef = useRef<number>(0); // 타이머 시작 시간
  const frameRef = useRef<number>(); // requestAnimationFrame ID

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - timeElapsed * 1000; // 경과 시간을 보정

      const updateTimer = (): void => {
        const currentTime = performance.now();
        const elapsed = (currentTime - startTimeRef.current) / 1000; // 경과 시간 계산
        setTimeElapsed(elapsed); // 경과 시간 업데이트

        frameRef.current = requestAnimationFrame(updateTimer); // 프레임마다 재귀 호출
      };

      frameRef.current = requestAnimationFrame(updateTimer); // 타이머 시작

      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current); // 타이머 중단
        }
      };
    }
  }, [isRunning]);

  const startTimer = (): void => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = (): void => {
    setIsRunning(false);
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current); // requestAnimationFrame 중단
    }
  };

  const resetTimer = (): void => {
    stopTimer(); // 타이머 중단
    setTimeElapsed(0); // 경과 시간 초기화
    startTimeRef.current = 0;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48 }}>
        {timeElapsed.toFixed(2)}초 {/* 소수점 2자리까지 표시 */}
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
        <Button 
          title="시작" 
          onPress={startTimer} 
          disabled={isRunning} 
        />
        <Button 
          title="정지" 
          onPress={stopTimer} 
          disabled={!isRunning} 
        />
        <Button 
          title="리셋" 
          onPress={resetTimer} 
        />
      </View>
    </View>
  );
};

export default Freezer;
