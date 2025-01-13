import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface TimerProps { }

const Freezer: React.FC<TimerProps> = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // 경과 시간
  const [isRunning, setIsRunning] = useState<boolean>(false); // 실행 상태
  const startTimeRef = useRef<number>(0); // 타이머 시작 시간
  const frameRef = useRef<number>(); // requestAnimationFrame ID

  const [buttonType, setButtonType] = useState<number>(0); // 버튼 바뀌기

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
    <View style={[styles.container]}>{/* 최상단 묶음 */}
      <View style={styles.halfContainer}>{/* 상단 묶음 */}
        <Text style={{ fontSize: 48 }}>
          {timeElapsed.toFixed(2)}초 {/* 소수점 2자리까지 표시 */}
        </Text>
      </View>
      <View style={styles.halfContainer}>{/* 하단 묶음 */}
        <View style={styles.halfContainer}>{/* 버튼 묶음 */}
          {
            buttonType == 1
              ? <Button
                title="시작"
                onPress={() => { startTimer; setButtonType(crt => (crt + 1) % 3); }}
                disabled={isRunning}
              />
              : buttonType == 2
                ? <Button
                  title="정지"
                  onPress={() => { stopTimer; setButtonType(crt => (crt + 1) % 3); }}
                  disabled={!isRunning}
                />
                : <Button
                  title="리셋"
                  onPress={() => { resetTimer; setButtonType(crt => (crt + 1) % 3); }}
                />
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  halfContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default Freezer;

// 3초에 시간 맞추기
// 3초 뺴기 걸린 시간
// 시작 -> 정지 -> 저장 팝업 -> 다시하기(값 초기화) -> 시작