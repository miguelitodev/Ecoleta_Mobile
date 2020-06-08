import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { FontAwesome as FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from './../../services/api';
import * as MailCompose from 'expo-mail-composer';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Params {
     point_id: number
}

interface Data {
     point: {
          image: string,
          name: string,
          email: string,
          whatsapp: string,
          city: string,
          uf: string,
     },
     items: {
          title: string,
     }[],
}

const Detail = () => {
     
     const [data, setData] = useState<Data>({} as Data);

     const navigation = useNavigation();
     const route = useRoute();

     const routeParams = route.params as Params;

     function handleNavigateBack(){
          navigation.goBack();
     }

     function handleComposeMail(){
          MailCompose.composeAsync({
               subject: "Interesse na coleta de resíduos",
               recipients: [data.point.email],

          })
     }

     function handleWhatsapp(){
          Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`)
     }

     useEffect(() => {
          console.log("ROUTE PARAMS: " + routeParams.point_id);
          api.get(`points/${routeParams.point_id}`)
          .then(response => {
               setData(response.data)
          })
     }, [])

     if(!data.point){
          return null;
     }

     return(
          <SafeAreaView style={{flex: 1}}>
               <View style={styles.container}>
                    <TouchableOpacity onPress={handleNavigateBack}>
                         <Icon name="arrow-left" color="#34cb79" size={20}/>
                    </TouchableOpacity>
                    <Image style={styles.pointImage} source={{  uri: data.point.image}}/>
                    <Text style={styles.pointName}>
                         {data.point.name}
                    </Text>
                    <Text style={styles.pointItems}>
                         {data.items.map(item => item.title).join(", ")}
                    </Text>

                    <View style={styles.address}>
                         <Text style={styles.addressTitle}>Endereço</Text>
                         <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                    </View>
               </View>
               <View style={styles.footer}>
                    <RectButton
                         style={styles.button}
                         onPress={() => {handleWhatsapp}}
                    >
                         <FontAwesome name="whatsapp" size={20} color="#fff"/>
                         <Text style={styles.buttonText}>Whatsapp</Text>
                    </RectButton>
                    <RectButton
                         style={styles.button}
                         onPress={() => {handleComposeMail}}
                    >
                         <Icon name="mail" size={20} color="#fff"/>
                         <Text style={styles.buttonText}>E-mail</Text>
                    </RectButton>
               </View>
          </SafeAreaView>
     );
}

export default Detail;