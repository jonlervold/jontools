/**
 * Saves a file to the user's device.
 */
const saveFile = (blobData: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blobData);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default saveFile;
