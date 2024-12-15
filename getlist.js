import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';


export const getlist = () => {
  const jsonUrl =
    'https://script.google.com/macros/s/AKfycbybjFW0fLBxJQwIeHZTCpNmTSr7K8vth6IvvOvNQVmYYT0La6Sxm49GHCmU1NefDZUS/exec';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function refreshPage() {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={dataUser}
            onRefresh={() => {
              refreshPage();
            }}
            refreshing={refresh}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardtitle}>{item.nama}</Text>
                  <Text>{item.rating}</Text>
                  <Text>{item.kategori}</Text>
                  <Text>{item.latitude + ', ' + item.longitude}</Text>
                  <Text>{item.deskripsi}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
export default getlist
const styles = StyleSheet.create({
  title: {
    paddingVertical: 15,
    backgroundColor: '#333',
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
    fontSize: 12,
    fontWeight: 'bold',
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
})

