import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';

interface PriceHistory {
  price: number;
  effectiveDate: string;
}

interface Product {
  id: string;
  name: string;
  unit: string;
  priceHistory: PriceHistory[];
}

interface PriceHistoryModalProps {
  product: Product;
  onClose: () => void;
}

const PriceHistoryModal: React.FC<PriceHistoryModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative inline-block w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">Price History</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Effective Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {product.priceHistory.map((history, index) => {
                  const previousPrice = index < product.priceHistory.length - 1
                    ? product.priceHistory[index + 1].price
                    : history.price;
                  const priceChange = ((history.price - previousPrice) / previousPrice) * 100;

                  return (
                    <tr key={history.effectiveDate}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(history.effectiveDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(history.price)}/{product.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index < product.priceHistory.length - 1 && (
                          <div className="flex items-center">
                            {priceChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                            )}
                            <span className={`text-sm ${
                              priceChange > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryModal;