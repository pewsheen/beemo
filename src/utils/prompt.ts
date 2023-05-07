export default function languagePrompt(
  lang: string,
  tone: string,
  text: string
): string {
  switch (lang) {
    case 'Japanese':
      return `Translate "${text}" to ${lang}. Make the translated result sounds more ${tone}. Also add the pronunciation of the translated result in alphabet at the end of the output.`;
    case 'English':
      return `Translate "${text}" to ${lang}. Make the translated result sounds more ${tone}.`;
    case 'Traditional Chinese':
      return `Translate "${text}" to ${lang}. Make the translated result sounds more ${tone}.`;
    default:
      return '';
  }
}
