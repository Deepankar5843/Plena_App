import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useProductContext } from '../ProductContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartScreen = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useProductContext();
    const [editMode, setEditMode] = useState(false);
    const [removedProduct, setRemovedProduct] = useState(null);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const slideAnimation = new Animated.Value(0);

    useEffect(() => {
        if (isFocused && removedProduct) {
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start(() => {
                setRemovedProduct(null);
                slideAnimation.setValue(0);
            });
        }
    }, [isFocused, removedProduct]);

    const handleEditPress = () => {
        setEditMode(!editMode);
        console.log('Edit button pressed!');
    };

    const handleRemoveItem = (itemId) => {
        const removedItem = cart.find((item) => item.id === itemId);
        setRemovedProduct(removedItem);
        removeFromCart(itemId);
    };

    const handleButtonPress = () => {
        console.log('Button pressed!');
    };

    
    const truncateText = (text, maxLength=22) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <View>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 4, left: 20, zIndex: 2 }}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>



            <Text style={{ marginLeft: 30, fontWeight: 'bold', marginBottom: 18, marginTop: 40 }}>Cart Items: {cart.length}</Text>

            {cart.map((item) => (
                <Animated.View
                    key={item.id}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        transform: [
                            {
                                translateX: slideAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -500], 
                                }),
                            },
                        ],
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item.thumbnail && (
                            <Image source={{ uri: item.thumbnail }} style={{ width: 40, height: 40, borderRadius: 15, marginRight: 10, marginLeft: 17 }} />
                        )}
                        <Text>{truncateText(item.title)}</Text>
                       
                    </View>

                    {editMode && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={{ padding: 5 }}>
                                <Text>-</Text>
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={{ padding: 5 }}>
                                <Text>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={{ marginLeft: 10 }}>
                                <Text style={{ color: 'red' }}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>
            ))}
            <TouchableOpacity onPress={handleEditPress} style={{ paddingVertical: 7, paddingHorizontal: 4, borderRadius: 3, marginLeft: 'auto', marginRight: 20, marginTop: 17, borderRadius: 10 }}>
                <Text style={{ color: 'black', fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>{editMode ? 'Done Editing' : 'Edit'}</Text>
            </TouchableOpacity>

            <View style={{ marginVertical: 10, paddingTop: 10, marginLeft: 10, marginTop: 40, width: 320, height: 173, backgroundColor: 'lightgrey', borderRadius: 16, marginLeft: 27 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
                    <Text style={{ marginLeft: 12, marginRight: 188 }}>Sub Total:</Text>
                    <Text>${calculateTotalPrice(cart)}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
                    <Text style={{ marginLeft: 12, marginRight: 194 }}>Delivery: </Text>
                    <Text>$2</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
                    <Text style={{ marginLeft: 12, marginRight: 208 }}>Total : </Text>
                    <Text>${calculateTotalPrice(cart) + 2}</Text>
                </View>

                <TouchableOpacity onPress={handleButtonPress} style={{ backgroundColor: 'blue', paddingVertical: 10, paddingHorizontal: 17, borderRadius: 5, marginLeft: 10, marginRight: 20, marginTop: 17, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Proceed To Checkout</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default CartScreen;
