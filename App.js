import React, { Component } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';


import { RootStack } from './App/Routes';


class App extends Component {

  render() {
    return (
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    );  
  }
};

export default App;