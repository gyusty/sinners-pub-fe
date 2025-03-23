/* import { tableList } from "../../utils/Const";
import TableCard from "../../components/TableCard"; */
//para eliminar despues
import { useState } from "react";
import CreateOrderModal from "./CreateOrderModal";
import OrderTable from "./OrderTable";
import { useGetItems } from "../../hooks/useItems";
import { Order } from "../../utils/Interfaces";
import {
  useOrders,
  useCreateOrder,
  useUpdateOrder,
} from "../../hooks/useOrders";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const { data: itemList } = useGetItems();
  const { data: orderList, isLoading, error } = useOrders();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { mutate: updateOrder } = useUpdateOrder();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateOrder = (order: Order) => {
    if (order.id) {
      const updateValues = {
        owner: order.owner,
        itemList: order.itemList,
      };

      updateOrder({ id: order.id, updates: updateValues });
    } else {
      createOrder(order);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(undefined);
  };

  const setOrderToEdit = (order: Order) => {
    setSelectedOrder(order);
    handleOpenModal();
  };

  const payOrder = (order: Order) => {
    if (order.id) {
      const updateValues = {
        owner: order.owner,
        itemList: order.itemList,
        isPaid: order.isPaid,
      };
      updateOrder({ id: order.id, updates: updateValues });
    }
  };

  if (isLoading) return <p>Loading Orders...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-16 my-16 flex flex-col">
      <div className="flex justify-end items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-32"
          onClick={handleOpenModal}
          disabled={isPending}
        >
          Create Order
        </button>
      </div>
      <OrderTable
        orderList={orderList || []}
        selectOrder={setOrderToEdit}
        setOrderToUpdate={payOrder}
      ></OrderTable>
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateOrder}
        optionList={itemList}
        selectedOrder={selectedOrder}
      ></CreateOrderModal>
    </div>
  );
};

export default Home;
