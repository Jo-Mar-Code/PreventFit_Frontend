import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Switch, Modal, Alert, Pressable, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect, useRef }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import moment from 'moment';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { setNotifRecuperation, setNotifFeedback, setNotifHydratation, logout} from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
Notifications.setNotificationHandler({
 handleNotification: async () => ({
 shouldShowAlert: true,
 shouldPlaySound: false,
 shouldSetBadge: false,
 }),
});


export default function FeedbackScreen({ navigation }) {
 const [ishydrated, setIsHydrated] = useState(false);
 
 const [feedback, setFeedback] = useState(false);
 const [recuperation, setRecuperation] = useState(false);
 
 const [oldmail, setOldMail] = useState();
 const [newmail, setNewMail] = useState();
 const [password, setPassword] = useState();
 const user = useSelector((state) => state.user.value);
 const usernotif = useSelector((state) => state.user.notification);
 const [ modalVisible, setModalVisible ] = useState(false);
 const[errorConnect, setErrorConnect] = useState(false);
 const[errorNewMail, setErrorNewMail] = useState(false);
 const[pass, setPass] = useState();
 const[newpass, setNewPass] = useState();
 const[confpass, setConfPass] = useState();
 const[ modalVisiblepass, setmodalVisiblepass ] = useState(false);
 const[errorPassword, setErrorPassword] = useState(false); erroroldPassword
 const[erroroldPassword, setErrorOldPassword] = useState(false); 
 const [expoPushToken, setExpoPushToken] = useState('');
 const [notification, setNotification] = useState(false);
 const notificationListener = useRef();
 const responseListener = useRef();
 const [lastFeedback, setLastFeedback] = useState();
 const dateToday= moment();

 console.log(usernotif.recuperation)
 const dispatch = useDispatch();
 const handlePressdeco = () => {
 
 dispatch(logout())

 navigation.navigate('HomeScreen')
 }





 useEffect(() => {
 fetch(`http://192.168.1.22:3000/stats/getFeedback/${user.token}`)
 .then(response => response.json())
 .then(data => {
 
 const lastStat = moment(data.data[data.data.length - 1].Date).add(1, 'day').startOf('day');
 
 setLastFeedback(lastStat)
 
 
 })
 
 }, [])




 const recupSwitch = async() => {
 // setRecuperation(previousState => !previousState);

 dispatch(setNotifRecuperation(!usernotif.recuperation));
 
 if(usernotif.recuperation ===false && (dateToday.diff(lastFeedback, 'days') >= 1 || lastFeedback === undefined && usernotif.recuperation ===false)){
 await Notifications.scheduleNotificationAsync({
 identifier : 'recupReminder',
 content: {
 title: "Rappel Récupération 🙆 ",
 body: 'Pensez à remplir votre récupération !',
 data: { data: 'goes here' },
 },
 trigger: { seconds: 60, repeats: true }, 
 });
 } else {
 await Notifications.cancelScheduledNotificationAsync('recupReminder')
 }
}

const feedSwitch = async() => {
 // setFeedback(previousState => !previousState);
 dispatch(setNotifFeedback(!usernotif.feedback));

 if(usernotif.feedback ===false && (dateToday.diff(lastFeedback, 'days') >= 1 || lastFeedback === undefined && usernotif.feedback ===false)){
 await Notifications.scheduleNotificationAsync({
 identifier : 'feedbackReminder',
 content: {
 title: "Rappel Feedback 📝 ",
 body: 'Pensez à remplir votre feedback journalier !',
 data: { data: 'goes here' },
 },
 trigger: { seconds: 60, repeats: true }, 
 });
 } else {
 await Notifications.cancelScheduledNotificationAsync('feedbackReminder')
 }
}

const toggleSwitch = async() => {
 // setIsHydrated(previousState => !previousState);
 dispatch(setNotifHydratation(!usernotif.hydratation));
 
 if(usernotif.hydratation ===false && (dateToday.diff(lastFeedback, 'days') >= 1 || lastFeedback === undefined && usernotif.hydratation ===false)){
 await Notifications.scheduleNotificationAsync({
 identifier : 'hydratedReminder',
 content: {
 title: "Rappel Hydrique 💧 ",
 body: 'Pensez à vous hydrater régulièrement !',
 data: { data: 'goes here' },
 },
 trigger: { seconds: 60, repeats: true },
 });
 } else {
 await Notifications.cancelScheduledNotificationAsync('hydratedReminder')
 }


 }

 
 
 useEffect(() => {
 registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

 notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
 setNotification(notification);
 });

 responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
 console.log(response);
 });

 return () => {
 Notifications.removeNotificationSubscription(notificationListener.current);
 Notifications.removeNotificationSubscription(responseListener.current);
 };
 }, []);

 
 
 async function registerForPushNotificationsAsync() {
 let token;
 
 if (Platform.OS === 'android' ) {
 await Notifications.setNotificationChannelAsync('default', {
 name: 'default',
 importance: Notifications.AndroidImportance.MAX,
 vibrationPattern: [0, 250, 250, 250],
 lightColor: '#FF231F7C',
 });
 }
 
 if (Device.isDevice) {
 const { status: existingStatus } = await Notifications.getPermissionsAsync();
 let finalStatus = existingStatus;
 if (existingStatus !== 'granted') {
 const { status } = await Notifications.requestPermissionsAsync();
 finalStatus = status;
 }
 if (finalStatus !== 'granted') {
 alert('Failed to get push token for push notification!');
 return;
 }
 
 token = (await Notifications.getExpoPushTokenAsync({ projectId: '58181a98-2d4b-4499-9c95-83ded1663753' })).data;
 console.log(token);
 } else {
 alert('Must use physical device for Push Notifications');
 }
 

 return token;
 }
 


 const handlePressMail = (old, mail, password ) => {
 fetch(`http://192.168.1.22:3000/users/newmail/${user.token}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: old, newemail: mail, password: password }),
 })
 .then(response => response.json())
 .then(data => {
 console.log(data)
 if (data.result.modifiedCount === 1){
 setModalVisible(true)
 setErrorNewMail(false)
 setErrorConnect(false)
 setTimeout(() =>{
 setModalVisible(false); 
 }, 1500)
 } else if (data.result === false && data.message ==='Cette adresse e-mail est déjà utilisée.') {
 
 setErrorNewMail(true)
 setErrorConnect(false)
 }else {
 setErrorConnect(true)
 setErrorNewMail(false)
 }

 }) 
 
 setOldMail('')
 setNewMail('')
 setPassword('')
 }

 const handlePressPassword = (pass, newpass, confpass ) => {
 if (newpass === confpass){
 console.log(newpass)
 console.log(confpass)
 fetch(`http://192.168.1.22:3000/users/newpassword/${user.token}`, {
 method: 'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ newpassword: newpass, password: pass}),
 })
 .then(response => response.json())
 .then(data => {
 if(data.result.modifiedCount === 1 && newpass === confpass){
 // console.log(data.result.modifiedCount)
 // console.log(newpass)
 // console.log(confpass)
 setErrorPassword(false)
 setErrorOldPassword(false) 
 setmodalVisiblepass(true)
 setTimeout(() =>{
 setmodalVisiblepass(false); 
 }, 1500)
 } else{ setErrorOldPassword(true),setErrorPassword(false) }
 }) } else { setErrorOldPassword(false), setErrorPassword(true) }
 setPass('')
 setNewPass('')
 setConfPass('')

}
 
 return (
 <View style={styles.container}>
 <Text style={styles.titlePage}>Paramètres</Text> 
 
 <ScrollView>
 <View style={styles.allQuestions}>

 <Text style={styles.titleTheme}>Confidentialité Profil</Text>
 <Text style={styles.questionTheme}>Changement d'adresse mail</Text>
 <View style={styles.inputs}>
 <TextInput placeholder='Email actuel' style={styles.input} onChangeText={(value)=>setOldMail(value)} value={oldmail} ></TextInput>
 <TextInput placeholder='Nouvel Email' style={styles.input} onChangeText={(value)=>setNewMail(value)} value={newmail} ></TextInput>
 {errorNewMail && <Text style={{color:'red', marginLeft: 70}}>L'adresse mail a déjà été utilisée.</Text>} 
 <TextInput placeholder='Mot de passe' style={styles.input} onChangeText={(value)=>setPassword(value)} value={password} secureTextEntry={true} ></TextInput>
 {errorConnect && <Text style={{color:'red', marginLeft: 70}}>Email ou mot de passe incorrect.</Text>}
 <TouchableOpacity style={styles.btnmail} onPress={() => handlePressMail(oldmail, newmail, password)}>
 <Text style={styles.textmail}>Confirmer</Text>
 </TouchableOpacity>
 </View>
 <View style={styles.checkboxQuestion}>
 <Text style={styles.questionTheme}>Changement de mot de passe</Text>
 <View style={styles.inputs}>
 <TextInput placeholder='Mot de passe actuel' style={styles.input} onChangeText={(value)=>setPass(value)} value={pass} secureTextEntry={true} ></TextInput>
 {erroroldPassword && <Text style={{color:'red', marginLeft: 60}}>Vous n'avez pas bien saisi votre mot de passe actuel.</Text>} 
 <TextInput placeholder='Nouveau Mot de passe' style={styles.input} onChangeText={(value)=>setNewPass(value)} value={newpass}></TextInput>
 <TextInput placeholder='validation nouveau Mot de passe' style={styles.input} onChangeText={(value)=>setConfPass(value)} value={confpass} ></TextInput>
 {errorPassword && <Text style={{color:'red', marginLeft: 60}}>Le nouveau mot de passe n'a pas été validé.</Text>} 
 <TouchableOpacity style={styles.btnmail} onPress={() => handlePressPassword(pass, newpass, confpass)}>
 <Text style={styles.textmail}>Confirmer</Text>
 </TouchableOpacity>
 </View>
 </View>
 

 <Text style={styles.titleTheme}>Notifications</Text>
 <View style={styles.notif}>
 <Text style={styles.questionTheme}>Rappel Hydrique</Text>
 <Switch style={styles.switch}
 trackColor={{ false: '#767577', true: '#E76F51' }}
 // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
 ios_backgroundColor="#3e3e3e"
 onValueChange={toggleSwitch}
 value={usernotif.hydratation}
 />
 </View>
 

 <View style={styles.checkboxQuestion}>
 <Text style={styles.notiftext}>Nous vous rappelerons votre objectif Hydrique que vous vous êtes fixé.</Text>
 <Text style={styles.questionTheme}>Rappel Feedback</Text>
 <Switch style={styles.switch}
 trackColor={{ false: '#767577', true: '#E76F51' }}
 // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
 ios_backgroundColor="#3e3e3e"
 onValueChange={feedSwitch}
 value={usernotif.feedback}
 />
 <Text style={styles.notiftext}>Nous vous rappelerons de remplir votre feedback journalier.</Text>
 
 </View>

 <View style={styles.checkboxQuestion}>
 <Text style={styles.questionTheme}>Rappel Récupération</Text>
 <Switch style={styles.switch}
 trackColor={{ false: '#767577', true: '#E76F51' }}
 // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
 ios_backgroundColor="#3e3e3e"
 onValueChange={recupSwitch}
 value={usernotif.recuperation}
 />
 <Text style={styles.notiftext}>Nous vous rappelerons de faire votre routine journalière.</Text>
 
 </View>
 <TouchableOpacity style={styles.btnmail} onPress={() => handlePressdeco()}>
 <Text style={styles.textmail}>Se deconnecter</Text>
 </TouchableOpacity>
 

 
 </View>
 
 </ScrollView>
 <Modal visible={modalVisible}
 transparent={true}
 animationType="slide"
 >
 <View style={styles.modalcontainer}>
 <View style={styles.modalstyle} >
 <Text style={styles.textmodal}>Votre adresse a bien été modifiée ! 🎉 </Text>
 
 </View>
 </View>
 </Modal>
 <Modal visible={modalVisiblepass}
 transparent={true}
 animationType="slide"
 >
 <View style={styles.modalcontainer}>
 <View style={styles.modalstyle} >
 <Text style={styles.textmodal}>Votre mot de passe a bien été modifié ! 🎉</Text>
 
 </View>
 </View>
 
 </Modal>
 
 
 
 
 
 </View>
 
 
 

 );
}


const styles = StyleSheet.create({
 container:{
 flex: 1,
 alignItems: 'center',
 justifyContent: 'flex-start',
 backgroundColor: '#FEFAF7',
 },
 
 titlePage:{
 marginTop:60,
 fontSize:28,
 color:'#E76F51'
 },

 allQuestions:{
 width:'90%',
 marginTop:50,
 alignItems:'center',
 justifyContent:'center',
 }, 
 titleTheme:{
 color:'#E76F51',
 fontSize:20,
 marginLeft:20,
 },
 slider:{
 flexDirection:'row',
 alignItems:'center',
 justifyContent:'space-around',
 flexWrap:'wrap',
 width:'100%',
 marginTop:10,
 marginRight:20,
 marginBottom:10,
 },

 questionTheme:{
fontSize:16,
color:'black',
marginLeft:20,
marginRight:20,
marginTop:20,
marginBottom:10,
 },

 checkboxQuestion:{
 flexDirection:'row',
 alignItems:'center',
 justifyContent: 'center',
 flexWrap:'wrap',
 width:'100%',
 marginTop:10,
 marginRight:20,
 marginBottom:10,
 },

 checkBoxValid:{
 marginLeft:20,
 },

 checkText:{
 fontSize:14,
 color:'black',
 marginLeft:10,
 },
 

 input:{
 marginLeft:40,
 margin:10,
 width:275,
 height:40,
 borderWidth:1,
 borderColor:'#264653',
 padding:10,
 borderRadius:10,
 },

 btn:{
 alignItems:'center',
 justifyContent:'center',
 marginBottom:30,
 marginTop:30,
 },
 confirmBtn:{
 backgroundColor: '#264653',
 color:'white',
 borderRadius: 30,
 borderWidth: 1,
 padding: 10,
 minWidth:275,
 minHeight:40,
 alignItems:'center',
 justifyContent:'center',
 },

 btnText:{
 color:'white',
 fontSize:20,
 padding:'auto',
 },
 btnmail:{
 backgroundColor: '#264653',
 color:'white',
 borderRadius: 30,
 borderWidth: 1,
 padding: 10,
 minWidth:'50%',
 minHeight:40,
 marginLeft: 30,
 marginTop: 10,
 marginBottom: 20,
 },
 textmail:{
 color:'white',
 textAlign: 'center',

 },
 switch:{
marginRight: 10,
marginTop: 15,
 },
 notif :{
flexDirection: 'row',
 },
notiftext:{
 // fontSize:16,
 color:'black',
 marginLeft:20,
 marginRight:20,
 marginTop:20,
 marginBottom:10,
},
centeredView: {
 flex: 1,
 justifyContent: 'flex-end',
 alignItems: 'center',
 marginTop: 22,
 
},

button: {
 borderRadius: 20,
 padding: 10,
 elevation: 1,
},
buttonOpen: {
 backgroundColor: '#F194FF',
},
buttonClose: {
 backgroundColor: '#2196F3',
},
textStyle: {
 color: 'white',
 fontWeight: 'bold',
 textAlign: 'center',
},
modalcontainer:{
 flex: 1,
 justifyContent: 'flex-end',
 
},
modalstyle:{
 
 backgroundColor: 'white',
 justifyContent:'center',
 alignItems:'center',
 shadowColor: '#000',
 height: 100,
 borderRadius:10,
 shadowOffset: {
 width: 0,
 height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 4,
 elevation: 1,
},

textmodal:{
color: '#008000',
// marginLeft:80,
// marginTop:50 ,

},
buttonNotif:{
 backgroundColor: '#264653',
 width: 200,
 height: 50,
},
btndeco:{
 backgroundColor: '#264653',
 color:'white',
 borderRadius: 10,
 padding: 10,
 minWidth:100,
 minHeight:40,
 marginLeft: 110,
 marginBottom: 20,
},
inputs: {
  //justifyContent: 'center',
  alignItems: 'center',
}
 });