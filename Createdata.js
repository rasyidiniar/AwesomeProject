import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
    const [nama, setNama] = useState('');
    const [rating, setRating] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jamBuka, setJamBuka] = useState('');

    const submit = () => {
        const data = {
            Nama: nama,
            Rating: rating,
            Alamat: alamat,
            Jam_Buka: jamBuka,
        };
        fetch(jsonUrl, {
            method: 'POST',
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
                setJamBuka('');
            })
            .catch((error) => {
                console.error(error);
                alert('Terjadi kesalahan saat menyimpan data');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Tambah Data Wisata</Text>
                <ScrollView style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nama"
                        value={nama}
                        onChangeText={setNama}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rating"
                        value={rating}
                        onChangeText={setRating}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Alamat"
                        value={alamat}
                        onChangeText={setAlamat}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Jam Buka"
                        value={jamBuka}
                        onChangeText={setJamBuka}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={submit}
                    >
                        <Text style={styles.buttonText}>Simpan</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    container: {
        flex: 1, // Menjamin container mengisi seluruh layar
        backgroundColor: '#EBEBEB', // Mengatur latar belakang seluruh layar
    },
    title: {
        paddingVertical: 12,
        backgroundColor: '#A63238',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 20,
        marginBottom: 100, // Memberikan jarak pada bagian bawah untuk menghindari tab bar atau border
        backgroundColor: '#EBEBEB', // Latar belakang form sama dengan halaman
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
        marginVertical: 20, // Jarak vertikal tombol (atas dan bawah)
        backgroundColor: '#AD852E',  // Warna latar belakang tombol
        paddingVertical: 10, // Menambah padding vertikal agar tombol lebih besar
        borderRadius: 5, // Menambahkan sudut tumpul pada tombol
        alignItems: 'center', // Menyusun teks tombol di tengah
    },
    buttonText: {
        color: 'white',  // Warna teks tombol
        fontWeight: 'bold',  // Menebalkan teks
        fontSize: 16,  // Ukuran font tombol
    }
});
