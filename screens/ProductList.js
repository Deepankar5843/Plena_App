import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 
    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap' }}>
                {products.map(product => (
                    <View key={product.id} style={{ width: '47%', height: 200, borderRadius: 16, backgroundColor: 'lightgreen', marginBottom: 20 }}>
                        <Image source={{ uri: product.thumbnail }} style={{ width: '100%', height: '70%', borderRadius: 16 }} />
                        <View style={{ padding: 10 }}>
                            <Text>{product.title}</Text>
                            <Text>{product.description}</Text>
                            <Text>Price: ${product.price}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default ProductList;
