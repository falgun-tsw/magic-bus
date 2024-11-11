import React, { useState } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import Stack from "../mui/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { InputLabel } from "@mui/material";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import ImageComponent from "../mui/Image";
import Typography from "../mui/Typography";

interface CommonDropzoneProps {
  handleChange?: (value: {
    name: string;
    value: File[] | null;
    group?: any;
  }) => void;
  handleFileUnselect?: () => void;
  acceptedFileTypes?: { [key: string]: string[] };
  multipleFiles?: boolean;
  label?: string;
  name?: string;
  group?: any;
  disabled?: boolean;
  onDownloadTemplate?: () => void; // New prop for the download function
}

const FileUploader: React.FC<CommonDropzoneProps> = ({
  handleChange = () => {},
  handleFileUnselect = () => {},
  acceptedFileTypes = {},
  multipleFiles = false,
  label = "",
  name = "",
  group,
  disabled = false,
  onDownloadTemplate, // Destructure the new prop
}) => {
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileSelected = selectedFiles.length > 0;

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      const unsupportedTypes = rejectedFiles
        .map((file) => file.errors.map((err) => err.message).join(", "))
        .join(", ");
      setError(`Unsupported file types: ${unsupportedTypes}`);
    } else {
      setError("");
      setSelectedFiles(acceptedFiles);
      if (acceptedFiles.length > 0) {
        setSelectedFileName(acceptedFiles[0].name);
        handleChange({ name, value: acceptedFiles, group });
      }
    }
  };

  const handleFileRemove = () => {
    setSelectedFiles([]);
    setSelectedFileName("");
    handleFileUnselect();
    handleChange({ name, value: null });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: multipleFiles,
    disabled,
  });

  return (
    <>
      {fileSelected ? (
        <>
          <InputLabel sx={{ marginBottom: "6px", fontSize: "0.875rem" }}>
            {label}
          </InputLabel>
          <div
            style={{
              border: "1px solid yellow",
              backgroundColor: "#FFFBE9",
              borderRadius: "8px",
              padding: "14px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              minHeight: "30px",
            }}
          >
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <FileIcon sx={{ height: "34px", width: "34px" }} />
              {selectedFileName && <span>{selectedFileName}</span>}
            </Stack>
            <CloseIcon
              fontSize="small"
              onClick={handleFileRemove}
              style={{
                width: "20px",
                height: "20px",
                padding: "3px",
                borderRadius: "17px",
                backgroundColor: "#FFFBE9"
              }}
            />
          </div>
        </>
      ) : (
        <div
          {...getRootProps()}
          style={{
            minHeight: "150px",
            height: "55px",
            border: "1px dashed #997906",
            borderRadius: "8px",
            padding: "40px 64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFBE9",
          }}
        >
          <input {...getInputProps()} />
          {error && (
            <p
              style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}
            >
              {error}
            </p>
          )}
          <InputLabel sx={{ marginBottom: "6px", fontSize: "0.875rem" }}>
            {label}
          </InputLabel>
          <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <ImageComponent
              sx={{ height: "34px", width: "34px" }}
              src="assets/images/login/uploadIcon.svg"
              alt="File Upload Icon"
            />
            <p style={{ fontWeight: 400, fontSize: "14px", color: "#98A2B3" }}>
              Drag & drop to upload or <span style={{
                color: "#997906",
                fontSize: "14px",
                fontWeight: 600, // No "px" here, as fontWeight is a number
              }}>Browse</span>
            </p>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                color: "#997906",
                textDecoration: "underline",
                whiteSpace: "nowrap",
                display: "flex",
              }}
              onClick={onDownloadTemplate} // Call the function when clicked
              style={{ cursor: "pointer" }} // Add a pointer cursor
            >
              <img
                src="assets/images/login/downloadIcon.svg"
                alt="Download Icon"
                style={{
                  height: "20px", // Adjust size if needed
                  width: "20px", // Adjust size if needed
                  marginRight: "1px", // Optional: Adjust margin between icon and text
                }}
              />
              <Typography
                sx={{
                  color: "#997906",
                  fontSize: "14px",
                  fontWeight: 600, // No "px" here, as fontWeight is a number
                  textDecoration: "underline", // Correct the property name
                }}
              >
                Download template here
              </Typography>
            </Stack>
          </Stack>
        </div>
      )}
    </>
  );
};

export default FileUploader;
