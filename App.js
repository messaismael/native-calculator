import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import InputNumber from './Number';
import Operation from './Operation';

const { width } = Dimensions.get( 'window' );
let w = width / ( 500 / 55 );
let b = width / ( 500 / 36 );

export default function App() {
  const [calcul,
    setCalcul] = useState('0');
  const [result,
    setResult] = useState('');
  const [font,
    setFont] = useState(w);

  const onpress = (a) => {
    const comma = /(\d{1,}[.]\d{1,})$|([.])$/; // example 45.41 or  4852. at the end
    // decrease fontsize when length of calcul increase
    if (calcul.length >= 16) {
      setFont(pres => b)
    } else {
      setFont(pres => w)
    }

    if (calcul === '0') {
      if (a == '.') {
        setCalcul((prev) => '0' + a);
      } else {
        setCalcul((prev) => a);
      }
    } else if (a === '.' && calcul.length < 24) {
      // verified if this statement in false
      if (!comma.test(calcul)) {
        setCalcul((prev) => prev + a);
      }
    } else if ( a === '=' ) {
        let result = calcul.replace(/x/g, '*'); // replace 'x' by '*'
        result = result.replace( /÷/g, '/' ); // replace '÷' by '/'
        result =  result.replace(/[-/*+]$/, '')
        setCalcul( ( prev ) => prev.replace(/[-x÷+]$/, '') ); // move all sign at the end
        setResult((prev) => String(eval(result))) // use eval() to display result
    } else {
        let r = calcul.replace(/^[÷x]/, '');
        if (calcul.length < 24 ) {
          setCalcul((prev) => r + a);
        }else if ( result === '' ) { 
          setCalcul((prev) => prev);
        }else {
        setCalcul((prev) => a);
        setResult((prev) => '');
      }
    }
  };

  const operate = (op) => {
    let add = /([.+]{1,})$|([+÷x-]{2})$/;
    let less = /([.-]{1,})$|([+÷x-]{2})$/;
    let multiply = /([+÷-]{1,})$/;
    let division = /([+x-]{1,})$/;

    // decrease fontsize when length of calcul increase
     if (calcul.length >= 16) {
      setFont(pres => b)
    } else {
      setFont(pres => w)
    }

    if (op === '←') {
      // test if "calcul" is defferent to '0'
      if (calcul !== '0') {
        let arr = calcul.split('');
        arr.splice(arr.length - 1, 1);
        if (result !== '') {
          setCalcul((prev) => '0');
          setResult((prev) => '');
        } else {
          // test if the 'arr.join()' is different to "''"
          setCalcul((prev) => arr.join('') !== ''
            ? arr.join('')
            : '0');
        }
      } else {
        setCalcul((prev) => prev);
      }
    } else if (op === '+') {
      // verified if "result" is empty
      if (!result) {
        if (!add.test(calcul)) 
          setCalcul((prev) => prev + op);
        }
      else {
        setCalcul((prev) => result + op);
        setResult((prev) => '');
      }
    } else if (op === '-' && calcul.length < 24) {
      if (!result) {
        if (!less.test(calcul)) 
          setCalcul((prev) => prev + op);
        }
      else {
        setCalcul((prev) => result + op);
        setResult((prev) => '');
      }
    } else if ( op === 'x' && calcul.length < 24 ) {
      if ( !result ) {
        if ( multiply.test( calcul ) || /x$/.test( calcul ) ) {
          let result = calcul.replace( multiply, 'x' );
          result = result.replace( /x$/, 'x' );
          setCalcul( ( prev ) => result );
        } else {
          setCalcul( ( prev ) => prev + op );
        }
      }else { 
        setCalcul( ( prev ) => result+op );
        setResult( ( prev ) => '' );
      }
    } else if ( op === '÷' && calcul.length < 24 ) {
      if ( !result ) {
        if ( division.test( calcul ) || /÷$/.test( calcul ) ) {
          let result = calcul.replace( division, '÷' );
          setCalcul( ( prev ) => result );
        } else {
          setCalcul( ( prev ) => prev + op );
        }
      }else { 
        setCalcul( ( prev ) => result+op );
        setResult( ( prev ) => '' );
      }
    }/* else {
      setCalcul((prev) => prev + op);
    }*/
  };

  return (
    <View style={styles.all}>
      <View style={styles.display}>
        <Text
          style={{
          fontSize: font,
          textAlign: 'right',
          height: '50%'
        }}>{calcul}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.number}>
          <InputNumber press={onpress}/>
        </View>
        <View style={styles.operation}>
          <Operation operate={operate}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  all: {
    paddingTop: 22,
    flex: 1,
    backgroundColor: 'orange'
  },
  container: {
    flexDirection: 'row',
    height: '70%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    flex: 3
  },
  operation: {
    flex: 1
  },
  display: {
    height: '30%',
    backgroundColor:'white'
  },
  result: {
    fontSize: 35,
    height: '40%',
    textAlign: 'right'
  }
});
