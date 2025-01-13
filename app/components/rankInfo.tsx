import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Ranking = {
  gameType: string;
  userName: string;
  score: number;
  timestamp: number;  // 마지막 업데이트 시간
};

const RankingScreen = () => {
  const [rankingList, setRankingList] = useState<Ranking[]>([]);
  const [gameType, setGameType] = useState('');
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState<number>(0);

  // 랭킹 데이터 로드
  const loadRankingData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('rankingList');
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
      const updatedList = [...rankingList, newRanking];
      updatedList.sort((a, b) => b.score - a.score);  // score 기준 내림차순 정렬
      const top10 = updatedList.slice(0, 10);  // 1위에서 10위까지
      await AsyncStorage.setItem('rankingList', JSON.stringify(top10));
      setRankingList(top10);
    } catch (error) {
      console.error('Error saving ranking data:', error);
    }
  };

  const handleSubmit = () => {
    if (gameType && userName && score > 0) {
      const newRanking: Ranking = {
        gameType,
        userName,
        score,
        timestamp: Date.now(),
      };
      saveRankingData(newRanking);
    }
  };

  useEffect(() => {
    loadRankingData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter game type"
        value={gameType}
        onChangeText={setGameType}
        style={{ marginBottom: 10, padding: 8, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        style={{ marginBottom: 10, padding: 8, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Enter your score"
        value={score.toString()}
        onChangeText={(text) => setScore(Number(text))}
        keyboardType="numeric"
        style={{ marginBottom: 10, padding: 8, borderWidth: 1 }}
      />
      <Button title="Submit" onPress={handleSubmit} />

      <FlatList
        data={rankingList}
        renderItem={({ item, index }) => (
          <View style={{ padding: 10 }}>
            <Text>{`${index + 1}. ${item.userName} - ${item.score} points (${item.gameType})`}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RankingScreen;
