import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', animation: 'shift' }}>
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
                    tabBarIcon: ({ color }) => <FontAwesome6 name="ranking-star" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="freezer"
                options={{
                    title: 'Freezer',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="stopwatch" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
