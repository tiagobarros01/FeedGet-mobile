import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { feedbackTypes, FeedbackTypesKey } from '~/utils/feedbackTypes';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { styles } from './styles';

type OptionsProps = ViewProps & {
  onChangeFeedbackType(feedbackType: FeedbackTypesKey): void;
};

export function Options({ onChangeFeedbackType, ...rest }: OptionsProps) {
  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title}>Leave your feedback!</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onChangeFeedbackType(key as FeedbackTypesKey)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
