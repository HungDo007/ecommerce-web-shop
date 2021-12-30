import MaterialTable from "material-table";

import VisibilityIcon from "@material-ui/icons/Visibility";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import { cut } from "../../../../utils/cut-string";

import storeApi from "../../../../api/store-api";

const HiddenProductTable = ({
  currentUser,
  actionHideProduct,
  setProductId,
  dispatch,
  tableRef,
}) => {
  const columns = [
    {
      title: "Name",
      field: "name",
      render: (rowData) => <div>{cut(rowData.name, 50)}</div>,
    },
    {
      title: "Image",
      field: "poster",
      render: (rowData) => (
        <img
          height="100"
          width="150"
          style={{ objectFit: "cover" }}
          src={process.env.REACT_APP_IMAGE_URL + rowData.poster}
          aria-hidden
          alt="image of directory"
        />
      ),
    },
  ];

  const handleShowProduct = (event, rowData) => {
    actionHideProduct("show-product");
    setProductId(rowData.id);
    dispatch(toggleModal());
  };

  return (
    <MaterialTable
      title="Product"
      tableRef={tableRef}
      options={{ actionsColumnIndex: -1 }}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          storeApi
            .getHiddenProduct(currentUser.unique_name, params)
            .then((response) => {
              resolve({
                data: response.items,
                page: query.page,
                totalCount: response.totalRecords,
              });
            });
        })
      }
      columns={columns}
      actions={[
        {
          icon: VisibilityIcon,
          tooltip: "Show product",
          onClick: (event, rowData) => {
            handleShowProduct(event, rowData);
          },
        },
      ]}
    />
  );
};

export default HiddenProductTable;
