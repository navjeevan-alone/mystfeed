export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text.replaceAll('"', ""));
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
