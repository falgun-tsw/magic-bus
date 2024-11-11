import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// interface DownloadToXlsxFileProps {
//   sheetData: (string | number | boolean)[][]; // Array of arrays, representing rows and cells
//   fromDate?: Date;
//   toDate?: Date;
//   fileNamePrifix?: string;
//   tabName?: string;
// }

const DownloadToXlsxFile = (props:any) => {
  const {
    sheetData,
    fromDate,
    toDate,
    fileNamePrifix = "download",
    tabName = "Sheet 1",
  } = props;  

  // filename
  let fileName = `${fileNamePrifix}.xlsx`;

  fileName = fileName.replace(/ /g, "_");

  // Convert the data into a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, tabName);

  // Export the workbook
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([xlsxData], { type: "application/octet-stream" }), fileName);
};

export default DownloadToXlsxFile;
