import React,{ Component, useState } from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import InputNumber from './Number'
import Operation from './Operation'

const {height, width} = Dimensions.get('window');

export default function App() {
  const [calcul, setCalcul] = useState( '0' )

  const onpress = ( a ) => {
    const comma = /(\d{1,}[.]\d{1,})|([.]$)$/;
    if ( calcul === '0' ) {
      if ( a == '.' ) {
        setCalcul( prev => '0' + a )  
      }
      else {
        setCalcul( prev => a )  
      }
    }
    else if ( a === '.' ) {
      if ( !comma.test( calcul ) ) {
        setCalcul( prev => prev+a)
      }
    }
    else if ( a === '=' ) {
      let result = calcul.replace(/x/g, '*')
      result     = result.replace(/÷/g, '/')
      setCalcul( prev => String(eval(result)))  
    }
    else {
      let r = calcul.replace(/^[÷x]/, '')
      setCalcul( prev => r+a )
    }
  }

  const operate = ( op ) => {
    let add      = /([.+]{1,})$|([+÷x-]{2})$/;
    let less     = /([.-]{1,})$|([+÷x-]{2})$/;
    let multiply = /([+÷-]{1,})$/;
    let division = /([+x-]{1,})$/;
    // clear calculator
    if ( op === '←' ) {
      let arr = calcul.split( "" )
      arr.splice( arr.length - 1, 1 );
      setCalcul( prev => arr.join(''))
    }
    else if ( op === '+' ) {
      if(!add.test(calcul) )
        setCalcul( prev => prev+op)  
    }
    else if ( op === '-' ) {
      if(!less.test(calcul) )
        setCalcul( prev => prev+op)  
    }
    else if ( op === 'x' ) {
      if (multiply.test( calcul )|| /x$/.test( calcul ) ) {
        let result = calcul.replace( multiply, 'x' )
        result= result.replace(/x$/,'x');
        setCalcul( prev => result)
      }
      else {
        setCalcul( prev => prev + op)
    }
    }
    else if ( op === '÷' ) {
      if (division.test( calcul) || /÷$/.test( calcul ) ) {
        let result = calcul.replace(division,'÷');
        setCalcul( prev => result)
      }
      else {
        setCalcul( prev => prev + op)
    }
    }
    else {
      setCalcul( prev => prev + op)
    }
  }

  return (
    <View style={styles.all}>
      <View style={styles.display} >
        <Text>{calcul}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.number}>
          <InputNumber press={onpress} />
        </View>
        <View style={styles.operation}>
          <Operation operate={operate}/>
        </View>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create( {
  all: {
    paddingTop: 22,
    flex: 1,
    backgroundColor: 'orange',
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    height:'70%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems:'center'
  },
  number: {
    flex: 3
  },
  operation: {
    flex:1
  }, 
  display: {
    height:'30%'
  }
});
