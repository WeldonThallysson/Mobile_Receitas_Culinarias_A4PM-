export const titleCase = (text: string) => {
  if (!text) {
    return text;
  }

  const lowerText = text.toLocaleLowerCase('pt-BR').trim();

  const smallWords = new Set([
    'e',
    'de',
    'do',
    'da',
    'dos',
    'das',
    'a',
    'o',
    'os',
    'as',
    'em',
    'no',
    'na',
    'nos',
    'nas',
    'com',
    'sem',
    'por',
    'para',
  ]);

  return lowerText
    .split(/\s+/)
    .map((word, index, array) => {
      if (!word) {
        return '';
      }

      if (index > 0 && index < array.length - 1 && smallWords.has(word)) {
        return word;
      }

      return word[0].toLocaleUpperCase('pt-BR') + word.slice(1);
    })
    .join(' ');
};

export const formatMinutesDisplay = (value?: string | number | null) => {
  if (value === undefined || value === null || value === '') return '';

  const v = String(value).trim();
  if (!v) return '';

  return `${v}min`;
};

export const parseMinutesInput = (text: string) => {
  if (!text) return '';

  const digits = text.replace(/\D+/g, '');

  // remove leading zeros
  return digits.replace(/^0+(?=\d)/, '');
};

export const formatCPF = (text: string): string => {
  if (!text) return '';

  const digits = text.replace(/\D+/g, '');
  if (!digits) return '';

  const first = digits.slice(0, 3);
  const second = digits.slice(3, 6);
  const third = digits.slice(6, 9);
  const fourth = digits.slice(9, 11);
  const rest = digits.slice(11);

  let formatted = first;

  if (second) {
    formatted += `.${second}`;
  }

  if (third) {
    formatted += `.${third}`;
  }

  if (fourth) {
    formatted += `-${fourth}`;
  }

  if (rest) {
    formatted += rest;
  }

  return formatted;
};

export const parseCPFOrEmail = (text: string): string => {
  if (!text) return '';

  const cleanedText = text.replace(/[.\-]/g, '');

  const isOnlyNumbers = /^\d+$/.test(cleanedText);

  if (isOnlyNumbers) {
    return formatCPF(text);
  }

  return text;
};
