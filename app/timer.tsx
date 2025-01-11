import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MillisecondTimer: React.FC = () => {
    const [time, setTime] = useState<number>(0); // 타이머 시간 저장
    const [isRunning, setIsRunning] = useState<boolean>(false); // 타이머 실행 상태
    const startTimeRef = useRef<number>(0); // 타이머 시작 시간
    const rafRef = useRef<number | null>(null); //requestAnimationFrame ID

    const startTimer = () => {
        if (!isRunning) { // 실행 안 하고 있다면
            setIsRunning(true);
            startTimeRef.current = performance.now() - time; // 기준 시간
            const updateTimer = () => {
                const elapsed = performance.now() - startTimeRef.current; // 지금 - 기준 시간 = 지나간 시간
                setTime(elapsed);
                rafRef.current = requestAnimationFrame(updateTimer);
            }
            updateTimer();
        }
    }

    const stopTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
    }

    const resetTimer = () => {
        setIsRunning(false);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        setTime(0);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{(time*0.001).toFixed(2)} ms</Text>
            <View style={styles.buttons}>
                <Button title="start" onPress={startTimer} disabled={isRunning}/>
                <Button title="stop" onPress={stopTimer} disabled={!isRunning}/>
                <Button title="restart" onPress={resetTimer}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    time: {
        fontSize: 48,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
});


export default MillisecondTimer;