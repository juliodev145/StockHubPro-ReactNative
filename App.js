import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthRoutes from './src/navigation/AuthRoutes';
//import Login from './src/screens/Login';
//import AboutUs from './src/screens/AboutUs';
//import ForgotPass from './src/screens/ForgotPass';
//import ResetPass from './src/screens/ResetPass';
//import Register from './src/screens/Register';
//import Home from './src/screens/Home';
export default function App(){
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthRoutes/>
      </NavigationContainer>
    </SafeAreaProvider>
  )

    
}