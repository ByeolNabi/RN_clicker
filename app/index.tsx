import { StyleSheet, Text, View } from "react-native";
import MillisecondTimer from "./timer";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <MillisecondTimer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderWidth: 5,
    borderColor: "black",
  }
})