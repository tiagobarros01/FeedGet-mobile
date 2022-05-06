import axios from 'axios';
import * as FileSystem from 'expo-file-system';
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
import { api } from '~/services/api';
import { theme } from '~/theme';
import { feedbackTypes, FeedbackTypesKey } from '~/utils/feedbackTypes';
import { Button } from '../Button';
import { CameraButton } from '../CameraButton';
import { styles } from './styles';

type FormProps = ViewProps & {
  feedbackType: FeedbackTypesKey;
  onCancelFeedback(): void;
  onFeedbackSent(): void;
};

export function Form({
  feedbackType,
  onCancelFeedback,
  onFeedbackSent,
  ...rest
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

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

  async function handleSubmitFeedback() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);

    const paramsToSubmit = {
      type: feedbackType,
      comment,
      screenshot,
    };

    if (screenshot) {
      const screenshotBase64 = await FileSystem.readAsStringAsync(screenshot, {
        encoding: 'base64',
      });

      paramsToSubmit.screenshot = `data:image/png;base64, ${screenshotBase64}`;
    }

    try {
      await api.post('/feedbacks', paramsToSubmit);

      onFeedbackSent();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.message || err.response?.data);
      }
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container} {...rest}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancelFeedback}>
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
        autoCorrect={false}
        onChangeText={setComment}
        value={comment}
      />

      <View style={styles.footer}>
        <CameraButton
          onTakeScreenshot={handleTakeScreenshot}
          onRemoveScreenshot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button
          disabled={!comment}
          isLoading={isSendingFeedback}
          onPress={handleSubmitFeedback}
        />
      </View>
    </View>
  );
}
