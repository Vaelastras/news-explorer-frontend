// скроллит страницу в начало
export const scrollPageToTop = () => {
  if (window.pageYOffset > 0) {
    window.scroll(0, 0);
  }
};

// Переводит 1-й символ в верхний регистр
export const handleKeywordFormatter = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const handleValidityUrl = (url) => {
  const isValidLink = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(url);
  if (isValidLink) {
    return isValidLink.toString();
  }
  return isValidLink;
};
