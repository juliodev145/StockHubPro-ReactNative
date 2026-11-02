import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../screens/Home";
import AddItem from "../screens/AddItem";
import RemoveItem from "../screens/RemoveItem";
import Stock from "../screens/Stock";
import Menu from "../screens/Menu";

const Tab = createBottomTabNavigator();
const BLUE = "#0045C4";

const ICONS = {
    Home: "home-outline",
    AddItem: "add-circle-outline",
    RemoveItem: "remove-circle-outline",
    Stock: "cube-outline",
    Menu: "menu-outline",
};

export default function AppTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: BLUE,
                tabBarInactiveTintColor: "#000",
                tabBarIcon: ({ color }) => (
                    <Ionicons name={ICONS[route.name]} size={28} color={color} />
                ),
                tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
                tabBarStyle: {
                    height: 80 + insets.bottom,
                    paddingTop: 8,
                    paddingBottom: insets.bottom + 14,
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: "Início" }} />
            <Tab.Screen name="AddItem" component={AddItem} options={{ title: "Cadastrar item" }} />
            <Tab.Screen name="RemoveItem" component={RemoveItem} options={{ title: "Saída de item" }} />
            <Tab.Screen name="Stock" component={Stock} options={{ title: "Estoque" }} />
            <Tab.Screen name="Menu" component={Menu} options={{ title: "Menu" }} />
        </Tab.Navigator>
    );
}