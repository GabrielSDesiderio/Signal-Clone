import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button, Input, Image} from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home");
            }
        })

        return unsubscribe
    }, [navigation])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
    };
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <StatusBar style="light" />
                <Image
                    source= {{
                        uri:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png"
                    }}
                    style={{width: 100, height: 100, borderRadius: 25, }}
                />
                <View style={styles.inputContainer}>
                    <Input placeholder="Email" type='text' value={email} onChangeText={(text) => setEmail(text)}/>
                    <Input placeholder="Password" secureTextEntry type='password' value={password} onChangeText={(text) => setPassword(text)}/>
                </View>

                <Button title='Login' onPress={signIn} containerStyle={styles.button}/>
                <Button title='Register' onPress={() => navigation.navigate("Register")} type="outline" containerStyle={styles.button}/>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        padding: 10
    },
    inputContainer : {
        width: 300
    },
    button:{
        width: 200,
        marginTop: 10,
    }
});