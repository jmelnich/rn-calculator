import * as React from 'react';
import {
  Button,
  Switch,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const btnTypes = {
  number: {
    style: 1,
    onPress: () => {},
  }
};

const initState = {
  result: 0,
  allOparations: [],
  currentNumber: 0,
  buttons: [
    {
      title: '1',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '2',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '3',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '4',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '5',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '6',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '7',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '8',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '9',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: '0',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: 'A',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: 'B',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: 'C',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: 'D',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: 'E',
      // disabled: false,
      type: btnTypes.number,
    },
    {
      title: 'F',
      // disabled: false,
      type: btnTypes.number,
    },
  ],
  hex: true // HEX, false is for DEC
};

const colors = {
  // std colors
  RED: 'red',
  BLACK: 'black',
  GREY: 'grey',
  // --
  CONTAINER_MAIN: '#ecf0f1',
  INPUT_BACKGROUND: '#E6F6FF',
  BUTTON_BG: '#FBFFF3'
};

const CalcBtn = ({onPress, styleContainer, disabled, title}) => {
  const _style = disabled
    ? {
      ...styleContainer,
      backgroundColor: colors.GREY,
    }
    : styleContainer;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={_style}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initState
    }

    // TODO: handle all Operations
    // TODO: current number 0 == nothing
  }

  switchHandler = (val) => {
    this.setState({
      hex: val,
      currentNumber: 0
    });
  };

  setCurrentNumber = (val) => {
    const { currentNumber: _currNumber } = this.state;
    const currentNumber = _currNumber ? _currNumber : '';

    this.setState({
      currentNumber: `${currentNumber}${val}`,
    })
  };

  add = () => {
    const { currentNumber, allOparations, hex } = this.state;
    allOparations.push({
      type: hex ? 10 : 16,
      val: currentNumber
    });
    this.setState({
      allOparations,
      currentNumber: 0
    })
  };

  reset = () => {
    this.setState({
      currentNumber: 0,
      allOparations: [],
      result: 0
    })
  };

  result = () => {
    this.add();

    const { allOparations } = this.state;
    const final = allOparations.reduce((acc, val) => parseInt(acc) + parseInt(val));
    this.setState({
      result: final
    });
  };

  render() {
    const {
      result,
      allOparations,
      currentNumber,
      buttons,
      hex
    } = this.state;
    const resString = result.toString();
    const currentNumberString = currentNumber.toString();

    const _allOperations = [];
    allOparations.map( item => {
      if (item.type === 10) {
        _allOperations.push(item.val);
      } else if (item.type === 16) {
        _allOperations.push(`0x${item.val}`);
      }
    });

    const allOparationsString = _allOperations.join(' + ');

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textStyle}>Result:</Text>
          <TextInput
            style={styles.inputStyle}
            value={resString}
          />
          <Text style={styles.textStyle}>All operations:</Text>
          <TextInput
            style={styles.inputStyle}
            value={allOparationsString}
          />
          <Text style={styles.textStyle}>Current number:</Text>
          <TextInput
            style={styles.inputStyle}
            value={currentNumberString}
          />
        </View>

        <View
          style={styles.buttonsContainer}
        >
          <View style={styles.rowButtonContainer}>
            <CalcBtn
              onPress={this.reset}
              title={'AC'}
              styleContainer={styles.button}
              // disabled={false}
            />
            <Switch
              value={hex}
              onValueChange={(val) => this.switchHandler(val)}
            />
            <CalcBtn
              onPress={this.add}
              title={'+'}
              styleContainer={{
                ...styles.button,
                backgroundColor: '#FFF9C0',
              }}
            />
            <CalcBtn
              onPress={this.result}
              title={'='}
              styleContainer={{
                ...styles.button,
                backgroundColor: '#FFF9C0',
              }}
            />
          </View>
          <View style={styles.rowButtonContainer}>
            <CalcBtn
              onPress={() => this.setCurrentNumber('1')}
              title={'1'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('2')}
              title={'2'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('3')}
              title={'3'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('4')}
              title={'4'}
              styleContainer={styles.button}
            />
          </View>
          <View style={styles.rowButtonContainer}>
            <CalcBtn
              onPress={() => this.setCurrentNumber('5')}
              title={'5'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('6')}
              title={'6'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('7')}
              title={'7'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('8')}
              title={'8'}
              styleContainer={styles.button}
            />
          </View>
          <View style={styles.rowButtonContainer}>
            <CalcBtn
              onPress={() => this.setCurrentNumber('9')}
              title={'9'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('0')}
              title={'0'}
              styleContainer={styles.button}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('A')}
              title={'A'}
              styleContainer={styles.button}
              disabled={!hex}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('B')}
              title={'B'}
              styleContainer={styles.button}
              disabled={!hex}
            />
          </View>
          <View style={styles.rowButtonContainer}>
            <CalcBtn
              onPress={() => this.setCurrentNumber('C')}
              title={"C"}
              styleContainer={styles.button}
              disabled={!hex}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('D')}
              title={"D"}
              styleContainer={styles.button}
              disabled={!hex}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('E')}
              title={'E'}
              styleContainer={styles.button}
              disabled={!hex}
            />
            <CalcBtn
              onPress={() => this.setCurrentNumber('F')}
              title={'F'}
              styleContainer={styles.button}
              disabled={!hex}
            />
          </View>
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
  headerContainer: {

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
    // height: 200,
    borderColor: colors.BLACK,
    borderWidth: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderColor: colors.BLACK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BUTTON_BG,
  },
  rowButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // height: 100,
    paddingVertical: 10,
  }
});
