import * as FaIcon from "react-icons/fa";
import * as BiIcon from "react-icons/bi";

import { toggleModal } from "../../redux/modal/modal.actions";
import { useDispatch } from "react-redux";

const handleClick = (title, imageUrl) => {
  //const dispatch = useDispatch();
  console.log(`You clicked me! ${title} ${imageUrl}`);
  //dispatch(toggleModal(true));
  //alert(`Are you sure to lock this account, id: ${id}`);
};

const title = "title";
const imageUrl = "imageUrl";
const hide = null;
const update = null;

export const columns = [
  {
    name: "Name",
    selector: (row) => row[title],
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => row[imageUrl],
    cell: (d) => {
      return (
        <div>
          <img height={100} width={150} src={d.imageUrl} />
        </div>
      );
    },
  },
  {
    name: "Hide",
    sortable: false,
    selector: (row) => row[hide],
    cell: (d) => [
      <>
        <BiIcon.BiHide
          key={d.id}
          onClick={handleClick.bind(this, d.id)}
          style={{ cursor: "pointer" }}
        />
      </>,
    ],
  },
  {
    name: "Edit",
    sortable: false,
    selector: (row) => row[update],
    cell: (d) => [
      <>
        <FaIcon.FaEdit
          key={d.id}
          onClick={handleClick.bind(this, d.title, d.imageUrl)}
          style={{ cursor: "pointer" }}
        />
      </>,
    ],
  },
];
