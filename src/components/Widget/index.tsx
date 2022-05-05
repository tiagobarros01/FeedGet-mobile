import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { theme } from '~/theme/index';
import { styles } from './styles';

function WidgetComponent(props: ViewProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  return (
    <>
      <TouchableOpacity onPress={handleOpenBottomSheet} style={styles.button}>
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
      ></BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent) as any;
