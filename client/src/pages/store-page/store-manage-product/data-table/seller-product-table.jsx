import { useHistory } from "react-router";

import MaterialTable from "material-table";

import EditIcon from "@material-ui/icons/Edit";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import catalogApi from "../../../../api/catalog-api";

const SellerProductTable = ({
  currentUser,
  actionHideProduct,
  setProductId,
  dispatch,
  tableRef,
}) => {
  const history = useHistory();

  const columns = [
    {
      title: "Name",
      field: "name",
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

  const handleEditProduct = (event, rowData) => {
    history.push({
      pathname: "product",
      state: rowData.id,
    });
  };

  const handleHideProduct = (event, rowData) => {
    actionHideProduct("hide-product");
    setProductId(rowData.id);
    dispatch(toggleModal());
  };

  const handleRemoveProduct = (event, rowData) => {
    actionHideProduct("remove-product");
    setProductId(rowData.id);
    dispatch(toggleModal());
  };

  return (
    <MaterialTable
      title="Product"
      tableRef={tableRef}
      options={{ actionsColumnIndex: -1 }}
      columns={columns}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          catalogApi
            .getAllProductOfStore(currentUser.unique_name, params)
            .then((response) => {
              resolve({
                data: response.items,
                page: query.page,
                totalCount: response.totalRecords,
              });
            })
            .catch((error) => {
              console.log(error);
              reject();
            });
        })
      }
      actions={[
        {
          icon: EditIcon,
          tooltip: "Edit product",
          onClick: (event, rowData) => {
            handleEditProduct(event, rowData);
          },
        },
        {
          icon: VisibilityOffIcon,
          tooltip: "Hide product",
          onClick: (event, rowData) => {
            handleHideProduct(event, rowData);
          },
        },
        {
          icon: DeleteForeverIcon,
          tooltip: "Remove product",
          onClick: (event, rowData) => {
            handleRemoveProduct(event, rowData);
          },
        },
      ]}
    />
  );
};

export default SellerProductTable;
