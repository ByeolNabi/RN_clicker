// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button } from 'react-native';

// interface TimerProps {
//   initialTime?: number;
// }

// const Timer: React.FC<TimerProps> = ({ initialTime = 5.00 }) => {
//   const [timeLeft, setTimeLeft] = useState<number>(initialTime);
//   const [isRunning, setIsRunning] = useState<boolean>(false);
//   const startTimeRef = useRef<number>(0);
//   const pausedTimeRef = useRef<number>(0);
//   const frameRef = useRef<number>();

//   useEffect(() => {
//     if (isRunning && timeLeft > 0) {
//       startTimeRef.current = performance.now() - ((initialTime - timeLeft) * 1000);
      
//       const updateTimer = (): void => {
//         const currentTime = performance.now();
//         const elapsed = (currentTime - startTimeRef.current) / 1000;
//         const newTime = Math.max(initialTime - elapsed, 0);
        
//         if (newTime <= 0) {
//           setTimeLeft(0);
//           setIsRunning(false);
//           return;
//         }
        
//         setTimeLeft(newTime);
//         frameRef.current = requestAnimationFrame(updateTimer);
//       };

//       frameRef.current = requestAnimationFrame(updateTimer);
      
//       return () => {
//         if (frameRef.current) {
//           cancelAnimationFrame(frameRef.current);
//         }
//       };
//     }
//   }, [isRunning, initialTime, timeLeft]);

//   const startTimer = (): void => {
//     if (!isRunning) {
//       if (pausedTimeRef.current > 0) {
//         startTimeRef.current = performance.now() - ((initialTime - timeLeft) * 1000);
//       }
//       setIsRunning(true);
//     }
//   };

//   const stopTimer = (): void => {
//     setIsRunning(false);
//     if (frameRef.current) {
//       cancelAnimationFrame(frameRef.current);
//       pausedTimeRef.current = performance.now();
//     }
//   };

//   const resetTimer = (): void => {
//     stopTimer();
//     setTimeLeft(initialTime);
//     startTimeRef.current = 0;
//     pausedTimeRef.current = 0;
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 48 }}>
//         {timeLeft.toFixed(2)}초
//       </Text>
//       <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
//         <Button 
//           title="시작" 
//           onPress={startTimer} 
//           disabled={isRunning || timeLeft === 0} 
//         />
//         <Button 
//           title="정지" 
//           onPress={stopTimer} 
//           disabled={!isRunning} 
//         />
//         <Button 
//           title="리셋" 
//           onPress={resetTimer} 
//         />
//       </View>
//     </View>
//   );
// };

// export default Timer;