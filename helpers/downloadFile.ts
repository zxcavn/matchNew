import { saveAs } from 'file-saver';

type DownloadFileParams = {
  content: string;
  type: string;
  fileName: string;
};

const downloadFile = ({ content, type, fileName }: DownloadFileParams) => {
  const blob = new Blob([content], { type });

  saveAs(blob, fileName);
};

export default downloadFile;
