import MaterialTable from "material-table";
import LockIcon from "@material-ui/icons/Lock";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import adminApi from "../../../../api/admin-api";

const defaultImg = "/img/default-img.png";

const ProductTable = ({ actionLockProduct, setProductId, dispatch }) => {
  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Image",
      field: "poster",
      render: (rowData) =>
        rowData.poster ? (
          <img
            height="100"
            width="150"
            style={{ objectFit: "cover" }}
            src={process.env.REACT_APP_IMAGE_URL + rowData.poster}
            aria-hidden
            alt="image of directory"
          />
        ) : (
          <img
            height="100"
            width="150"
            style={{ objectFit: "cover" }}
            src={defaultImg}
            aria-hidden
            alt="image of directory"
          />
        ),
    },
    {
      title: "Seller",
      field: "seller",
    },
    {
      title: "Date Created",
      field: "dateCreated",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
  ];

  const handleLockProduct = (event, rowData) => {
    actionLockProduct("lock-product");
    setProductId(rowData.id);
    dispatch(toggleModal());
  };

  return (
    <MaterialTable
      title="Product"
      options={{ actionsColumnIndex: -1 }}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          adminApi
            .getProductPaging(params)
            .then((response) => {
              resolve({
                data: response.items,
                page: query.page,
                totalCount: response.totalRecords,
              });
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        })
      }
      columns={columns}
      actions={[
        {
          icon: LockIcon,
          tooltip: "Lock product",
          onClick: (event, rowData) => {
            handleLockProduct(event, rowData);
          },
        },
      ]}
    />
  );
};

export default ProductTable;
