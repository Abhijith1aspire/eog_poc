import * as RNLocalize from 'react-native-localize';

export const getLanguageCode = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    const code = locales[0].languageCode;
    if (code !== 'en' && code !== 'fr') {
      return 'en';
    }
    return code;
  } else {
    return 'en';
  }
};
