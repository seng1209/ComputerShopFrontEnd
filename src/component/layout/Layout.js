import Container from "react-bootstrap/Container";
import { Link, BroswerRouter, Routes, Route, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Layout.css";
import CustomerType from "../../pages/type/CustomerType";
import { MdHome } from "react-icons/md";
import { FiType } from "react-icons/fi";

function Layout() {
  return (
    <ul className="menu">
      <Link className="menu-item" to="/">
        {/* <MdHome className="icons" /> */}
        <div>Home</div>
      </Link>
      <Link className="menu-item" to="/customer_type">
        {/* <FiType className="icons" />  */}
        <div>Customer Type</div>
      </Link>
      <Link className="menu-item" to="/staff">
        Staff
      </Link>
      <Link className="menu-item" to="/supplier">
        Supplier
      </Link>
      <Link className="menu-item" to="/category">
        Category
      </Link>
      <Link className="menu-item" to="/customer">
        Customer
      </Link>
      <Link className="menu-item" to="/product">
        Product
      </Link>
      <Link className="menu-item" to="/payment">
        Payment
      </Link>
      <Link className="menu-item" to="/sale">
        Sale
      </Link>
      <Link className="menu-item" to="/import">
        Import
      </Link>
      <Link className="menu-item" to="/invoice">
        Invoice
      </Link>
    </ul>
  );
}

export default Layout;
