import * as React from 'react';
import {
  Switch,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import CalcBtn from './Button.component';
import { numberBtn, hexBtn } from './button.values';
import colors from './button.colors';
import { convertToHex, convertFromHex } from './utility';

const initState = {
  result: 0,
  allOperations: [],
  currentNumber: 0,
  hex: false // HEX, false is for DEC
};


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initState
    }
  }

  switchHandler = (val) => {
    this.setState({
      hex: val,
      currentNumber: 0
    });
  };

  setCurrentNumber = (val) => {
    const { allOperations, currentNumber: _currNumber, hex } = this.state;
    let currentNumber = _currNumber ? _currNumber : '';
    let inputNumber = `${currentNumber}${val}`;
    inputNumber = hex ? convertFromHex(inputNumber) : inputNumber;
    this.setState({
      currentNumber: inputNumber,
    });
    if (parseInt(allOperations[allOperations.length - 1])) {
      allOperations.pop();
      allOperations.push(inputNumber);
    } else {
      allOperations.push(inputNumber);
    }
  };

  add = () => {
    const { allOperations } = this.state;
    allOperations.push(' + ');
    this.setState({
      currentNumber: 0
    })
  };

  deduct = () => {
    const { allOperations } = this.state;
    allOperations.push(' - ');
    this.setState({
      currentNumber: 0
    })
  };

  multiply = () => {
    const { allOperations } = this.state;
    allOperations.push(' * ');
    this.setState({
      currentNumber: 0
    })
  };

  divide = () => {
    const { allOperations } = this.state;
    allOperations.push(' / ');
    this.setState({
      currentNumber: 0
    })
  };

  reset = () => {
    this.setState({
      currentNumber: 0,
      allOperations: [],
      result: 0
    })
  };

   calc = (fn) => {
    return new Function('return ' + fn)();
  };

  result = () => {
    const { allOperations } = this.state;

    const final = this.calc(allOperations.join(''));
    this.setState({
      result: final
    });
  };

  render() {
    let {
      result,
      allOperations,
      currentNumber,
      hex
    } = this.state;
    if (hex) {
      allOperations = convertToHex(...allOperations);
      currentNumber = convertToHex(currentNumber);
      result = convertToHex(result);
    }
    const resString = result.toString();
    const currentNumberString = currentNumber.toString();

    const allOperationsString = allOperations.join('');

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.textStyle}>Result:</Text>
          <TextInput
            style={styles.inputStyle}
            value={resString}
          />
          <Text style={styles.textStyle}>All operations:</Text>
          <TextInput
            style={styles.inputStyle}
            value={allOperationsString}
          />
          <Text style={styles.textStyle}>Current number:</Text>
          <TextInput
            style={styles.inputStyle}
            value={currentNumberString}
          />
        </View>
        <View style={styles.buttonsContainer}>
            <CalcBtn
              onPress={this.reset}
              title={'AC'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={this.result}
              title={'='}
              styleContainer={{
                ...styles.button,
                backgroundColor: colors.BUTTON_RESULT,
              }}
            />
            <View style={styles.buttonSwitch}>
            <Switch
              value={hex}
              onValueChange={(val) => this.switchHandler(val)}
              />
            </View>
            <CalcBtn
              onPress={this.add}
              title={'+'}
              styleContainer={{
                ...styles.button,
                backgroundColor: colors.BUTTON_OPERATIONS,
              }}
            />
            <CalcBtn
              onPress={this.deduct}
              title={'-'}
              styleContainer={{
                ...styles.button,
                backgroundColor: colors.BUTTON_OPERATIONS,
              }}
            />
            <CalcBtn
              onPress={this.multiply}
              title={'*'}
              styleContainer={{
                ...styles.button,
                backgroundColor: colors.BUTTON_OPERATIONS,
              }}
            />
            <CalcBtn
              onPress={this.divide}
              title={'/'}
              styleContainer={{
                ...styles.button,
                backgroundColor: colors.BUTTON_OPERATIONS,
              }}
            />
            {
              numberBtn.map(item => {
                return (
                  <CalcBtn
                  key = { item.title }
                  title = { item.title }
                  onPress = {() => this.setCurrentNumber(item.title)}
                  styleContainer = {styles.button}
                />)
              })
            }
            {
              hexBtn.map(item => {
                return (
                  <CalcBtn
                    key = { item.title }
                    title = { item.title }
                    onPress = {() => this.setCurrentNumber(item.title)}
                    disabled={!hex}
                    styleContainer = {{...styles.button,
                      backgroundColor: colors.BUTTON_HEX}}
                  />
                )
              })
            }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.CONTAINER_MAIN,
    padding: 8,
    paddingTop: 25
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 25
  },
  inputStyle: {
    backgroundColor: colors.INPUT_BACKGROUND,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: colors.BLACK,
    borderWidth: 1,
  },
  buttonSwitch: {
    width: '50%',
    borderColor: colors.BLACK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BUTTON_BG,
  },
  button: {
    width: '25%',
    height: 60,
    borderColor: colors.BLACK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BUTTON_BG,
  }
});
