import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

import { data } from "./data";
import { columns } from "../../components/data-table/columns.data-table";

import "./manage-account-page.styles.scss";

const ManageAccountPage = () => {
  const tableData = {
    columns,
    data,
  };

  return (
    <div className="main">
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          defaultSorField="id"
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
};

export default ManageAccountPage;
