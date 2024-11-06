import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Neighborhood from './locations/Neighborhood';
import NeighborhoodDetail from './locations/NeighborhoodDetail';
import City from './locations/City';
import CityDetail from './locations/CityDetail';
import County from './locations/County';
import CountyDetail from './locations/CountyDetail';
import InspectionJurisdiction from './locations/InspectionJurisdiction';
import InspectionJurisdictionDetail from './locations/InspectionJurisdictionDetail';
import LocationsList from './locations/LocationsList';

const Locations: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LocationsList />} />
      <Route path="/neighborhood" element={<Neighborhood />} />
      <Route path="/neighborhood/:id" element={<NeighborhoodDetail />} />
      <Route path="/city" element={<City />} />
      <Route path="/city/:id" element={<CityDetail />} />
      <Route path="/county" element={<County />} />
      <Route path="/county/:id" element={<CountyDetail />} />
      <Route path="/inspection" element={<InspectionJurisdiction />} />
      <Route path="/inspection/:id" element={<InspectionJurisdictionDetail />} />
    </Routes>
  );
};

export default Locations;