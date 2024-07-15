import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Add from '../screens/Add';
import SingUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{title:'Home'}} />
                <Stack.Screen name="Add" component={Add} 
                options={{presentation:'modal', title:'Agregar productos'}}/>
                <Stack.Screen name="LogIn" component={SingUp} options={{title:'Inicio de sesión'}} />
                <Stack.Screen name="SignUp" component={SingUp} options={{title:'Registrarse'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;