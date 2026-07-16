/* CODE ATTRIBUTION */
/* TITLE: Golden Forks Restaurant App */
/* AUTHOR: Developed with assistance from Claude (Anthropic AI) And The Independent Institute of Education (Pty) Ltd */
/* DATE: 12/11/2025 */
/* VERSION: First Edition 2025 */
/* DEPENDENCIES: React Native, React Navigation (native & native-stack) */
/* IMAGE CREDIT: https://images.pexels.com/photos/29575352/pexels-photo-29575352.jpeg */


import React from "react";
import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image, 
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "./screens/FilterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddMenuItemScreen from "./screens/AddMenuItemScreen";
import { GoldenMenuItem, RootStackParamList } from "./type";


function WelcomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/29575352/pexels-photo-29575352.jpeg" }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>🍽️ WELCOME TO THE GOLDEN FORKS</Text>
        <Text style={styles.welcomeText}>
          Good Vibes, Golden Flavors, and Memories Worth Sharing Await You.
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.replace("HomeScreen")}
        >
          <Text style={styles.startText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ 
            title: "HomeScreen", 
            headerTitleAlign: "center", 
            headerBackTitle: "Back",
            headerStyle: { backgroundColor: '#2b4b35',  },
            headerTintColor: '#fff',
            
          }} 
        />
        <Stack.Screen 
          name="AddMenuItemScreen" 
          component={AddMenuItemScreen}
          options={{ 
            title: "Add Menu Item", 
            headerTitleAlign: "center", 
            headerBackTitle: "Back",
            headerStyle: { backgroundColor: '#2b4b35',  },
            headerTintColor: '#fff', 
          }} 
        />
        <Stack.Screen 
          name="FilterScreen" 
          component={FilterScreen} 
          options={{ 
            title: "Filter Menu Items", 
            headerTitleAlign: "center", 
            headerBackTitle: "Back",
            headerStyle: { backgroundColor: '#2b4b35',  },
            headerTintColor: '#fff',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: { 
    flex: 1, 
    backgroundColor: "#000"
  },
  heroImage: { 
    width: "100%", 
    height: "100%", 
    position: "absolute",
    resizeMode: "cover",
  },
  headerStyle: {
      backgroundColor: '#2b4b35', 
    },

    headerTintColor: {
      color: '#fff',

     }, 

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeTitle: { 
    color: "#fff", 
    fontSize: 34, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 10
  },
  welcomeText: { 
    color: "#fcfafa", 
    fontSize: 17, 
    textAlign: "center", 
    marginBottom: 480 
  },
  startButton: { 
    backgroundColor: "#2b4b35", 
    paddingVertical: 20, 
    paddingHorizontal: 50, 
    borderRadius: 20, 
    elevation: 4 
  },
  startText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 21 
  },

});