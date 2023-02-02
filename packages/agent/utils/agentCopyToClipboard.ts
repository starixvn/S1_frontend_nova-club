import * as Clipboard from 'expo-clipboard'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import i18n from 'app/provider/localization/i18n'
/**
 * `expo-clipboard` version 2.1.1 is used due to v3 above need Expo SDK45
 * to support, and `setStringAsync` can't be used in IOS
 * https://github.com/expo/expo/issues/17548
 */
export async function copyToClipboard(
  message: string = '',
  onCopied?: (msg: string) => void
) {
  try {
    Clipboard.setString(message)
    onCopied && onCopied(message)

    Toast.show({
      type: 'info',
      text1: i18n.translate('common.copied'),
    })
  } catch (error) {
    console.error(error)
  }
}
