import React, { useState, useEffect } from "react"
import messages from "../../lib/text"
import api from "../../lib/api"
import moment from "moment"
import BarChart from "./barChart"
import * as utils from "./utils"

const OrdersBar = () => {
  const [ordersData, setOdersData] = useState(null)
  const [salesData, setSalesData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    const filter = {
      draft: false,
      cancelled: false,
      date_placed_min: moment()
        .subtract(1, "months")
        .hour(0)
        .minute(0)
        .second(0)
        .toISOString(),
    }

    api.orders
      .list(filter)
      .then(({ json }) => {
        const reportData = utils.getReportDataFromOrders(json)
        const ordersData = utils.getOrdersDataFromReportData(reportData)
        const salesData = utils.getSalesDataFromReportData(reportData)
        setOdersData(ordersData)
        setSalesData(salesData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <BarChart
        data={ordersData}
        legendDisplay
        title={messages.drawer_orders}
      />
      <BarChart
        data={salesData}
        legendDisplay={false}
        title={messages.salesReport}
      />
    </>
  )
}

export default OrdersBar
