import { SetStateAction } from 'react';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';

interface ProductQuantityProps {
  setProductQuantity: (prevProductQuantity: SetStateAction<number>) => void;
  productQuantity: number;
}

function ProductQuantity({
  setProductQuantity,
  productQuantity,
}: ProductQuantityProps) {
  const handleProductQuantity = (type: 'inc' | 'dec') => {
    setProductQuantity((prevProductQuantity) => {
      if (type === 'inc') {
        return prevProductQuantity + 1;
      }

      if (type === 'dec' && prevProductQuantity > 1) {
        return prevProductQuantity - 1;
      }

      return prevProductQuantity;
    });
  };

  return (
    <div className="flex gap-1 items-center px-2 py-1 rounded-lg border-2 border-gray-200">
      <button
        className="p-1 text-xl rounded-full hover:shadow hover:bg-gray-200 outline-0"
        onClick={() => handleProductQuantity('dec')}>
        <GrFormSubtract />
      </button>
      <input
        className="w-16 text-center bg-green-50 border-0 focus:ring-0"
        type="number"
        min="0"
        max="100"
        onChange={(event) => setProductQuantity(+event.target.value)}
        value={productQuantity}
      />
      <button
        className="p-1 text-xl rounded-full hover:shadow hover:bg-gray-200 outline-0"
        onClick={() => handleProductQuantity('inc')}>
        <GrFormAdd />
      </button>
    </div>
  );
}

export default ProductQuantity;
