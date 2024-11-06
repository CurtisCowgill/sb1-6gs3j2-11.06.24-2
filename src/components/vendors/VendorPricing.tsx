import React, { useState } from 'react';
import { Plus, Upload, TrendingUp, History, Edit2, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';
import PriceUpdateModal from './PriceUpdateModal';
import PriceHistoryModal from './PriceHistoryModal';
import BulkPriceUpdateModal from './BulkPriceUpdateModal';

interface PriceHistory {
  price: number;
  effectiveDate: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentPrice: number;
  priceHistory: PriceHistory[];
}

interface VendorPricingProps {
  vendorId?: string;
  products: Product[];
}

const VendorPricing: React.FC<VendorPricingProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    console.log('Updating price for product:', productId, 'New price:', newPrice);
    setShowPriceModal(false);
  };

  const handleBulkUpdate = (file: File) => {
    console.log('Processing bulk update file:', file);
    setShowBulkUpdateModal(false);
  };

  const downloadPriceTemplate = () => {
    console.log('Downloading price update template');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Product Pricing</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadPriceTemplate}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </button>
          <button
            onClick={() => setShowBulkUpdateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Update
          </button>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setShowPriceModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Trend
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => {
                const priceChange = product.priceHistory.length > 1
                  ? ((product.currentPrice - product.priceHistory[1].price) / product.priceHistory[1].price) * 100
                  : 0;

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(product.currentPrice)}/{product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TrendingUp className={`h-4 w-4 mr-1 ${
                          priceChange > 0 ? 'text-red-500' : priceChange < 0 ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm ${
                          priceChange > 0 ? 'text-red-600' : priceChange < 0 ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(product.priceHistory[0].effectiveDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowPriceModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowHistoryModal(true);
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <History className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showPriceModal && (
        <PriceUpdateModal
          product={selectedProduct}
          onClose={() => setShowPriceModal(false)}
          onUpdate={handlePriceUpdate}
        />
      )}

      {showHistoryModal && selectedProduct && (
        <PriceHistoryModal
          product={selectedProduct}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {showBulkUpdateModal && (
        <BulkPriceUpdateModal
          onClose={() => setShowBulkUpdateModal(false)}
          onUpload={handleBulkUpdate}
        />
      )}
    </div>
  );
};

export default VendorPricing;