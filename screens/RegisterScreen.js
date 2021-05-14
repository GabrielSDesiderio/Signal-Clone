import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import { KeyboardAvoidingView, View, StyleSheet, ScrollView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';

export default function RegisterScreen({navigation}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://thetreeparty.nl/wp-content/uploads/2018/05/avatar-placeholder.png',
            })
        }).catch((error) => { alert (error.message)})
    };


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding'  style={styles.container}>
                <StatusBar style='light'/>
                <Text h3 style={{marginBottom: 50}}>
                    Create a Signal Account
                </Text>

                
                <View style={styles.inputContainer}>
                    <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={(text) => setName(text)}/>
                    <Input placeholder='Email'  type='text' value={email} onChangeText={(text) => setEmail(text)}/>
                    <Input placeholder='Password' type='password' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)}/>
                    <Input placeholder='Profille Picture URL (Optional)'  type='text' value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register}/>
                </View>

                <Button 
                    title='Register'
                    onPress={register}
                    raised
                    containerStyle={styles.button}
                />
                
            </KeyboardAvoidingView>
        </ScrollView>
        )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
        backgroundColor: "white"
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})