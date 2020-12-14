import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      q: '',
      count: '5'
    };
  }

  navigateTo(routeName){
    const { q, count } = this.state;

     const navigateAction = NavigationActions.navigate({
      routeName,
      params: { q, count }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render(){
    const { q, count } = this.state;
    return (
      <View style={styles.container}>
        <Text>Display Search Form </Text>  
        <View>
          <View>
            <TextInput
              style={ styles.inputStyle }
              placeholder="Search Query"
              value={ q }
              onChangeText={ (value) => this.setState({ q: value })}
            />
          </View>
          <View>
            <TextInput
              style={ styles.inputStyle }
              placeholder="Count"
              value={ count }
              onChangeText={ (value) => this.setState({ count: value })}
            />
          </View>
        </View>        
        <Button title="Search Twitter" onPress={ () => this.navigateTo('Results') } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    padding: 5,
    margin: 10,
    height: 60,
    width: 200,
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  }
});