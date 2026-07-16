import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, GoldenMenuItem } from "../type";


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "HomeScreen">;


const predefined: GoldenMenuItem[] = [
    {
        itemName: "Classic Cheese Burger",
        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce on a toasted bun.",
        course: "Main",
        price: 100,
        intensity: "Balanced",
    },
    {
        itemName: "Beef Wellington",
        description: " Tender beef fillet wrapped in puff pastry with mushroom duxelles and prosciutto.",
        course: "Starter",
        price: 68,
        intensity: "Strong",
        
    },
    {
        itemName: " Garlic Bread",
        description: " Toasted baguette slices topped with garlic butter and herbs.",
        course: "starter",
        price: 45,
        intensity: "Mild",
    },
    {
        itemName: "Bruschetta",
        description: "Grilled bread topped with fresh tomatoes, basil, garlic, and olive oil.",
        course: "starter",
        price: 40,
        intensity: "Balanced",  
    },
    {
       
        itemName: "Margherita Pizza",
        description: " Classic pizza with fresh tomatoes, mozzarella, and basil on a thin crust.",
        course: "Main",
        price: 150,
        intensity: "strong",
    },
    {
        itemName: "Caesar Salad",
        description: "Fresh garden salad with mixed greens, cherry tomatoes, cucumbers, and a light vinaigrette dressing.",
        course: "Main",
        price: 99,
        intensity: "Mild",
    },
    {
        itemName: "Grilled Salmon",
        description: "Fresh salmon fillet grilled to perfection with lemon butter sauce and seasonal vegetables.",
        course: "Main",
        price: 95,
        intensity: "Balanced",
    },
    {
        itemName: "Berry Cheesecake",
        description: "Creamy cheesecake with berry compote topping and a graham cracker crust.",
        course: "Dessert",
        price: 79,
        intensity: "Mild",

    },
    {
        itemName: "Chocolate Mousse",
        description: "Light and airy dark chocolate mousse topped with whipped cream and chocolate shavings.",
        course: "Dessert",
        price: 60,
        intensity: "Strong",
    },
    {
        
        itemName: "Espresso Brownie",
        description: "Dense brownie infused with espresso flavor, served warm with a scoop of vanilla ice cream.",
        course: "Dessert",
        price: 55,
        intensity: "Strong",
    },
];


export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [items, setItems] = useState<GoldenMenuItem[]>(predefined);

  // Calculate average prices by course
  const calculateAverages = () => {
    const courses = ['Starter', 'Main', 'Dessert'];
    const averages: { [key: string]: string } = {};

    courses.forEach(course => {
      const courseItems = items.filter(item => item.course === course);
      if (courseItems.length > 0) {
        const total = courseItems.reduce((sum, item) => sum + item.price, 0);
        averages[course] = (total / courseItems.length).toFixed(2);
      } else {
        averages[course] = '0.00';
      }
    });

    return averages;
  };

  const averages = calculateAverages();

  const removeItem = (index: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setItems(items.filter((_, i) => i !== index)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>THE GOLDEN FORKS RESTAURANT</Text>
      <Text style={styles.subtitle}>OUR MENU</Text>
      <Text style={styles.itemCountText}>
        {items.length === 0
          ? 'No items on the menu yet.'
          : `You currently have ${items.length} item${items.length > 1 ? 's' : ''} on your menu.`}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Starter</Text>
          <Text style={styles.statValue}>R{averages.Starter}</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Main</Text>
          <Text style={styles.statValue}>R{averages.Main}</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Dessert</Text>
          <Text style={styles.statValue}>R{averages.Dessert}</Text>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.itemName}</Text>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>R{item.price.toFixed(2)}</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <View style={styles.courseBadge}>
                <Text style={styles.courseText}>{item.course}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={items.length === 0 ? styles.emptyList : { paddingBottom: 10 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMenuItemScreen", { items, setItems })}
      >
        <Text style={styles.addText}>+ Add New Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate("FilterScreen", { items })}
      >
        <Text style={styles.filterText}>Filter Items</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f0df',
    padding: 15,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#537231',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#0b0b0b',
    marginBottom: 15,
    marginTop: 5,
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  itemCountText: {
    fontSize: 16,
    color: '#105743',
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#61775f',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    color: '#2b4b35',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#302f2f',
    flex: 1,
    marginRight: 10,
  },
  priceTag: {
    backgroundColor: '#4c864a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#61775f',
    fontSize: 15,
    marginVertical: 5,
    lineHeight: 22,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2d534b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  courseText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  removeButton: {
    backgroundColor: '#285940',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#345927',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  filterButton: {
    backgroundColor: '#345927',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  addText: {
    color: '#fff8e1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterText: {
    color: '#fff8e1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});