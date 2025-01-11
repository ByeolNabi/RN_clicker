import { View, Text, StyleSheet } from 'react-native';

const Home: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Clicker Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;