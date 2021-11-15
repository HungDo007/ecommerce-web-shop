import MaterialTable from "material-table";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import adminApi from "../../../../api/admin-api";

const defaultImg = "/img/default-img.png";

const LockedProductTable = ({ actionLockProduct, setProductId, dispatch }) => {
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

  const handleUnlockProduct = (event, rowData) => {
    actionLockProduct("unlock-product");
    setProductId(rowData.id);
    dispatch(toggleModal());
    //console.log(rowData);
  };

  return (
    <MaterialTable
      title="Locked Product"
      options={{ actionsColumnIndex: -1 }}
      data={(query) =>
        new Promise((resolve, reject) => {
          const params = {
            pageIndex: query.page + 1,
            pageSize: query.pageSize,
            keyword: query.search,
          };
          adminApi.getLockedProductPaging(params).then((response) => {
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
          icon: LockOpenIcon,
          tooltip: "Unlock user account",
          onClick: (event, rowData) => {
            handleUnlockProduct(event, rowData);
          },
        },
      ]}
    />
  );
};

export default LockedProductTable;
