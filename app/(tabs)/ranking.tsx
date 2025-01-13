import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { rankingEventEmitter } from '../components/rankingEventEmitter';

type Ranking = {
  gameType: number;
  score: number;
  timestamp: number;  // 마지막 업데이트 시간
};

const Ranking: React.FC = () => {
  const [rankingList, setRankingList] = useState<Ranking[]>([]);

  useEffect(() => {
    loadRankingData();

    const updateListener = () => {
      loadRankingData();
    }

    rankingEventEmitter.on('updateRanking', updateListener);

    return () => {
      rankingEventEmitter.off('updateRanking', updateListener);
    }
  }, [])

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



  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}><Text>Clicker Ranking</Text>
        <FlatList
          data={rankingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ padding: 10 }}>
              <Text>{`[${index + 1}] ${item.score} points`}</Text>
            </View>
          )}
        /></View>
      <View style={styles.halfContainer}><Text>Freezer Ranking</Text><Text style={styles.textContainer}>rank data</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  },
  textContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default Ranking;