//lista todas as telas "de fora"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPass from "../screens/ForgotPass";
import ResetPass from "../screens/ResetPass";
import AboutUs from "../screens/AboutUs";
import AppTabs from "./AppTabs"; 
import Report from "../screens/Report";
import Profile from "../screens/Profile";
import Stock from "../screens/Stock";

const Stack = createNativeStackNavigator(); 

export default function AuthRoutes(){
    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="ForgotPass" component={ForgotPass}/>
            <Stack.Screen name="ResetPass" component={ResetPass}/>
            <Stack.Screen name="AboutUs" component={AboutUs}/>
            <Stack.Screen name="App" component={AppTabs}/>
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Stock" component={Stock} />
        </Stack.Navigator>
    )
}
