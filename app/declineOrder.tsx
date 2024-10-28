import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

const AddTextView: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = () => {
    if (text.trim()) {
      setItems([...items, text.trim()]);
      setText(""); // Clear the input field after adding
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={handleAdd} />

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.itemText}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    padding: 5,
  },
});

export default AddTextView;
