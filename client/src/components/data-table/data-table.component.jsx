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
  return (
    <div>
      <DataTableExtensions {...tableData}>
        <DataTable pagination highlightOnHover />
      </DataTableExtensions>
    </div>
  );
};

export default CustomDataTable;
