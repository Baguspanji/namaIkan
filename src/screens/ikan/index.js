import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import firebase from '../../config';
import Item from '../../components/item'

export default class ikan extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            loading: false

        }
    }

    componentDidMount() {
        this._getData();
    }

    _getData = async () => {
        firebase.database().ref('list/').on('value', (snapshot) => {
            const tasks = [];
            snapshot.forEach((shot) => {
                tasks.push({ ...shot.val(), key: shot.key });
            });
            // console.log(tasks);
            this.setState({
                data: tasks,
                loading: true,
            });
        });
    }

    renderItem = ({ item }) => (
        <Item
            nama={item.nama}
            asal={item.asal}
            foto={item.foto}
            id={item.key}
            nav={this.props.navigation}
        />
    );

    render() {
        const { data, loading } = this.state;
        let taskList = "";
        if (loading === false) {
            taskList = (
                <View style={styles.pageKosong}>
                    <Text style={styles.titleKosong}>Memuat...</Text>
                </View>
            );
        } else if (data.length) {
            taskList = (
                <>
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.key}
                    />
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
                    <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#FFF' }}> Nama-nama Hewan </Text>
                </View>
                <SafeAreaView style={styles.body}>
                    {taskList}
                </SafeAreaView>
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
        marginTop: 10
    },
    pageKosong: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})
