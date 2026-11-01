import { SafeAreaProvider } from 'react-native-safe-area-context';
//mport Login from './src/screens/Login';
//import AboutUs from './src/screens/AboutUs';
//import ForgotPass from './src/screens/ForgotPass';
//import ResetPass from './src/screens/ResetPass';
import Register from './src/screens/Register';
export default function App(){
  return (
    <SafeAreaProvider>
      <Register/>
    </SafeAreaProvider>
  )

    
}