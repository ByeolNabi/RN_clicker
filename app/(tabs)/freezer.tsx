import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import rankingEventEmitter from '../components/rankingEventEmitter';

interface TimerProps { }

type Ranking = {
  gameType: number;
  score: number;
  timestamp: number;  // 마지막 업데이트 시간
};

const Freezer: React.FC<TimerProps> = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0); // 경과 시간
  const [isRunning, setIsRunning] = useState<boolean>(false); // 실행 상태
  const startTimeRef = useRef<number>(0); // 타이머 시작 시간
  const frameRef = useRef<number>(); // requestAnimationFrame ID

  const [buttonType, setButtonType] = useState<number>(0); // 버튼 바뀌기

  const [rankingList, setRankingList] = useState<Ranking[]>([]);


  // 랭킹 데이터 로드
  const loadRankingData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('freezerRanking');
      if (storedData) {
        const parsedData: Ranking[] = JSON.parse(storedData);
        setRankingList(parsedData);
      }
    } catch (error) {
      console.error('Error loading ranking data:', error);
    }
  };

  // 랭킹 데이터 저장
  const saveRankingData = async (newRanking: Ranking) => {
    try {
      console.log(rankingList)
      const updatedList = [...rankingList, newRanking];
      console.log(updatedList)
      updatedList.sort((a, b) => b.score - a.score);  // score 기준 내림차순 정렬
      const top10 = updatedList.slice(0, 10);  // 1위에서 10위까지
      await AsyncStorage.setItem('freezerRanking', JSON.stringify(top10));
      rankingEventEmitter.emit('updateRanking')
      setRankingList(top10);

    } catch (error) {
      console.error('Error saving ranking data:', error);
    }
  };

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
        <View style={styles.button}>{/* 버튼 묶음 */}
          {
            buttonType == 0
              ? <TouchableOpacity style={styles.halfContainer} onPress={() => {
                startTimer();
                setButtonType(crt => (crt + 1) % 3);
              }}>
                <View>{/* 추가적인 스타일링을 위한 View */}
                  <Text>
                    시작
                  </Text>
                </View>
              </TouchableOpacity>
              : buttonType == 1
                ? <TouchableOpacity style={styles.halfContainer} onPress={() => {
                  stopTimer();
                  setButtonType(crt => (crt + 1) % 3);
                  Alert.alert(
                    `오차 {}초 입니다.`,
                    `저장하시겠습니까?`,
                    [
                      { text: "취소", onPress: () => { console.log("취소"); } },
                      { text: "저장", onPress: () => { console.log("저장"); loadRankingData(); saveRankingData({ gameType: 1, score: 1, timestamp: Date.now() }); } }
                    ]
                  );
                }}>
                  <View>{/* 추가적인 스타일링을 위한 View */}
                    <Text>
                      정지
                    </Text>
                  </View>
                </TouchableOpacity>
                : <TouchableOpacity style={styles.halfContainer} onPress={() => {
                  resetTimer();
                  setButtonType(crt => (crt + 1) % 3);
                }}>
                  <View>{/* 추가적인 스타일링을 위한 View */}
                    <Text>
                      리셋
                    </Text>
                  </View>
                </TouchableOpacity>
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
  button: {
    width: '50%',
    height: '50%',
    backgroundColor: 'skyblue',
  },
  textContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Freezer;

// 3초에 시간 맞추기
// 3초 뺴기 걸린 시간
// 시작 -> 정지 -> 저장 팝업 -> 다시하기(값 초기화) -> 시작