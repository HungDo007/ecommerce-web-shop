import * as FaIcon from "react-icons/fa";

const handleClick = (id) => {
  // console.log(`You clicked me! ${id}`);
  alert(`Are you sure to lock this account, id: ${id}`);
};

const title = "title";
const director = "director";
const genres = "genres";
const year = "year";
const action = null;

export const columns = [
  {
    name: "Title",
    selector: (row) => row[title],
    sortable: true,
  },
  {
    name: "Director",
    selector: (row) => row[director],
    sortable: true,
    cell: (d) => (
      <a
        href="https://google.com"
        target="_blank"
        rel="noreferrer"
        className="dlink"
      >
        {d.director}
      </a>
    ),
  },
  {
    name: "Genres",
    selector: (row) => row[genres],
    sortable: true,
    cell: (d) => <span>{d.genres.join(", ")}</span>,
  },
  {
    name: "Year",
    selector: (row) => row[year],
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
