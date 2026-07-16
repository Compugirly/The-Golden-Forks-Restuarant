import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Platform, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, TextInput, Keyboard, GestureResponderEvent, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, GoldenMenuItem } from "../type";

type Props = NativeStackScreenProps<RootStackParamList, "FilterScreen">;   

const c = { bg: "#12100f", card:"#1b1513", text:"#f7f5f2ff", meta:"#4c864aff", input: "#2e2d2dff", border:"#2d534bff"};

export default function FilterScreen({ route }: Props){
    const { items = [], setItems } = route.params as { items?: GoldenMenuItem[]; setItems?: (items: GoldenMenuItem[]) => void };
    const [course, setCourse] = useState<string>("");          // Stores the category of the menu item
    const filtered = useMemo(() => items.filter(i => i.course === course), [items, course]);
    // State variables to store user input for a new menu item
      const [itemName, setItemName] = useState('');           // Stores the name of the cafe item
      const [description, setDescription] = useState('');     // Stores the description of the cafe item
      const [price, setPrice] = useState('');                 // Stores the price of the cafe item as a string
    


    const deleteItem = (index: number) => {
        Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
          { text: 'Cancel', style: 'cancel' }, 
          
            { text: 'Delete', style: 'destructive', onPress: () =>
                setItems && setItems(items.filter((_, i) => i !== index))   
            },
        ]);

        if (setItems) {
          setItems(items.filter((_, i) => i !== index));
        };
     };
    

    return (
        <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >

        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Filter Menu</Text>
            
           <View style={styles.pickerWrapper}>
                       <Text style={styles.label}>Course</Text>
                       <View style={styles.pickerContainer}>
                         <Picker
                           selectedValue={course}
                           onValueChange={(value) => setCourse(value)}
                           mode="dropdown"
                           dropdownIconColor="#2b4b35"
                           style={styles.pickerStyle}
                         >
                           <Picker.Item label="Select a course" value="" color="#999" />
                           <Picker.Item label="Starter" value="Starter" />
                           <Picker.Item label="Main" value="Main" />
                           <Picker.Item label="Dessert" value="Dessert" />
                         </Picker>
                       </View>
                     </View>

            <View style={styles.headerRow}>
                <Text style={styles.heading}>Filtered Menu Items</Text>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{filtered.length}</Text>
                </View>
            </View>

            {filtered.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No items found</Text>
                    <Text style={styles.emptySubtext}>Try selecting a different course</Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemBox}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>{item.itemName}</Text>
                                <View style={styles.priceTag}>
                                    <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
                                </View>
                            </View>
                            <Text style={styles.itemDesc}>{item.description}</Text>
                            <View style={styles.courseBadge}>
                                <Text style={styles.courseText}>{item.course}</Text>
                            </View>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(index)}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
     </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#f2f0df", 
        padding: 15 
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: c.bg,
        marginBottom: 20,
        marginTop: 10,
        textAlign: "center",
    },

    pickerWrapper: {
    marginVertical: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3d3c3bff",
    marginBottom: 8,
    marginLeft: 3,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#2c481fff",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: 'hidden',
  },

  pickerStyle: {
    color: "#2e2d2dff",
    height: Platform.OS === 'ios' ? 180 : 55,
    marginTop: Platform.OS === 'ios' ? -60 : 0,
  },

  deleteButton: {
    backgroundColor: '#2b4b35ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        justifyContent: "space-between",
    },
    heading: {
        fontSize: 20,
        fontWeight: "700",
        color: c.bg,
        alignSelf: "flex-start",
    },
    countBadge: {
        backgroundColor: c.meta,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    countText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    listContent: {
        paddingBottom: 20,
    },
    itemBox: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0ddd9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    itemName: {
        fontSize: 20,
        fontWeight: "700",
        color: c.bg,
        flex: 1,
        marginRight: 12,
    },
    priceTag: {
        backgroundColor: c.meta,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },

    input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2d534bff',
    paddingHorizontal: 14,
    height: 50,
    marginVertical: 8,
    fontSize: 16,
    color: '#2e2d2dff',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  }, 
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    itemDesc: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        marginBottom: 10,
    },
    courseBadge: {
        alignSelf: "flex-start",
        backgroundColor: c.border,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    courseText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
        textTransform: "capitalize",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: "600",
        color: c.bg,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#666",
    },
    
    formContainer: { 
    backgroundColor: "#f2e9d4", 
    padding: 20,
    flexGrow: 1,
  },
});