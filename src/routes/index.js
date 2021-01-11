import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Beranda, Ikan, IkanTambah } from '../screens'

const Stack = createStackNavigator();

function Routes() {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="ikan"
                    component={Ikan}
                    options={({ navigation: { navigate } }) => ({
                        title: 'Nama Hewan',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigate('ikanAdd', {
                                    tipe: 'add',
                                })}
                                style={{ padding: 10, justifyContent: 'flex-end' }}
                            >
                                <Ionicons name="md-add-circle" size={40} color="skyblue" />
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })}
                />
                <Stack.Screen
                    name="ikanAdd"
                    component={IkanTambah}
                    options={{
                        title: 'Tambah daftar Hewan',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="beranda"
                    component={Beranda}
                    options={{ title: 'Beranda' }}
                />
            </Stack.Navigator>
        </>
    );
}

export default Routes;