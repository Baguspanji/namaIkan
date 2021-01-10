import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
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
                    onPress={()=> this.props.navigation.navigate('ikan')}
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
