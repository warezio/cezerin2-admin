import React from "react"
import ProductImport from "../../../components/modules/products/edit/additional/components/importproduct"
import ProductsList from "../../../components/modules/products/list"
import ProductsFilter from "../../../components/modules/products/listFilter"
import Categories from "../../../components/modules/productCategories/list"

export default () => (
  <div className="row row--no-gutter col-full-height">
    <div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
      <Categories showAll={true} showManage={true} />
      <ProductsFilter />
    </div>
    <div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
      <ProductImport />
      <ProductsList />
    </div>
  </div>
)
