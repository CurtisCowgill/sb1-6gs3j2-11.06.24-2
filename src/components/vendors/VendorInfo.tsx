import React from 'react';
import { Mail, Phone, Globe, Building2, Star, Clock } from 'lucide-react';

interface VendorInfoProps {
  vendor: {
    name: string;
    type: string;
    email: string;
    phone: string;
    website: string;
    metrics: {
      totalDeliveries: number;
      onTimeDelivery: number;
      qualityRating: number;
      averageResponseTime: string;
    };
  };
}

const VendorInfo: React.FC<VendorInfoProps> = ({ vendor }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Building2 className="h-5 w-5 mr-2" />
              <p>{vendor.type}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              <p>{vendor.email}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <p>{vendor.phone}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Globe className="h-5 w-5 mr-2" />
              <p>{vendor.website}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                <span>Quality Rating</span>
              </div>
              <span className="font-medium">{vendor.metrics.qualityRating}/5</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>On-Time Delivery</span>
              </div>
              <span className="font-medium">{vendor.metrics.onTimeDelivery}%</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                <span>Total Deliveries</span>
              </div>
              <span className="font-medium">{vendor.metrics.totalDeliveries}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Avg. Response Time</span>
              </div>
              <span className="font-medium">{vendor.metrics.averageResponseTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInfo;