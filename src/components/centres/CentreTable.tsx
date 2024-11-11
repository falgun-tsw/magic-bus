import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Stack from "../mui/Stack";
import Box from "../mui/Box";
import IconButton from "../mui/IconButton";
import Typography from "../mui/Typography";
import Dialog from "../common/Dialog";
import TextField from "../mui/TextField";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface TableDialogProps {
  open: boolean;
  onClose: () => void;
  headers: string[];
  tableData: any[];
  onSubmit: () => void; // Function to call on submit
  onEdit: any; // Function to handle edit
  onDelete: (rowIndex: number) => void; // Function to handle delete
  uploading: boolean;
}

const CentreTable: React.FC<TableDialogProps> = ({
  open,
  onClose,
  headers,
  tableData,
  onSubmit,
  onEdit,
  onDelete,
  uploading
}) => {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null); // Track which row is being edited
  const [editedRowData, setEditedRowData] = useState<any>({}); // Store edited data temporarily

  const handleEdit = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setEditedRowData({ ...tableData[rowIndex] });
  };

  const handleSave = () => {
    const updatedData = [...tableData];
    updatedData[editingRowIndex as number] = editedRowData; // Update the row with the edited data
    // Call the parent onEdit callback to update the state
    onEdit(editingRowIndex as number, editedRowData);
    setEditingRowIndex(null); // Close the editing mode
  };

  const handleCancel = () => {
    setEditingRowIndex(null); // Close the editing mode
    setEditedRowData({}); // Clear edited data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRowData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(tableData, "tableData");
  return (
    <Dialog open={open} onOpen={() => {}} onClose={onClose} maxWidth="lg">
      <Box sx={{ padding: "24px",paddingTop:"12px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "16px" }}
        >
          <Typography variant="h6">Preview</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {tableData.length > 0 && (
          <TableContainer component={Paper} sx={{minHeight: "280px"}}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        backgroundColor: "#f0f0f0",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                  <TableCell
                    sx={{
                      backgroundColor: "#f0f0f0",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row?.map((cell: any, cellIndex: any) => (
                      <TableCell key={cellIndex} sx={{padding: "10px 8px"}}>
                        {/* Check if the row is being edited */}
                        {editingRowIndex === rowIndex ? (
                          <TextField
                            name={headers[cellIndex]} // Use header name as input name for simplicity
                            value={editedRowData[headers[cellIndex]] || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                          />
                        ) : (
                          cell
                        )}
                      </TableCell>
                    ))}
                    <TableCell sx={{padding: "10px 8px"}}>
                      {/* Action Buttons */}
                      <Stack
                       sx={{
                        flexFlow:"row nowrap", 
                        gap:"10px" 
                      }}>
                        {/* <Button
                          onClick={() => handleEdit(rowIndex)}
                          sx={{
                            backgroundColor: "#FFF1B7",
                            borderRadius: "8px",
                            boarder: "1px solid #CEA202",
                            minWidth: "40px", // Ensures the button is large enough to hold the icon
                            padding: "7px 10px", // Adjust padding to ensure the icon fits properly
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black", // Icon color inside the button
                          }}
                        >
                          <EditIcon sx={{fontSize: "16px"}} />
                        </Button> */}

                        <Button
                          onClick={() => onDelete(rowIndex)}
                          sx={{
                            backgroundColor: "#FFF1B7",
                            borderRadius: "8px",
                            boarder: "1px solid #CEA202",
                            minWidth: "40px", // Ensures the button is large enough to hold the icon
                            padding: "7px 10px", // Adjust padding to ensure the icon fits properly
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "black", // Icon color inside the button
                          }}
                        >
                          <DeleteOutlineIcon sx={{fontSize: "16px"}}/>
                        </Button>

                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{ marginTop: "16px", gap: "12px" }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              border: "1px solid #8D8D8D",
              borderRadius: "7px",
              boxShadow:"none",
              textTransform:"capitalize"
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onSubmit}
            disabled={uploading}
            sx={{
              borderRadius: "7px",
              border: "1px solid #8D8D8D",
              boxShadow:"none !important",
              textTransform:"capitalize"
            }}>
            Submit
          </Button>

          {editingRowIndex !== null && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  border: "1px solid #8D8D8D",
                  borderRadius: "8px",
                }}
                onClick={handleCancel}
              >
                Cancel Edit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default CentreTable;
