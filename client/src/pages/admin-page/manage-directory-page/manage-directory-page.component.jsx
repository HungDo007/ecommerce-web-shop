import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "material-table";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import catalogApi from "../../../api/catalog-api";
import adminApi from "../../../api/admin-api";

import Notification from "../../../components/notification/notification.component";
import CustomDialog from "../../../components/dialog/dialog.component";
import AddComponentToDirectory from "../../../components/directory/add-directory/add-component-to-directory/add-component-to-directory.component";
import { toggleModal } from "../../../redux/modal/modal.actions";

const defaultImg = "/img/default-img.png";

const ManageDirectoryPage = () => {
  const initialValues = {
    directoryId: 0,
    imageSrc: defaultImg,
    imageFile: null,
  };

  const [values, setValues] = useState(initialValues);
  const { directoryId, imageSrc, imageFile } = values;

  const [directoryList, setDirectoryList] = useState([]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const modalIsOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Id",
      field: "id",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
      validate: (rowData) => {
        if (rowData.name === undefined || rowData.name === "") {
          return "Name is required";
        } else if (rowData.name) {
          let name = rowData.name.replace(/\s\s+/g, " ");
          if (!/^(?=.*).{5,}$/.test(name)) return "5 character required";
          else {
            return true;
          }
        }
      },
    },
    {
      title: "Image",
      field: "image",
      editComponent: () => (
        <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={(e) => handleReview(e)}
          />
          <label htmlFor="raised-button-file">
            <img
              style={{ objectFit: "cover", cursor: "pointer" }}
              height="100"
              width="150"
              src={imageSrc ? imageSrc : defaultImg}
              alt="directory"
            />
          </label>
        </div>
      ),
      render: (rowData) =>
        rowData.image ? (
          <img
            height="100"
            width="150"
            style={{ objectFit: "cover", border: "1px solid" }}
            src={process.env.REACT_APP_IMAGE_URL + rowData.image}
            aria-hidden
            alt="image of directory"
          />
        ) : (
          <img
            height="100"
            width="150"
            style={{ objectFit: "cover", border: "1px solid" }}
            src={defaultImg}
            aria-hidden
            alt="image of directory"
          />
        ),
    },
  ];

  const handleAddComponent = (event, rowData) => {
    setValues({ directoryId: rowData.id });
    dispatch(toggleModal());
  };

  function isFileImage(file) {
    const acceptedImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    return file && acceptedImageTypes.includes(file["type"]);
  }

  const handleReview = (event) => {
    if (event.target.files && event.target.files[0]) {
      let imageFile = event.target.files[0];
      if (isFileImage(imageFile)) {
        const reader = new FileReader();
        reader.onload = (x) => {
          setValues({
            imageFile: imageFile,
            imageSrc: x.target.result,
          });
        };
        reader.readAsDataURL(imageFile);
      } else {
        setNotify({
          isOpen: true,
          message: "Please select image file!",
          type: "warning",
        });
      }
    } else {
      setValues({
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
  };

  const fetchDirectoryList = async () => {
    try {
      const response = await catalogApi.getAllDirectory();
      setDirectoryList(response);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchDirectoryList();
  }, []);

  return (
    <div className="manage-account-block">
      <MaterialTable
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        title="Directory"
        columns={columns}
        data={directoryList}
        actions={[
          {
            icon: AddCircleIcon,
            tooltip: "Add components",
            onClick: (event, rowData) => {
              handleAddComponent(event, rowData);
            },
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              if (imageFile === undefined || imageFile === null) {
                setNotify({
                  isOpen: true,
                  message: "Please select image!",
                  type: "warning",
                });
                reject();
              } else {
                const formData = new FormData();
                formData.append("name", newData.name);
                formData.append("image", imageFile);

                adminApi
                  .addDirectory(formData)
                  .then((response) => {
                    fetchDirectoryList();
                    setValues({ ...values, imageSrc: defaultImg });
                    resolve(response);
                  })
                  .catch((error) => {
                    reject();
                  });
              }
            }),
          onRowAddCancelled: () => {
            setValues({
              imageFile: null,
              imageSrc: defaultImg,
            });
          },
          onRowUpdate: (newData) =>
            new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("id", newData.id);
              formData.append("name", newData.name.replace(/\s\s+/g, " "));
              if (imageFile) {
                formData.append("image", imageFile);
              }
              adminApi
                .editDirectory(formData)
                .then((response) => {
                  fetchDirectoryList();
                  resolve(response);
                })
                .catch((error) => {
                  reject();
                });
            }),
          onRowUpdateCancelled: () => {
            setValues({
              imageFile: null,
              imageSrc: defaultImg,
            });
          },
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              adminApi
                .removeDirectory(oldData.id)
                .then((response) => {
                  fetchDirectoryList();
                  resolve();
                })
                .catch((error) => {
                  reject();
                });
            }),
        }}
      />
      <CustomDialog
        title="Add component to directory"
        open={modalIsOpen}
        dispatch={dispatch}
      >
        <AddComponentToDirectory
          directoryId={directoryId}
          dispatch={dispatch}
          setNotify={setNotify}
        />
      </CustomDialog>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ManageDirectoryPage;
