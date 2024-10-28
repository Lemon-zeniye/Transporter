import { shipments } from "@/mock-data/shipment";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null;

const CountdownTimer: React.FC = () => {
  const current_orders = [
    {
      id: "1",
      start_time: "1:45 PM",
      end_time: "4:45 PM",
      pick_up_location: "Georgetwon (DSE2) AMZL (6705 E Marginal Way South",
      drop_of_location: "6705 East Marginal Way South",
    },
  ];
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const calculateTimeLeft = (): TimeLeft => {
    const eventDate = new Date(
      shipments[0].pickupLocations.pickup_date,
    ).getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const startCountdown = () => {
    setIsCounting(true);
    const intervalId = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (timeLeft) {
        setTimeLeft(timeLeft);
      } else {
        clearInterval(intervalId);
        setIsCounting(false);
      }
    }, 1000);
  };

  const renderOrder = ({ item }: { item: (typeof current_orders)[0] }) => (
    <View style={styles.orderItem}>
      <Text>Start Time: {item.start_time}</Text>
      <Text>End Time: {item.end_time}</Text>
      <Text>Pick-Up Location: {item.pick_up_location}</Text>
      <Text>Drop-Off Location: {item.drop_of_location}</Text>
    </View>
  );
  return (
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <FlatList
        data={current_orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
      />
      <View style={styles.button}>
        <Button
          title="Start Countdown"
          onPress={startCountdown}
          disabled={isCounting}
        />
      </View>

      {timeLeft ? (
        <Text style={styles.timeText}>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </Text>
      ) : (
        <Text>Event has started!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  button: {
    marginTop: 100,
    width: "80%",
  },
  ordersList: {
    width: "100%",
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
  },
});

export default CountdownTimer;
