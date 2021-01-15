import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import firebase from '../../config'

export default class detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nama: '',
            asal: '',
            foto: '',
            loading: false,
            id: props.route.params.id
        }
    }

    componentDidMount() {
        this._getData();
    }

    _getData = async () => {
        firebase.database().ref('list/' + this.state.id)
            .on('value', (snapshot) => {
                const tasks = snapshot.val();
                this.setState({
                    nama: tasks.nama,
                    asal: tasks.asal,
                    foto: tasks.foto,
                    loading: true,
                });
                console.log(this.state.nama);
            });
    }

    render() {
        const { nama, asal, foto, loading } = this.state;
        let taskList = "";
        if (loading === false) {
            taskList = (
                <View style={styles.pageKosong}>
                    <Text style={styles.titleKosong}>Memuat...</Text>
                </View>
            );
        } else if (nama.length) {
            taskList = (
                <>
                    <Image
                        style={styles.image}
                        source={{ uri: foto }}
                    />
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.title}>{nama}</Text>
                        </View>
                        <View>
                            <Text style={styles.isi}>{asal}</Text>
                        </View>
                    </View>
                </>
            );
        } else {
            taskList = (
                <View style={styles.pageKosong}>
                    <Text style={styles.kosong}>Data Kosong..!!</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <Text style={{ fontWeight: 'bold', fontSize: 36, color: '#FFF' }}> Nama-nama Hewan </Text>
                </View>
                <View style={styles.body}>
                    {taskList}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#00bfff',

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        marginTop: 10,
        marginBottom: 30,
    },
    pageKosong: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
})
