import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import firebase from '../../config';

function form({ route }) {
    const { tipe, id, data } = route.params;
    const [nama, setNama] = useState('')
    const [asal, setAsal] = useState('')
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
        })
            .then(() => console.log('Data berhasil disimpan'))
            .catch((err) => console.log(err));

        setNama('');
        setAsal('');
    }

    const _update = async () => {
        var postListRef = firebase.database().ref('list/' + id);
        postListRef.update({
            nama: nama,
            asal: asal,
        })
            .then(() => console.log('Data berhasil diubah'))
            .catch((err) => console.log(err));

        setNama('');
        setAsal('');
    }

    return (
        <View style={styles.container}>
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
                <Text style={{ fontWeight: 'bold' }}>{button}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default form;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        marginTop: 10,
        padding: 5
    },
    btn: {
        marginTop: 10,
        width: "80%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon'
    }
})
