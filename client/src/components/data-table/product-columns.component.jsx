import * as FaIcon from "react-icons/fa";

const ProductColumns = () => {
  const name = "name";
  const imageUrl = "imageUrl";
  const price = "price";
  const edit = null;
  const remove = null;

  const handleEditPro = (id, name) => {
    alert(id);
  };

  const handleRemovePro = (id) => {
    alert(id);
  };
  const productColumns = [
    {
      id: "name",
      name: "Name",
      selector: (row) => row[name],
      sortable: true,
    },
    {
      id: "image",
      name: "Image",
      selector: (row) => row[imageUrl],
      cell: (d) => {
        return (
          <div>
            <img
              height={100}
              width={150}
              src={d.imageUrl}
              aria-hidden
              alt="image of product"
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      },
    },
    {
      id: "price",
      name: "Price",
      selector: (row) => row[price],
      sortable: true,
    },
    {
      id: "edit",
      name: "Edit",
      sortable: false,
      selector: (row) => row[edit],
      cell: (d) => [
        <>
          <FaIcon.FaEdit
            key={d.id}
            onClick={() => handleEditPro(d.id, d.name)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
    {
      id: "remove",
      name: "Remove",
      sortable: false,
      selector: (row) => row[remove],
      cell: (d) => [
        <>
          <FaIcon.FaLock
            key={d.id}
            onClick={() => handleRemovePro(d.id)}
            style={{ cursor: "pointer" }}
          />
        </>,
      ],
    },
  ];

  return productColumns;
};

export default ProductColumns;
