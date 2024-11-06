import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Star } from 'lucide-react';
import { Customer } from '../../types';

interface CustomerInfoProps {
  customer: Customer;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              <p>{customer.email}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <p>{customer.phone}</p>
            </div>
            <div className="flex items-start text-gray-600">
              <MapPin className="h-5 w-5 mr-2 mt-1" />
              <div>
                <p>{customer.address.street}</p>
                <p>{`${customer.address.city}, ${customer.address.state} ${customer.address.zip}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Details</h3>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MessageSquare className="h-5 w-5 mr-2" />
              <p>Preferred: {customer.preferredCommunication}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Star className="h-5 w-5 mr-2" />
              <p>Rating: {customer.rating}/5</p>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-600">{customer.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;