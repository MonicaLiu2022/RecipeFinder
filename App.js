import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(recipes => setRecipes(recipes.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) =>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.strMeal}
            </Text>
            <Image
              style={{ width: 60, height: 60 }}
              source={{ uri: item.strMealThumb }} />
          </View>
        }
        ItemSeparatorComponent={listSeparator} />
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)}
      />
      <Button
        title="Find"
        onPress={getRecipes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    marginLeft: 20,
    justifyContent: 'center',
  },
});
