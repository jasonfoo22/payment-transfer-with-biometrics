import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Colors } from '@/constants/Colors';

export type ButtonProps = TouchableOpacityProps & {
  title?: string;
  variant?: 'primary' | 'warning';
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  title,
  variant = 'primary',
  onPress,
  disabled,
  textStyle,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'warning' && styles.warning,
        disabled && styles.disabledButton,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === 'warning' && styles.textWarning,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
  },
  warning: {
    backgroundColor: Colors.warning,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
    textTransform: 'uppercase',
  },
  textWarning: {
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
  },
  disabledText: {
    color: '#fff',
  },
});
