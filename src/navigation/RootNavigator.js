import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./index";

export default function RootNavigator(){
    return(
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    )
}