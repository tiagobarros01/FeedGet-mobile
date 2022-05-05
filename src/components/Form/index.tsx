import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { theme } from '~/theme';
import { feedbackTypes, FeedbackTypesKey } from '~/utils/feedbackTypes';
import { styles } from './styles';

type FormProps = ViewProps & {
  feedbackType: FeedbackTypesKey;
};

export function Form({ feedbackType, ...rest }: FormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  return (
    <View style={styles.container} {...rest}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size="24"
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
    </View>
  );
}
