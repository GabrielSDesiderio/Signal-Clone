import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet   } from 'react-native'
import { Avatar  } from 'react-native-elements'
import { AntDesign, SimpleLineIcons} from '@expo/vector-icons'

import { CustomLisItem } from '../components/CustomLisItem'
import { auth, db } from '../firebase'


const HomeScreen = ({navigation}) => {
    
    const [chats, serChats] = useState([])
    
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }
    
    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            serChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe
    }, [])
    
    useLayoutEffect(() =>{
        navigation.setOptions({
            title: 'Signal',
            headerStyle: {backgroundColor: '#2C6BED',},
            headerTitleStyle: {color: 'white', alignSelf: 'center' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{marginLeft: 10}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row' , justifyContent: 'space-between', width: 60, marginRight: 10}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color='white'/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])
    
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName
        })
    }
    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: {chatName}}) => (
                    <CustomLisItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {height: '100%'}
})