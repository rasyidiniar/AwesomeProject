// XProfile.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const XProfile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Profil Peng guna</Text>
                <Text style={styles.info}>Nama: Rasyidini Ayu Rahmawati</Text>
                <Text style={styles.info}>NIM: 22/499856/SV/21374</Text>
                <Text style={styles.info}>Program Studi: D4 Sistem Informasi Geografis</Text>
                <Text style={styles.info}>Kelas: B</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default XProfile;