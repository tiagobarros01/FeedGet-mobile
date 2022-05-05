import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import successImage from '~/assets/success.png';
import { Copyright } from '../Copyright';
import { styles } from './styles';

type SuccessProps = ViewProps & {
  onSendAnotherFeedback(): void;
};

export function Success({ onSendAnotherFeedback, ...rest }: SuccessProps) {
  return (
    <View style={styles.container} {...rest}>
      <Image source={successImage} style={styles.image} />

      <Text style={styles.title}>We appreciate the feedback</Text>

      <TouchableOpacity onPress={onSendAnotherFeedback} style={styles.button}>
        <Text style={styles.buttonTitle}>We appreciate the feedback</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
