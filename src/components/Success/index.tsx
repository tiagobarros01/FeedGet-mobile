import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import successImage from '~/assets/success.png';
import { Copyright } from '../Copyright';
import { styles } from './styles';

export function Success(props: ViewProps) {
  return (
    <View style={styles.container} {...props}>
      <Image source={successImage} style={styles.image} />

      <Text style={styles.title}>We appreciate the feedback</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>We appreciate the feedback</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
