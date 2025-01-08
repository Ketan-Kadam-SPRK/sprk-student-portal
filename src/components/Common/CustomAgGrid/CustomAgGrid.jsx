import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const CustomAgGrid = ({ 
  rowData = [], 
  columnDefs, 
  paginationModel, 
  height = 500, 
  checkboxSelection 
}) => {
  return (
    <Paper sx={{ height: height, width: "100%" }}>
      <DataGrid
        rows={rowData}
        columns={columnDefs}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50, 100]}
        checkboxSelection={checkboxSelection}
        disableColumnFilter={true} // Disable column filter globally
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default CustomAgGrid;
