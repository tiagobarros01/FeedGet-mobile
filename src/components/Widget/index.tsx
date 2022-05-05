import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { theme } from '~/theme/index';
import { FeedbackTypesKey } from '~/utils/feedbackTypes';
import { Form } from '../Form';
import { Options } from '../Options';
import { Success } from '../Success';
import { styles } from './styles';

function WidgetComponent(props: TouchableOpacityProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypesKey | null>(
    null
  );
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleOpenBottomSheet}
        style={styles.button}
        {...props}
      >
        <ChatTeardropDots
          color={theme.colors.text_on_brand_color}
          size="24"
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {!!feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onCancelFeedback={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onChangeFeedbackType={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent) as any;
