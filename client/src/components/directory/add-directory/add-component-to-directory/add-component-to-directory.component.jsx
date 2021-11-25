import { useEffect, useState } from "react";

import { Button, Checkbox, FormControlLabel } from "@material-ui/core";

import { toggleModal } from "../../../../redux/modal/modal.actions";

import adminApi from "../../../../api/admin-api";

import "./add-component-to-directory.styles.scss";

const AddComponentToDirectory = ({ directoryId, dispatch, setNotify }) => {
  const [compoOfDirect, setCompoOfDirect] = useState([]);

  useEffect(() => {
    const fetchComponentOfDirectory = async () => {
      try {
        const response = await adminApi.getComponentOfDirectory(directoryId);
        setCompoOfDirect(response);
      } catch (error) {
        console.log("Failed to fetch component of directory: ", error);
      }
    };

    fetchComponentOfDirectory();
  }, [directoryId]);

  useEffect(() => {
    const ls = compoOfDirect
      .filter((item) => item.isExists === true)
      .map((item) => item.id);
    setListCompoId(ls);
  }, [compoOfDirect]);

  const [listCompoId, setListCompoId] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      catId: directoryId,
      comps: listCompoId,
    };

    console.log(data);

    const addComponentToDirectory = async () => {
      try {
        const response = await adminApi.addComponentToDirectory(data);
        console.log(response);
        if (response.statusText === "OK" && response.status === 200) {
          setNotify({
            isOpen: true,
            message: "Add component successfully!",
            type: "success",
          });
        }
      } catch (error) {
        console.log("Failed to add component to directory: ", error);
      }
    };

    addComponentToDirectory();
    dispatch(toggleModal());
  };

  const handleOnChange = (position) => {
    const newCompoOfDirect = [...compoOfDirect];

    newCompoOfDirect[position] = {
      ...newCompoOfDirect[position],
      isExists: !newCompoOfDirect[position].isExists,
    };
    setCompoOfDirect(newCompoOfDirect);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-component-to-directory-container">
        {compoOfDirect.map((item, index) => (
          <FormControlLabel
            key={item.id}
            value="end"
            control={
              <Checkbox
                color="primary"
                size="medium"
                onChange={() => handleOnChange(index)}
                checked={item.isExists}
              />
            }
            label={item.name}
            labelPlacement="end"
          />
        ))}
      </div>
      <div className="add-component-to-directory-button">
        <Button
          type="submit"
          variant="contained"
          style={{
            borderRadius: 24,
            backgroundColor: "rgb(45 42 212)",
            padding: "10px 26px",
            fontSize: "14px",
            color: "white",
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddComponentToDirectory;
