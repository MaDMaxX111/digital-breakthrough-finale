export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\\.$?*|{}\\(\\)\\[\\]\\\/\\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const checkerValue = (value) => {
  return (typeof value === 'undefined' || value === null) ? false : true;
}
