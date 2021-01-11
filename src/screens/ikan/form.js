import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import firebase from '../../config';

function form({ route, navigation }) {
    const { tipe, id, data } = route.params;
    const [nama, setNama] = useState('')
    const [asal, setAsal] = useState('')
    const [foto, setFoto] = useState('')
    const [button, setButton] = useState('')

    const _proses = () => {
        if (tipe === 'add') {
            _simpan()
        } else (
            _update()
        )
    }

    useEffect(() => {
        if (tipe === 'edit') {
            setNama(data.nama);
            setAsal(data.asal);
            setFoto(data.foto);
            setButton('Update')
        } else {
            setButton('Simpan')
        }
    }, [])

    const _simpan = async () => {
        var postListRef = firebase.database().ref('list');
        var newPostRef = postListRef.push();
        newPostRef.set({
            nama: nama,
            asal: asal,
            foto: foto,
        })
            .then(() => console.log('Data berhasil disimpan'))
            .catch((err) => console.log(err));

            Alert.alert(
                "Berhasil",
                "Data berhasil disimpan",
            );

        setNama('');
        setAsal('');
        setFoto('');
    }

    const _update = async () => {
        var postListRef = firebase.database().ref('list/' + id);
        postListRef.update({
            nama: nama,
            asal: asal,
            foto: foto,
        })
            .then(() => console.log('Data berhasil diubah'))
            .catch((err) => console.log(err));

        navigation.navigate('ikan');
        Alert.alert(
            "Berhasil",
            "Data berhasil diubah",
        );

    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setFoto(text)}
                value={foto}
                placeholder="Masukkan url Foto"
                style={styles.input}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setNama(text)}
                value={nama}
                placeholder="Masukkan Nama"
                style={styles.input}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setAsal(text)}
                value={asal}
                placeholder="Masukkan Asal"
                style={styles.input}
            />
            <TouchableOpacity
                onPress={() => _proses()}
                style={styles.btn}
            >
                <Text style={{ fontWeight: 'bold', color: '#FFF' }}>{button}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default form;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#00bfff',
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        padding: 5,
        backgroundColor: '#FFF'
    },
    btn: {
        marginTop: 10,
        width: "80%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon',
        borderRadius: 10,
        borderWidth: 1,
    }
})
