import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Home = () => {

     const navigation = useNavigation();

     function handleNavigateToPoints(){
          navigation.navigate("Points");
          console.log("Indo para a Home");
     }

     return(
          <>
               <ImageBackground 
                    source={require('./../../assets/home-background.png')} 
                    imageStyle={{ width: 274, height:368 }} 
                    style={styles.container}
               >

                    <View style={styles.main}>
                         <Image source={require('./../../assets/logo.png')}/>
                         <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                         <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                    
                    <View style={styles.footer}>
                         <RectButton 
                              style={styles.button}
                              onPress={handleNavigateToPoints}
                         >
                              <View style={styles.buttonIcon}>
                                   <Text>
                                        <Icon name="arrow-right" color="#fff" size={24}/>
                                   </Text>
                              </View>
                              <Text style={styles.buttonText}>
                                   Entrar
                              </Text>
                         </RectButton>
                    </View>

               </ImageBackground>
          </>
     );
}

export default Home;