import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Timer from './_timer';

const ClickButton: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    return (
        <View style={styles.halfContainer} onTouchEnd={onStart}>
            <Text style={styles.text}>button here</Text>
        </View>
    );
};

const Home: React.FC = () => {
    const timerRef = useRef<{ startTimer: () => void }>(null);

    const HandleButtonClick = () => {
        if (timerRef.current) {
            timerRef.current.startTimer();
        }
        console.log("Timer on! Let's click")
    }

    return (
        <View style={styles.container}>
            <Timer ref={timerRef} />
            <ClickButton onStart={HandleButtonClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
    text: {
        textAlign: 'center',
    },
});

export default Home;