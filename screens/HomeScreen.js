import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../ProductContext';
import BottomTabIcons from '../Tab/BottomTabIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const { selectProduct, cart } = useProductContext();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleCardPress = (product) => {
        selectProduct(product);
        navigation.navigate('ProductDetails');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
                console.log("hh")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    const items = [
        { id: 1, title: 'Get', offer: '30% OFF', price: 50, order: 'On first 03 order' },
        { id: 2, title: 'Get', offer: '40% OFF', price: 80, order: 'On first 04 order' },
        { id: 3, title: 'Get', offer: '20% OFF', price: 120, order: 'On first 02 order' },
    ];

    const handleIconClick = (productId) => {

        setFavoriteProducts((prevFavorites) => {
            if (prevFavorites.includes(productId)) {

                return prevFavorites.filter((id) => id !== productId);
            } else {

                return [...prevFavorites, productId];
            }
        });
    };

    const handleSearchTextChange = (text) => {

        setSearchText(text);

    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.48, backgroundColor: 'rgba(42, 75, 160, 1)', borderRadius: 14, padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10, marginBottom: 28 }}>
                    <Text style={{ marginRight: 190, color: 'white', fontWeight: 'bold', fontSize: 17 }}>Hey, Deepankar</Text>
                    <Text style={{ color: "white" }}>{cart.length}</Text>
                    <Ionicons name="cart-outline" size={20} color="white" style={{ marginLeft: 2 }} onPress={() => navigation.navigate('CartScreen')} />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 0, height: 56, borderRadius: 88, backgroundColor: 'grey', marginVertical: 4 }}>
                    <TextInput
                        placeholder="Search..."
                        style={{
                            flex: 1,
                            height: '100%',
                            borderColor: 'gray',
                            borderWidth: 1,
                            padding: 10,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 28,
                            borderBottomLeftRadius: 28,

                        }}
                        onChangeText={handleSearchTextChange}
                        value={searchText}
                    />
                    <TouchableOpacity
                        style={{
                            height: '100%',
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                            backgroundColor: 'grey',
                            borderTopRightRadius: 28,
                            borderBottomRightRadius: 28,
                        }}
                        onPress={() => { }}
                    >
                        <Text style={{ color: 'white' }}>Search</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ color: 'lightgrey', marginTop: 40, marginLeft: 1 }}>Delivery To</Text>
                    <Text style={{ color: 'lightgrey', marginTop: 40, marginLeft: 220 }}>Within</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ color: 'white', marginLeft: 1 }}>Greater Noida, Alpha-1</Text>
                    <Text style={{ color: 'white', marginLeft: 149 }}>2 Hour </Text>
                </View>
            </View>

            <ScrollView style={{ flex: 0.75 }}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <ScrollView horizontal>
                            {items.slice(0, 3).map((item) => (
                                <ImageBackground
                                    key={item.id}
                                    style={{
                                        width: 200,
                                        height: 123,
                                        borderRadius: 16,
                                        marginRight: 10,
                                        overflow: 'hidden',
                                        backgroundColor: 'darkorange',
                                    }}
                                >
                                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: 10, flex: 1, justifyContent: 'flex-end' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Get</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>

                                            <Ionicons name="md-pricetag" size={16} color="red" style={{ marginRight: 5 }} />

                                            <Text style={{ color: 'red', fontWeight: 'bold' }}>{truncateText(item.offer)}</Text>
                                        </View>

                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{truncateText(item.order)}</Text>

                                        <Text style={{ fontWeight: 'bold' }}>Price: ${item.price}</Text>


                                    </View>
                                </ImageBackground>
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Recommended</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', zIndex: -3 }}>
                    {products.map(product => (
                        <View key={product.id} style={{ width: '47%', height: 200, borderRadius: 16, backgroundColor: `#d3d3d3`, marginBottom: 20 }}>
                            <TouchableOpacity key={product.id} onPress={() => handleCardPress(product)}>
                                <Image source={{ uri: product.thumbnail }} style={{ width: '100%', height: '70%', borderRadius: 16 }} />

                                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                                    <TouchableOpacity onPress={() => handleIconClick(product.id)}>
                                        <Icon name="heart" size={20} color={favoriteProducts.includes(product.id) ? 'red' : 'white'} />
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Price: ${product.price}</Text>
                                    <Text numberOfLines={1} ellipsizeMode='tail'>{product.title}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <BottomTabIcons navigation={navigation} />
        </View>
    );
};

export default HomeScreen;





