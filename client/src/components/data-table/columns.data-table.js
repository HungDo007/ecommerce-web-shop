import * as FaIcon from "react-icons/fa";

const handleClick = (id) => {
  // console.log(`You clicked me! ${id}`);
  alert(`Are you sure to lock this account, id: ${id}`);
};

export const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Director",
    selector: "director",
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
    selector: "genres",
    sortable: true,
    cell: (d) => <span>{d.genres.join(", ")}</span>,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
  {
    name: "Action",
    sortable: false,
    selector: "null",
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
