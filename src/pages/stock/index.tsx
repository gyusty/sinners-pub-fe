import { useState } from "react";
import Table from "../../components/Table";
import CreateItemModal from "./CreateItemModal";
import { tableStockHeader } from "../../utils/Const";
import { Item } from "../../utils/Interfaces";
import { useGetItems, useCreateItem } from "../../hooks/useItems";

const Stock: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: items, isLoading, error } = useGetItems();
  const { mutate: createItem, isPending } = useCreateItem();

  const handleAddItem = (item: Item) => {
    createItem(item);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading items...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-16 my-16 flex flex-col">
      <div className="flex justify-end items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-32"
          onClick={handleOpenModal}
          disabled={isPending}
        >
          Add Product
        </button>
      </div>
      <Table headers={tableStockHeader} body={items} />

      <CreateItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddItem}
      />
    </div>
  );
};

export default Stock;
