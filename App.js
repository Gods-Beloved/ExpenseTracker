import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RecentExpenseScreen from "./screens/RecentExpenseScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpenses from "./screens/ManageExpenses";
import { EXPENSE_COLORS } from "./utils/styles";
import IconButton from "./components/expensesOutput/IconButton";
import ExpenseContextProvider from "./stores/expense-context";

const Tabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function ExpenseOverview({ navigation }) {
  function addExpensePage() {
    navigation.navigate("ManageExpenses");
  }
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: EXPENSE_COLORS.colors.primary500,
        },

        tabBarActiveTintColor: EXPENSE_COLORS.colors.accent500,

        headerStyle: {
          backgroundColor: EXPENSE_COLORS.colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: "Recent",
          headerRight: ({ tintColor }) => {
            return (
              <View style={{}}>
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={addExpensePage}
                />
              </View>
            );
          },
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
        name="Recent Expenses"
        component={RecentExpenseScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
        name="All Expenses"
        component={AllExpensesScreen}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="ExpenseOverview"
              component={ExpenseOverview}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                presentation: "modal",
                headerStyle: {
                  backgroundColor: EXPENSE_COLORS.colors.primary500,
                },
                headerTintColor: "white",
                title: "Manage Expenses",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
