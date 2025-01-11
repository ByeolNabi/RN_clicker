import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Cliker',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="gamepad" color={color} />,
                }}
            />
            <Tabs.Screen
                name="ranking"
                options={{
                    title: 'Ranking',
                    tabBarIcon: ({ color }) => <FontAwesome6 name="ranking-star" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name="timer"
                options={{
                    title: 'Timer',
                    tabBarIcon: ({ color }) => <Ionicons name="timer" size={24} color="black" />,
                }}
            />
        </Tabs>
    );
}
