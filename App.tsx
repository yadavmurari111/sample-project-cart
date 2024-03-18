import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {cartItemData, icons} from "./src/constants";
import {Dropdown} from "react-native-element-dropdown";


const Card = ({ item ,setPriceTotal}) => {
    const sizeData = [
        { label: 'Item 1', value: 'S' },
        { label: 'Item 2', value: 'M' },
        { label: 'Item 3', value: 'L' },
        { label: 'Item 4', value: 'XL' },
        { label: 'Item 5', value: 'XXL' },
        { label: 'Item 6', value: 'XXL' },
    ];
    const QtyData = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
        { label: 'Item 9', value: '9' },
    ];
    const [size, setSize] = useState(sizeData[0].value);
    const [quantity, setQuantity] = useState(QtyData[0].value);

    useEffect(() => {
        const val = item.price * Number(quantity)
        setPriceTotal(val)
    }, [quantity]);


    return(
        <View style={{flex:1,padding: 10,marginTop:10,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',flex:1}}>
                <Image style={{width: 90,aspectRatio: 1}} source={{uri: item.img}}/>
                <View style={{borderWidth:0, flex:1}}>
                    <Text style={{color:'black',fontSize:15}}>{item.itemName}</Text>

                    <View style={{flex:1,flexDirection:'row', marginTop:8}}>
                        <View style={{borderWidth:1,justifyContent:'center',alignItems:'center',padding:3,flexDirection:'row',width:'45%',borderRadius:8,borderColor:'grey'}}>
                            <Text style={{color:'black',fontSize:13,fontWeight:'700'}}>Size:</Text>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={sizeData}
                                maxHeight={300}
                                labelField="value"
                                valueField="value"
                                placeholder={'S'}
                                value={size}
                                onChange={item => {
                                    setSize(item.value);
                                }}
                            />
                        </View>
                        <View style={{borderWidth:1,justifyContent:'center',alignItems:'center',padding:3,flexDirection:'row',width:'45%',borderRadius:8,marginLeft:5,borderColor:'grey'}}>
                            <Text style={{color:'black',fontSize:13,fontWeight:'700'}}>Qty: </Text>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={QtyData}
                                maxHeight={300}
                                labelField="value"
                                valueField="value"
                                placeholder={1}
                                value={quantity}
                                onChange={item => {
                                    setQuantity(item.value)
                                }}
                            />
                        </View>
                    </View>

                    <Text>{'Sold by : '+item.soldBy}</Text>
                    <Text style={{color:'purple',fontSize:16,fontWeight:'700'}}>{"£ "+item.price}<Text style={{color:'grey',fontSize:14}}>   8̶1̶.7̶0̶  50% off</Text></Text>
                    <Text>{item.delivery}</Text>
                </View>

            </View>
            <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity style={{borderWidth:1,alignItems:'center',borderColor:'purple',width:'40%',paddingVertical:8,borderRadius:8}}><Text style={{color:'purple',fontSize:16,fontWeight:'700'}}>Remove</Text></TouchableOpacity>
                <TouchableOpacity style={{borderWidth:1,alignItems:'center',borderColor:'purple',width:'40%',paddingVertical:8,borderRadius:8}}><Text style={{color:'purple',fontSize:16,fontWeight:'700'}}>Save for later</Text></TouchableOpacity>
            </View>

        </View>
    )
};

function App(): React.JSX.Element {
    const backgroundStyle = {
        flex: 1,
        backgroundColor: 'lightgrey',
    };

    const [priceTotal,setPriceTotal] = useState([]);
   const sum = priceTotal.reduce((partialSum, a) => partialSum + a, 0);

    const replaceValueAtIndex = (index, newValue) => {
        // Make a copy of the array
        const newData = [...priceTotal];
        // Replace the value at the specified index
        newData[index] = newValue;
        // Update the state with the modified array
        setPriceTotal(newData);
    };


    const renderItems= ({item,index})=> {
        return(
            <Card item={item} setPriceTotal={(val)=> {
                console.log('price',val)
                replaceValueAtIndex(index,val)
                // setPriceTotal(val+priceTotal)
            }} />
        )
    }


    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={{padding: 0, marginTop: 10}}>
                <View style={{padding: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 30, aspectRatio: 1}} source={{uri: icons.back}}/>
                    <Text style={{fontWeight: '700', fontSize: 20, color: 'black', marginLeft: 12}}>My cart</Text>
                    <View>
                        <View style={{
                            backgroundColor: 'purple',
                            padding: 10,
                            borderRadius: 7,
                            marginLeft: '27%',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white', fontWeight: '700'}}>PLACE ORDER</Text>
                        </View>
                    </View>
                </View>

                <View style={{padding: 10,marginTop:10,backgroundColor:'white'}}>
                  <Text> Deliver to: <Text style={{fontWeight:'700',color:'black'}}>Alrina sharra, 23924765</Text></Text>
                  <Text> 83 childiltern Street , London W1U 6NF</Text>
                </View>

              <View style={{padding: 10,marginTop:10}}>
                <Text style={{fontWeight:'700',color:'black',fontSize:16}}>My cart(2/2)</Text>

                <View style={{padding: 10,marginTop:10,backgroundColor:'white',borderRadius:8}}>
                  <Text style={{fontWeight:'700',color:'black'}}> SubTotal <Text style={{fontWeight:'700',color:'purple'}}>{sum.toFixed(2)}</Text></Text>
                  <Text> 2 items selected for order</Text>
                </View>

                <FlatList data={cartItemData} renderItem={renderItems}/>

                <Text style={{fontWeight:'700',color:'black',fontSize:16,marginTop:10}}>Product related to cart</Text>


              </View>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 30,
        width:70,
        borderColor: 'gray',
        //borderWidth: 0.8,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        // position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight:'700',
        color:'black'
    },
    selectedTextStyle: {
        fontSize: 14,
        fontWeight:'700',
        color:'black'
    },


});

export default App;
