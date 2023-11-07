/* eslint-disable prettier/prettier */
import StartBlocked from './Blocked/StartBlocked';

export default function BlockedAppScreen({navigation}) {
    navigation.setOptions({
        headerStyle: {
            height: 70,
        },
        headerTitleStyle: {
            fontSize: 22,
            fontFamily: 'Roboto-Bold', // Set your desired font family
          },
    });
    return (
       
            <StartBlocked/>
               
            
    );
}
