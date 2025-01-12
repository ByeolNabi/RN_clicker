import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Timer from './_timer';

const ClickButton: React.FC<{ onStart: () => void, isRunning: () => boolean, isTimeLeft: () => number }> = ({ onStart, isRunning, isTimeLeft }) => {
    const [count, setCount] = useState<number>(0)
    const [score, setScore] = useState<number>(0)

    const Clicked = () => {
        if (isTimeLeft() != 0) {
            onStart()
            if (isRunning()) {
                setCount(c => c + 1)
            }
        } else {
            setScore(crt => crt > count ? crt : count);
            Alert.alert(
                `${count}점 입니다.`,
                `저장하시겠습니까?`,
                [
                    { text: "취소", onPress: () => { console.log("취소"); setCount(0); } },
                    { text: "저장", onPress: () => { console.log("저장"); setCount(0); } }
                ]
            )
        }
    }

    return (
        <View style={styles.halfContainer} onTouchEnd={Clicked}>
            <Text style={styles.text}>점수{score}</Text>
            <View style={styles.halfContainer}>
                <Text>{count}</Text>
            </View>
        </View>
    );
};

const Home: React.FC = () => {
    const timerRef = useRef<{ startTimer: () => void, getIsRunning: () => boolean, getTimeLeft: () => number }>(null);

    const HandleButtonClick = () => {
        if (timerRef.current) {
            timerRef.current.startTimer();
        }
    }

    const HandleGetIsRunning: () => boolean = () => {
        if (timerRef.current) {
            return timerRef.current.getIsRunning();
        }
        return false; //...? 에러를 띄워야하나
    }

    const HandleGetTimeLeft: () => number = () => {
        if (timerRef.current) {
            return timerRef.current.getTimeLeft();
        }
        return 0; //...? 에러를 띄워야하나
    }

    return (
        <View style={styles.container}>
            <Timer ref={timerRef} />
            <ClickButton onStart={HandleButtonClick} isRunning={HandleGetIsRunning} isTimeLeft={HandleGetTimeLeft} />
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