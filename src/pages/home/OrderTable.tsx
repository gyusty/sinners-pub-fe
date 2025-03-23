import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import PayIcon from "../../utils/icons/PayIcon";
import ViewIcon from "../../utils/icons/ViewIcon";
import { Order } from "../../utils/Interfaces";

interface OrderTableProps {
  orderList: Order[];
  selectOrder: (item: Order) => void;
  setOrderToUpdate: (item: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orderList,
  selectOrder,
  setOrderToUpdate,
}) => {
  const [openConfirmModal, setConfirmModal] = useState(false);
  const [orderToPay, setOrderToPay] = useState<Order | null>(null);

  const returnOrder = (order: Order) => {
    selectOrder(order);
  };

  const handleOpenModal = (order: Order) => {
    setOrderToPay(order);
    setConfirmModal(true);
  };
  const handleCloseModal = () => {
    setConfirmModal(false);
  };
  const onConfirm = () => {
    if (orderToPay !== null) {
      setOrderToUpdate({ ...orderToPay, isPaid: true });
      handleCloseModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
              Customer
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
              Total
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList && orderList.length > 0 ? (
            orderList.map((order, index) => (
              <tr
                key={order.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
                  {order.owner}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
                  ${order.total?.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300">
                  {order.isPaid ? "Paid" : "Pending"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border border-gray-300 flex items-center space-x-2">
                  <button onClick={() => returnOrder(order)}>
                    <ViewIcon className="size-6 cursor-pointer text-blue-500 hover:text-blue-600" />
                  </button>
                  {!order.isPaid && (
                    <button onClick={() => handleOpenModal(order)}>
                      <PayIcon className="size-6 cursor-pointer text-green-500 hover:text-green-600" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-2 text-center text-sm text-gray-600 border border-gray-300"
              >
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmModal
        title={"Pay Order"}
        message={
          <>
            Are you sure you want to proceed with the payment for this order?{" "}
            <br />
            <strong>{orderToPay?.owner}</strong> X{" "}
            <strong>${orderToPay?.total?.toFixed(2)}</strong>
          </>
        }
        isOpen={openConfirmModal}
        onClose={handleCloseModal}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default OrderTable;
