import { Route, Routes } from 'react-router-dom';
import EmployeeList from '../../EmployeeArea/EmployeeList/EmployeeList';
import StarterPage from '../../HomeArea/StarterPage/StarterPage';
import ProductsList from '../../ProductsArea/ProductsList/ProductsList';
import PageNotFound from '../PageNotFound/PageNotFound';
import EditProduct from '../../ProductsArea/EditProduct/EditProduct';
import AddProduct from '../../ProductsArea/AddProduct/AddProduct';

function Router(): JSX.Element {
  return (
    <div className="Router">
      <Routes>
        <Route path="/home" element={<StarterPage />} />
        <Route path="/" element={<StarterPage />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/addProduct" element={<AddProduct />} />
        <Route path="/products/edit/:prodId" element={<EditProduct />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Router;
