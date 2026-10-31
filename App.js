import { SafeAreaProvider } from 'react-native-safe-area-context';
//import Login from './src/screens/Login';
//import AboutUs from './src/screens/AboutUs';
import ForgotPass from './src/screens/ForgotPass';
export default function App(){
  return (
    <SafeAreaProvider>
      <ForgotPass/>
    </SafeAreaProvider>
  )

    
}