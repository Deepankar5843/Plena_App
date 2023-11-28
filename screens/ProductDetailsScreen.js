import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductContext } from '../ProductContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetailsScreen = () => {
    const { selectedProduct, addToCart, cart } = useProductContext();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);

    if (!selectedProduct) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart();
        
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        
    };

    const handleGoToCart = () => {
        navigation.navigate('CartScreen');
    };

    return (
        <ScrollView>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 4, left: 10, zIndex: 2 }}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4 }}>
                    <Text>{cart.length}</Text>
                    <Ionicons name="cart-outline" size={20} color="blue" style={{ marginLeft: 5 }} onPress={() => navigation.navigate('CartScreen')} />
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 17, marginTop: 10, marginLeft: 10 }}>{selectedProduct.title}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Icon key={index} name={index < selectedProduct.rating ? 'star' : 'star-o'} size={20} color="#FFD700" />
                    ))}
                    <Text style={{ marginLeft: 10 }}>100+ reviews</Text>
                </View>

                {selectedProduct.images && (
                    <FlatList
                        data={selectedProduct.images}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={{ width: 200, height: 200, resizeMode: 'cover', marginBottom: 28, marginRight: 10 }} />
                        )}
                    />
                )}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 28, marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Price: ${selectedProduct.price}</Text>
                    {selectedProduct.discountPercentage && (
                        <Text style={{ marginLeft: 40, fontSize: 11, backgroundColor: "lightgrey", fontWeight: 'bold' }}>{selectedProduct.discountPercentage}%Off</Text>
                    )}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 }}>
                    <TouchableOpacity onPress={handleAddToCart} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginRight: 10, marginLeft: 11 }}>
                        <Ionicons name="cart-outline" size={40} color="blue" style={{ marginRight: 5 }} />
                        <Text style={{ color: 'blue', fontSize: 18 }}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGoToCart} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightblue', padding: 10, borderRadius: 5, marginRight: 11 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                            <Ionicons name="cart-outline" size={40} color="blue" style={{ marginLeft: 4 }} />
                            <Text style={{ color: 'blue', fontSize: 18, marginLeft: 4 }}>Go to Cart</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={toggleFavorite} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isFavorite ? 'red' : 'lightgrey', padding: 10, borderRadius: 5, marginRight: 90, marginLeft: 90, marginBottom: 20 }}>
                    <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'white' : 'black'} style={{ marginRight: 5 }} />
                    <Text style={{ color: isFavorite ? 'white' : 'black', fontSize: 18 }}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
                </TouchableOpacity>

                <ScrollView style={{ flex: 1 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', marginLeft: 11, marginBottom: 7 }}>Details</Text>
                        <Text style={{ marginLeft: 13, color: 'grey' }}>{selectedProduct.description}</Text>
                    </View>
                </ScrollView>

            </View>
        </ScrollView>
    );
};

export default ProductDetailsScreen;

