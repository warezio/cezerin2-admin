import React from "react"
import { Router } from "@reach/router"

import Head from "./../modules/head"

import Login from "./login"
import Logout from "./logout"
import Home from "./home"
import NotFound from "./notFound"
import Products from "./products"
import ProductImport from "./products/import"
import ProductDetails from "./products/edit"
import ProductCategories from "./products/categories"
import Customers from "./customers"
import CustomerDetails from "./customers/edit"
import CustomerGroups from "./customers/groups"
import Orders from "./orders"
import OrderDetails from "./orders/edit"
import OrderStatuses from "./orders/statuses"
import Pages from "./pages"
import PagesDetails from "./pages/edit"
import Settings from "./settings"
import Apps from "./apps"
import Files from "./files"

import {
  blue700,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  white,
  darkBlack,
  fullBlack,
} from "material-ui/styles/colors"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: blue700,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: blue700,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: blue700,
    shadowColor: fullBlack,
  },
  appBar: {},
})

function Routes() {
  return (
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="container">
          <div id="headContainer">
            <Head />
          </div>
          <div id="bodyContainer">
            <Home path="/" />
            <Login path="/login" />
            <Logout path="/logout" />
            <Products path="/products" />
            <ProductImport path="/products/import" />
            <ProductCategories path="/products/categories" />
            <Orders path="/orders" />
            <OrderStatuses path="/orders/statuses" />
            <OrderDetails path="/order/:orderId" />
            <Customers path="/customers" />
            <CustomerGroups path="/customers/groups" />
            <CustomerDetails path="/customer/:customerId" />
            <ProductDetails path="/product/:productId" />
            <Pages path="/pages" />
            <PagesDetails path="/pages/add" />
            <PagesDetails path="/pages/:pageId" />
            <Settings path="/settings" />
            <Apps path="/apps" />
            <Files path="/files" />
            <NotFound />
          </div>
        </div>
      </MuiThemeProvider>
    </Router>
  )
}

export default Routes
