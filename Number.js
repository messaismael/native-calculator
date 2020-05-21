import React,{useState } from 'react';
import { StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, ImagePropTypes } from 'react-native';
const { height, width } = Dimensions.get( 'window' );
let h= height*70/400

export default function InputNumber(props) {

    return (
            <FlatList
                data={["7", "8", "9", "4", "5", "6", "1", "2", "3", '.', '0', '=']}
            renderItem={( { item } ) => {
                return (   
                    <TouchableOpacity onPress={()=>props.press(item)} style={(item === '=')? styles.equal:styles.button}>
                        <Text style={{fontSize:50, color:'white'}}>{item}</Text>
                    </TouchableOpacity>
                )
                }
            }
            numColumns={3}
            keyExtractor={( item, index ) => index}            
            />
        )
}

const styles = StyleSheet.create({
    button: {
        flex:1,
        padding:5,
        height: h-4,
        backgroundColor: "#696969",
        alignItems: 'center',
        justifyContent: 'center',        
    },
    equal: {
        flex:1,
        padding:5,
        height: h-4,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#2F4F4F'
    }
});
