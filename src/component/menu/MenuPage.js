import React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerType from "../../pages/type/CustomerType";
import HomePage from "../home/HomePage";
import Supplier from "../../pages/supplier/Supplier";
import Staff from "../../pages/staff/Staff";
import Category from "../../pages/category/Category";
import Customer from "../../pages/customer/Customer";
import Product from "../../pages/product/Product";
import Payment from "../../pages/payment/Payment";
import Import from "../../pages/import/Import";
import Invoice from "../../pages/invoice/Invoice";
import Sale from "../../pages/sale/Sale";
const MenuPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="/" element={<HomePage />} />
          <Route path="customer_type" element={<CustomerType />} />
          <Route path="supplier" element={<Supplier />} />
          <Route path="staff" element={<Staff />} />
          <Route path="category" element={<Category />} />
          <Route path="customer" element={<Customer />} />
          <Route path="product" element={<Product />} />
          <Route path="payment" element={<Payment />} />
          <Route path="import" element={<Import />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="sale" element={<Sale />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MenuPage;
