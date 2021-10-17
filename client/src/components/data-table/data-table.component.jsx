import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const CustomDataTable = ({ columns, data }) => {
  const tableData = {
    columns,
    data,
    export: false,
    print: false,
  };

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };

  return (
    <div>
      <DataTableExtensions {...tableData}>
        <DataTable
          pagination
          highlightOnHover
          selectableRows
          onSelectedRowsChange={handleChange}
        />
      </DataTableExtensions>
    </div>
  );
};

export default CustomDataTable;
