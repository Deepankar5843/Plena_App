import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BottomTabIcons = ({ navigation }) => {
  const handleTabPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleTabPress('Home')} style={styles.tabButton}>
        <FontAwesome name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Categories')} style={styles.tabButton}>
        <FontAwesome name="th-large" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Favorites')} style={styles.tabButton}>
        <FontAwesome name="heart" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('More')} style={styles.tabButton}>
        <FontAwesome name="ellipsis-h" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end', 
    height: 60,
    position: 'absolute',
    bottom: 0, 
    width: '100%', 
    backgroundColor: 'white', 
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default BottomTabIcons;
