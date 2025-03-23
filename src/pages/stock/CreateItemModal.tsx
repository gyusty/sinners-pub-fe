import { useState } from "react";
import { Item } from "../../utils/Interfaces";

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Item) => void;
}

const CreateItemModal: React.FC<CreateItemModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [errors, setErrors] = useState({
    name: false,
    quantity: false,
    unitPrice: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() === "",
      quantity: quantity <= 0,
      unitPrice: unitPrice <= 0,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    onSubmit({ name, quantity, unit_price: Number(unitPrice) });
    setName("");
    setQuantity(0);
    setUnitPrice(0);
    setErrors({ name: false, quantity: false, unitPrice: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Add a new Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.unitPrice ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.unitPrice && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
