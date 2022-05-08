import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      Status: '',
      txnId: '',
      GOOGLE_PAY: 'GOOGLE_PAY',
      PHONEPE: 'PHONEPE',
      PAYTM: 'PAYTM',
      message: '',
    };
  }
  render() {
    that = this;

    return (
      <>
        <Button
          style={{width: '90%', alignSelf: 'center'}}
          mode="contained"
          color="#000"
          onPress={() => {
            
          }}>
          Pay Online
        </Button>
      </>
    );
  }
}
