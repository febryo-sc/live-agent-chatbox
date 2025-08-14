export function initialName(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function randomArray(arr: string[]): string {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function convertTextToHtml(text: string): string {
  const urlRegex = /https?:\/\/[^\s]+/g;
  return `<p>${text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  })}</p>`;
}
