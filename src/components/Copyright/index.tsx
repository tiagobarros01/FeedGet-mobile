import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { styles } from './styles';

export function Copyright(props: ViewProps) {
  return (
    <View {...props}>
      <Text style={styles.text}>Made with 🤍 by Tiago Barros</Text>
    </View>
  );
}
