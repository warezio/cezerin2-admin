import React from "react"
import OrdersList from "../../components/modules/orders/list"
import OrdersFilter from "../../components/modules/orders/listFilter"
import Statuses from "../../components/modules/orderStatuses/list"

export default () => (
  <div className="row row--no-gutter col-full-height">
    <div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
      <Statuses showAll showManage />
      <OrdersFilter />
    </div>
    <div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
      <OrdersList />
    </div>
  </div>
)
