import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const fetchPosts = async () => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const usePosts = () => useQuery('posts', fetchPosts);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  );
}
const Posts = () => {
  const {data, isLoading, isSuccess} = usePosts();
  return (
    <View style={styles.container}>
      {isLoading && (
        <React.Fragment>
          <Text>Loading...</Text>
        </React.Fragment>
      )}

      {isSuccess && (
        <React.Fragment>
          <Text style={styles.header}>all posts</Text>
          <FlatList
            data={data}
            style={styles.wrapper}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => console.log('pressed')}
                style={styles.post}>
                <View style={styles.item}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000',
    paddingVertical: 10,
  },
  post: {
    backgroundColor: '#dcdcdc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  postTitle: {color: '#000', textTransform: 'capitalize'},
});
