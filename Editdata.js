import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
    const [nama, setNama] = useState('');
    const [rating, setRating] = useState('');
    const [alamat, setAlamat] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [dataUser , setDataUser ] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedUser , setSelectedUser ] = useState({});

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const refreshPage = () => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const submit = () => {
        const data = {
            Nama: nama,
            Rating: rating,
            Alamat: alamat,
        };
        fetch(`http://10.0.2.2:3000/mahasiswa/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data tersimpan');
                setNama('');
                setRating('');
                setAlamat('');
                refreshPage();
            });
    };

    const selectItem = (item) => {
        setSelectedUser(item);
        setNama(item.Nama);
        setRating(item.Rating);
        setAlamat(item.Alamat);
    };

    return (
        <SafeAreaView>
            <View>
                {isLoading ? (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.cardtitle}>Loading...</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.title}>Edit Data Wisata</Text>
                        <View style={styles.form}>
                            <TextInput style={styles.input} placeholder="Nama" value={nama} onChangeText={setNama} />
                            <TextInput style={styles.input} placeholder="Rating" value={rating} onChangeText={setRating} />
                            <TextInput style={styles.input} placeholder="Alamat" value={alamat} onChangeText={setAlamat} />
                            <TouchableOpacity style={styles.button} onPress={submit}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            <FlatList
                                style={{ marginBottom: 10 }}
                                data={dataUser}
                                onRefresh={refreshPage}
                                refreshing={refresh}
                                keyExtractor={({ id }) => id.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <TouchableOpacity onPress={() => selectItem(item)}>
                                            <View style={styles.card}>
                                                <View style={styles.avatar}>
                                                    <FontAwesomeIcon icon={faUmbrellaBeach} size={50} color="#A63238" />
                                                </View>
                                                <View>
                                                    <Text style={styles.cardtitle}>{item.Nama}</Text>
                                                    <Text>{item.Rating}</Text>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                    <FontAwesomeIcon icon={faPenToSquare} size={20} color="#A63238" />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#A63238',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 12,
        width: '100%',
        marginVertical: 8,
        backgroundColor: 'white',
    },
    button: {
        marginVertical: 15,
        backgroundColor: '#AD852E', // Warna latar belakang tombol
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // Warna teks pada tombol
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#A63238',
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
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7
    },
});
