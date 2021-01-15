import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config';

const Item = ({ nama, asal, foto, id, nav }) => (
    <TouchableOpacity onPress={() => _detail({ id, nav })} style={styles.container}>
        <Image
            style={styles.image}
            source={{ uri: foto }}
        />
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{nama}</Text>
                <Text style={styles.isi}>{asal}</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => _update({ id, nama, asal, foto, nav })}>
                    <Ionicons name="md-create" size={30} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _remove({ id })}>
                    <Ionicons name="md-trash" size={30} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
);

const _remove = async ({ id }) => {
    firebase.database().ref('list/' + id)
        .remove().then(() => console.log('Berhasil Hapus!'));
}

const _update = async ({ id, nama, asal, foto, nav }) => {

    var data = {
        nama: nama,
        asal: asal,
        foto: foto
    }

    nav.navigate('ikanAdd', {
        tipe: 'edit',
        id: id,
        data: data
    })
}

const _detail = ({ id, nav }) => {
    nav.navigate('ikanDetail', {
        id: id
    })
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'skyblue',
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 32,
    },
    isi: {
        fontSize: 22,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#0080c0'
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

export default Item
