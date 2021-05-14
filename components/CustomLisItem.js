import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {ListItem, Avatar} from 'react-native-elements'
import { db } from '../firebase';

export function CustomLisItem ({id, chatName, enterChat}) {
    const [chatMessages, serChatMessages] = useState([])
    
    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => serChatMessages(snapshot.docs.map(
            (doc) => doc.data()
        )))
        return unsubscribe
    })
    
    return (
            <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
                <Avatar 
                    rounded
                    source={{
                        uri: chatMessages?.[0]?.photoURL || 'https://thetreeparty.nl/wp-content/uploads/2018/05/avatar-placeholder.png'
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: 'bold'}}>
                        {chatName}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                        {chatMessages?.[0]?.displatName}: {chatMessages?.[0]?.message}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }


export default CustomLisItem

