import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import rankingEventEmitter from '../components/rankingEventEmitter';

type Ranking = {
  gameType: number;
  score: number;
  timestamp: number;  // 마지막 업데이트 시간
};

const Ranking: React.FC = () => {
  const [clikerRankingList, setClikerRankingList] = useState<Ranking[]>([]);
  const [freezerRankingList, setFreezerRankingList] = useState<Ranking[]>([]);

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
      const storedData = await AsyncStorage.getItem('clickerRanking');
      if (storedData) {
        const parsedData: Ranking[] = JSON.parse(storedData);
        setClikerRankingList(parsedData);
      }
    } catch (error) {
      console.error('Error loading ranking data:', error);
    }
    try {
      const storedData = await AsyncStorage.getItem('freezerRanking');
      if (storedData) {
        const parsedData: Ranking[] = JSON.parse(storedData);
        setFreezerRankingList(parsedData);
      }
    } catch (error) {
      console.error('Error loading ranking data:', error);
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}>
        <Text style={styles.titleText}>Clicker Ranking</Text>
        <FlatList
          data={clikerRankingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.rankingItem}>
              <Text style={styles.rankingText}>{`[${index + 1}] ${item.score} points`}</Text>
            </View>
          )}
        /></View>
      <View style={styles.halfContainer}>
        <Text style={styles.titleText}>Freezer Ranking</Text>
        <FlatList
          data={freezerRankingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.rankingItem}>
              <Text style={styles.rankingText}>{`[${index + 1}] ${item.score} points`}</Text>
            </View>
          )}
        /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 가로로 나란히 배치
    backgroundColor: '#FAFAFA',
    paddingTop: 24,
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  rankingItem: {
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  rankingText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Ranking;