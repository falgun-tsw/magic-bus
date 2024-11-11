import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import Box from '../mui/Box';
import Typography from '../mui/Typography';
import FileUploader from '../common/FileUploader';
import ImageComponent from '../mui/Image';
import CentreTable from './CentreTable';
import * as XLSX from 'xlsx';
import { useImportCentreMutation } from "../../store/apis/centerApis"; // Import the mutation hook

interface ImportDialogContentProps {
  onClose: (event: React.MouseEvent | {}, reason: "backdropClick" | "escapeKeyDown") => void;
  onSuccess: () => void; // Prop to notify success in the parent
}

const ImportCenterContent: React.FC<ImportDialogContentProps> = ({ onClose,onSuccess  }) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [centerTableModal, setCenterTableModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const [importCentre, { isLoading, isError, error, isSuccess }] = useImportCentreMutation(); // Hook to trigger the API

  const handleFileChange = (value: { name: string; value: File[] | null }) => {
    if (value.value && value.value.length > 0) {
      setFile(value.value[0]);
    }
  };

  const handleFileUnselect = () => {
    setFile(null);
    setTableData([]);
    setHeaders([]);
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = "assets/images/login/DummyFiles/import_center_format.xlsx";
    link.setAttribute('download', 'import_center_format.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportFiles = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
  
        // Convert the sheet to JSON with each row as an array (header as the first row)
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" }); // defval="" sets empty cells to ""
        
        // Filter out empty rows (rows where all cells are empty)
        const cleanedData = json.filter((row:any) => row.some((cell:any) => cell !== "")); // Only keep rows that contain non-empty cells
  
        if (cleanedData.length > 0) {
          // Set the first row as headers and the rest as data
          setHeaders(cleanedData[0] as string[]);
          setTableData(cleanedData.slice(1)); // Skip the header row and keep the data
          setCenterTableModal(true);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDialogClose = () => {
    setCenterTableModal(false);
  };

  // Prepare data and submit it to the API
  const handleSubmit = async () => {
    try {
      const payload = {
        records: tableData.map((row) => {
          console.log(tableData, "tableData");
          // Map tableData to the format that matches your API's expected body structure
          return {
            centerId: row[1],
            centerName: row[2],
            genderType: row[8],  // Assuming "Gender type" is the 9th column
            projectCode: row[2],  // Assuming "Project Code" is in column 3
            region: row[0],
            state: row[7],
            district: row[6],
            city: row[8], // Double-check for correct column
            centerStatus: row[4],
            funderName: row[5],
            mcpCenter: row[12] === 'Yes' && true,
            programType: row[11],
            programSubType: row[13], // Double-check for correct column
            centerBusinessType: row[9],
            biometricDeviceId: row[3],
            regionalDirectorEmail: row[14],
            regionalDirectorName: row[13],
            regionalDirectorPhoneNo: row[18], // Double-check for correct column
            cityManagerEmail: row[18],
            cityManagerName: row[17],
            cityManagerPhoneNo: row[21], // Double-check for correct column
            districtLevelManagerEmail: row[22], // Double-check for correct column
            districtLevelManagerName: row[23], // Double-check for correct column
            districtLevelManagerPhoneNo: row[24], // Double-check for correct column
            clusterManagerEmail: row[20],
            clusterManagerName: row[19],
            clusterManagerPhoneNo: row[27], // Double-check for correct column
            regionalDataManagerEmail: row[26],
            regionalDataManagerName: row[25],
            regionalDataManagerPhoneNo: row[30], // Double-check for correct column
            placementHeadEmail: row[24], // Double-check for correct column
            placementHeadName: row[23],
            placementHeadPhoneNo: row[33], // Double-check for correct column
            nationalDirectorEmail: row[14],
            nationalDirectorName: row[13],
            nationalDirectorPhoneNo: row[36], // Double-check for correct column
          };
        }),
      };
  
      // Call the importCentre mutation
      setUploading(true);
      const response = await importCentre(payload).unwrap();
  
      // Handle success (response)
      if (response.isCreated) {
        onSuccess();
        setCenterTableModal(false);
      }
    } catch (err) {
      // Handle error
      console.error('Error importing center:', err);
      // alert('Failed to import center');
    }finally{
      setUploading(false);
    }
  };
  

  const handleEdit = (rowIndex: number, editedRowData: any) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = editedRowData;
    setTableData(updatedData);
  };

  const handleDelete = (rowIndex: number) => {
    const updatedData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(updatedData);
  };

  return (
    <Box sx={{ padding: "24px", paddingTop:"12px"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "18px" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>Import</Typography>
        <IconButton onClick={(e) => onClose(e, "escapeKeyDown")}>
          <ImageComponent sx={{ height: "24px", width: "24px" }} src="assets/images/login/crossIcon.svg" alt="Close Icon" />
        </IconButton>
      </Box>

      <FileUploader
        handleChange={handleFileChange}
        handleFileUnselect={handleFileUnselect}
        acceptedFileTypes={{
          'text/csv': ['.csv'],
          'application/vnd.ms-excel': ['.xls'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        }}
        multipleFiles={false}
        name="fileUpload"
        onDownloadTemplate={handleDownloadTemplate}
      />

      <Box display="flex" justifyContent="space-between" sx={{ paddingTop: "28px", gap: "12px" }}>
        <Button
          onClick={(e) => onClose(e, "escapeKeyDown")}
          variant="outlined"
          color="secondary"
          sx={{ 
            width: "287px", backgroundColor: "#FFF", color: "#082648", border: "1px solid #082648",
            textTransform: "capitalize"
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={handleImportFiles}
          sx={{ width: "287px", backgroundColor: "#FFF1B7", border: "1px solid #997906", color: "#082648", textTransform: "capitalize" }}
        >
          Import
        </Button>
      </Box>

      {/* Pass the edit and delete handlers to CentreTable */}
      <CentreTable
        open={centerTableModal}
        onClose={handleDialogClose}
        headers={headers}
        tableData={tableData}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        uploading={uploading}
      />
    </Box>
  );
};

export default ImportCenterContent;
