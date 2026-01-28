import { DataGrid } from "@mui/x-data-grid";

const calculateColumnWidths = (columns, rows) => {
    return columns.map((col) => {
        const headerLength = col.headerName.length;
        const contentLength = rows.reduce((max, row) => {
            const value = row[col.field] ? String(row[col.field]) : "";
            return Math.max(max, value.length);
        }, 0);

        const maxLength = Math.max(headerLength, contentLength);
        return { ...col, width: maxLength * 10 + 20 };
    });
};
const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({ columns, rows, getRowId }) {
    const dynamicColumns = calculateColumnWidths(columns, rows);
    return (
        <DataGrid
            rows={rows}
            columns={dynamicColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection
            disableMultipleRowSelection={true}
            onRowSelectionModelChange={getRowId}
        />
    );
}
