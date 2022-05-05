import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { feedbackTypes } from '~/utils/feedbackTypes';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { styles } from './styles';

export function Options(props: ViewProps) {
  return (
    <View style={styles.container} {...props}>
      <Text style={styles.title}>Leave your feedback!</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option key={key} title={value.title} image={value.image} />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
