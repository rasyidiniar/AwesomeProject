import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
    const [isLoading, setLoading] = useState(true);
    const [dataLocations, setDataLocations] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataLocations(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataLocations(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    function deleteData(id) {
        fetch(jsonUrl + '/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data terhapus');
                refreshPage();
            });
    }

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Daftar Data Wisata</Text>

                {isLoading ? (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.cardtitle}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        style={{ marginBottom: 0 }}
                        data={dataLocations}
                        onRefresh={() => refreshPage()}
                        refreshing={refresh}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity>
                                    <View style={styles.card}>
                                        <View style={styles.avatar}>
                                            <Image
                                                source={require('./assets/logo.jpg')} // Update the path to your logo
                                                style={{ width: 50, height: 50 }} // Adjust size as needed
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.cardtitle}>{item.Nama}</Text>
                                            <Text>Rating: {item.Rating}</Text>
                                            <Text>{item['Jam Buka']}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <FontAwesomeIcon icon={faChevronRight} size={20} />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.form}>
                                    <Button
                                        title="Hapus"
                                        onPress={() =>
                                            Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                                                { text: 'Tidak', onPress: () => console.log('button tidak') },
                                                { text: 'Ya', onPress: () => deleteData(item.id) },
                                            ])
                                        }
                                        color={'#AD852E'}
                                    />
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Listdata;

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#A63238',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#AD852E',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7,
    },
    form: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
    },
});
