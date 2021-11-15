import * as React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import ManageCategoriesScreen from '../screens/manageCategories';
import CreateCategoryScreen from '../screens/createCategory';
import UpdateCategoryScreen from '../screens/updateCategory';
import ManagePropertiesScreen from '../screens/manageProperties';
import CreatePropertyScreen from '../screens/createProperty';
import UpdatePropertyScreen from '../screens/updateProperty';
import ManageVehiclesScreen from '../screens/manageVehicles';
import CreateVehicleScreen from '../screens/createVehicle';
import UpdateVehicleScreen from '../screens/updateVehicle';
import HomeScreen from '../screens/homeScreen';
import VehicleDetailsScreen from '../screens/vehicleDetails';

const Routes = () => {
  return (
    <Switch >
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/categories/manage" element={<ManageCategoriesScreen/>}/>
      <Route path="/categories/add" element={<CreateCategoryScreen/>}/>
      <Route path="/categories/update/:id" element={<UpdateCategoryScreen />} />
      <Route path="/properties/manage" element={<ManagePropertiesScreen/>}/>
      <Route path="/properties/add" element={<CreatePropertyScreen/>}/>
      <Route path="/properties/update/:id" element={<UpdatePropertyScreen />} />
      <Route path="/vehicles/manage" element={<ManageVehiclesScreen />} />
      <Route path="/vehicles/add" element={<CreateVehicleScreen />} />
      <Route path="/vehicles/update/:id" element={<UpdateVehicleScreen />} />
      <Route path="/vehicles/details/:id" element={<VehicleDetailsScreen />} />
    </Switch>
  )
}

export default Routes
