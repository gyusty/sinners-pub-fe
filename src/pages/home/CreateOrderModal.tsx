import { useEffect, useState } from "react";
import { Item, Order } from "../../utils/Interfaces";
import AddIcon from "../../utils/icons/AddIcon";
import RoundTable from "../../components/RoundTable";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Order) => void;
  optionList?: Item[];
  selectedOrder?: Order;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  optionList,
  selectedOrder,
}) => {
  const [itemList, setItemList] = useState<Array<Item>>([]);
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [optionSelected, setOptionSelected] = useState("");
  const [maxQuantity, setMaxQuantity] = useState(0);

  useEffect(() => {
    if (selectedOrder) {
      setItemList(
        selectedOrder?.itemList?.map((item) => {
          return { ...item, canUpdate: false };
        })
      );
      setCustomerName(selectedOrder.owner);
    }
  }, [selectedOrder]);

  const addItem = () => {
    if (quantity > 0) {
      const selectedOption = optionList?.find(
        (item) => item.name === optionSelected
      );

      setItemList((prevItemList) => [
        ...prevItemList,
        {
          name: optionSelected,
          quantity,
          unit_price: selectedOption?.unit_price,
          canUpdate: true,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      owner: customerName,
      itemList: itemList,
      id: selectedOrder?.id,
    });

    closeModal();
  };

  const updateMaxQuantity = (value: string) => {
    const selectedOption = optionList?.find((item) => item.name === value);
    setMaxQuantity(selectedOption?.quantity || 0);
  };

  const closeModal = () => {
    setItemList([]);
    setCustomerName("");
    setQuantity(0);
    setOptionSelected("");
    onClose();
  };

  const removeItem = (index: number) => {
    setItemList((prevItemList) => prevItemList.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Create Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              disabled={selectedOrder?.isPaid}
            />
          </div>

          {itemList.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rounds
              </label>
              <div>
                <RoundTable
                  itemList={itemList}
                  removeItem={removeItem}
                ></RoundTable>
              </div>
            </div>
          )}

          {!selectedOrder?.isPaid && (
            <div>
              <div className="flex items-center space-x-2 mt-8">
                <select
                  value={optionSelected}
                  onChange={(e) => {
                    const optionName = e.target.value;
                    setOptionSelected(optionName);
                    updateMaxQuantity(optionName);
                  }}
                  className={`flex-grow mt-1 block border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {optionList?.map((item, index) => (
                    <option key={index + 1} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQuantity(value >= 0 ? value : 0);
                  }}
                  className={`w-20 mt-1 block border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    addItem();
                  }}
                  className={`mt-0.5 ${
                    quantity > 0 &&
                    optionSelected !== "" &&
                    quantity <= maxQuantity
                      ? "text-green-500 hover:text-green-600 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed cursor-not-allowed"
                  }`}
                >
                  <AddIcon className="size-6" />
                </div>
              </div>
              <div className="mt-4 mb-8">
                {quantity > maxQuantity && (
                  <span className="text-red-500 text-sm">
                    This item has a limit of {maxQuantity}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              {selectedOrder?.isPaid ? "Close" : "Cancel"}
            </button>

            {!selectedOrder?.isPaid && (
              <button
                type="submit"
                disabled={itemList.length === 0 || customerName.trim() === ""}
                className={`px-4 py-2 rounded-md ${
                  itemList.length === 0 || customerName.trim() === ""
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {selectedOrder ? "Edit" : "Add"} Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderModal;
