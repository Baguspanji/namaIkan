import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import * as GoogleSignIn from 'expo-google-sign-in';
export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.initAsync();
    }

    initAsync = async () => {
        try {
            await GoogleSignIn.initAsync({
              // You may ommit the clientId when the firebase `googleServicesFile` is configured
              clientId: '<YOUR_IOS_CLIENT_ID>',
              // Provide other custom options...
            });
          } catch ({ message }) {
            alert('GoogleSignIn.initAsync(): ' + message);
          }
        this._syncUserWithStateAsync();
    };


    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({ user });
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    _signin() {
        if (this.state.user) {
            this.signOutAsync();
        } else {
            this.signInAsync();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontWeight: 'bold', fontSize: 26 }}> Peringatan!! </Text>
                </View>
                <View style={styles.body}>
                    <Text>Tolong pastikan mengubah isi dari file config/index.js
                    karena file berisi konfigurasi firebase, anda harus memastikan
                            bahwa anda menggunakan konfigurasi firebase anda sendiri!! </Text>
                </View>
                <Button
                    title='List Data'
                    onPress={() => this.props.navigation.navigate('ikan')}
                />
                <View style={{ marginTop: 10 }} />
                <Button
                    title='SignIn'
                    onPress={() => this._signin()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        marginTop: 10,
        marginBottom: 10
    }
})
