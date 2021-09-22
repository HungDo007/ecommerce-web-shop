import * as FaIcon from "react-icons/fa";

const handleClick = (id) => {
  // console.log(`You clicked me! ${id}`);
  alert(`Are you sure to lock this account, id: ${id}`);
};

const username = "username";
const firstName = "firstName";
const email = "email";
const address = "address";
const action = null;

export const columns = [
  {
    name: "Username",
    selector: (row) => row[username],
    sortable: true,
    cell: (d) => (
      <a href="#" target="_blank" rel="noreferrer">
        {d.username}
      </a>
    ),
  },
  {
    name: "Name",
    selector: (row) => row[firstName],
    sortable: true,
    cell: (d) => (
      <span>
        {d.firstName} {d.lastName}
      </span>
    ),
  },
  {
    name: "Email",
    selector: (row) => row[email],
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row[address],
    sortable: true,
  },
  {
    name: "Action",
    sortable: false,
    selector: (row) => row[action],
    cell: (d) => [
      <>
        <FaIcon.FaLock
          key={d.id}
          onClick={handleClick.bind(this, d.id)}
          style={{ cursor: "pointer" }}
        />
      </>,
    ],
  },
];
