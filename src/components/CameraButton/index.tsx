import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { theme } from '~/theme';
import { styles } from './styles';

type CameraButtonProps = TouchableOpacityProps & {
  screenshot: string | null;
  onTakeScreenshot(): void;
  onRemoveScreenshot(): void;
};

export function CameraButton({
  screenshot,
  onTakeScreenshot,
  onRemoveScreenshot,
  ...rest
}: CameraButtonProps) {
  function handleButtonPress() {
    if (screenshot) {
      return onRemoveScreenshot();
    }

    onTakeScreenshot();
  }

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={styles.container}
      {...rest}
    >
      {!!screenshot ? (
        <Trash
          size="22"
          color={theme.colors.text_secondary}
          weight="fill"
          style={styles.removeIcon}
        />
      ) : (
        <Camera size="24" color={theme.colors.text_secondary} weight="bold" />
      )}
    </TouchableOpacity>
  );
}
