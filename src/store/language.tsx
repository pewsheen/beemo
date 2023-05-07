import { Accessor, createSignal } from 'solid-js';

type Language = 'Japanese' | 'English' | 'Traditional Chinese';

const storedLanguage =
  (localStorage.getItem('language') as Language) ?? 'Japanese';

const [lang, setLang] = createSignal<Language>(storedLanguage);

const setLangProxy = (newLang: Language) => {
  localStorage.setItem('language', newLang);
  setLang(newLang);

  return newLang;
};

const signal: [Accessor<Language>, (newLang: Language) => Language] = [lang, setLangProxy];

export default signal;
