import React,{ useState } from 'react';
import { StyleSheet, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get( 'window' );
let h = height * 70 / 500;

export default function Operation(props) {
    return (
        <FlatList
            data={['←', 'x', '÷', '-', '+']}
            renderItem={( { item } ) => {
                return (
                     <TouchableOpacity style={styles.operation} onPress={()=>props.operate(item)}>
                        <Text style={{fontSize:40}}>{item}</Text>
                    </TouchableOpacity>)
            }}
            numColumns={1}
        />
    )
}

const styles = StyleSheet.create( {
    operation: {
        height: h-3,
        backgroundColor: "#D3D3D3",
        alignItems: 'center',
        justifyContent: 'center'
    }
})