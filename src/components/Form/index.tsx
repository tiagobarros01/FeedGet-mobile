import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { theme } from '~/theme';
import { feedbackTypes, FeedbackTypesKey } from '~/utils/feedbackTypes';
import { Button } from '../Button';
import { CameraButton } from '../CameraButton';
import { styles } from './styles';

type FormProps = ViewProps & {
  feedbackType: FeedbackTypesKey;
};

export function Form({ feedbackType, ...rest }: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleTakeScreenshot() {
    try {
      const uri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      });

      setScreenshot(uri);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveScreenshot() {
    setScreenshot(null);
  }

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

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <CameraButton
          onTakeScreenshot={handleTakeScreenshot}
          onRemoveScreenshot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button isLoading={false} />
      </View>
    </View>
  );
}
