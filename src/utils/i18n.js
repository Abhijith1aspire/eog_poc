import { I18n } from "i18n-js";
import { getLanguageCode } from './getDeviceLanguage';
import enTranslations from '../Localization/en.json';
import frTranslations from '../Localization/fr.json';

const i18n = new I18n({
 en: enTranslations,
 fr: frTranslations,
});

i18n.locale = getLanguageCode();

export default i18n;
