import MagicTable from "../common/MagicTable";

interface Column {
    field: string;
    headerName: string;
    width: number;
}

interface GroupedColumn {
    groupId: string;
    headerName: any;
    children: { field: any }[];
}

interface TableProps {
    columns: Column[];
    rows: any[];
    columnGroupingModel: GroupedColumn[];
}

const LeaderboardTable: React.FC<TableProps> = ({ columns, rows, columnGroupingModel }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
       
        console.log(`Page changed to: ${newPage}`);
    };

    return (
        <MagicTable
            rows={rows}
            columns={columns} 
            loading={false}
            columnGroupingModel={columnGroupingModel}
            count={rows.length} 
            handlePageChange={handlePageChange} 
            rowCellsSx={{ paddingLeft: "16px", textAlign: "start" }}
            headerSx={{
                paddingLeft: "16px",
                textAlign: "start",
                fontWeight: 600,
                color: "#242424",
                padding: "13px 16px",
                style: { borderBottom: "none" }
            }}
            tableSx={{ height: "213px" }}
        />
    );
};

export default LeaderboardTable;
