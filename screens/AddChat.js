import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'

const AddChat = ({navigation}) => {
    const [input, setInput] = useState('')

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error))
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: 'Chats',
        });
    }, [navigation]);
    
    
    
    return (
        <View>
            <Input placeholder='Enter a Chat Name' value={input} onChangeText={(text) => setInput(text)} leftIcon={
                <Icon name='wechat' type='antdesign' size={24} color='black' />
            }/>
            <Button onPress={createChat} title='Create New Chat' />
        </View>
    )
}

export default AddChat
