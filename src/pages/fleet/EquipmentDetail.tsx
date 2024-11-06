import React from 'react';
import { useParams } from 'react-router-dom';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Equipment Details - {id}</h1>
    </div>
  );
};

export default EquipmentDetail;