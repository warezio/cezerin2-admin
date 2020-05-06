import React from "react"
import { Router } from "@reach/router"
import Login from "./login"
import Account from "../../components/modules/apps/account"
import Services from "../../components/modules/apps/services"
import ServiceDetails from "../../components/modules/apps/serviceDetails"
import AppDetails from "../../components/modules/apps/appDetails"

export default () => (
  <Router>
    <Services path="/apps" />
    <ServiceDetails path="/apps/service/:serviceId" />
    <AppDetails path="/apps/app/:appKey" />
    <Login path="/apps/login" />
    <Account path="/apps/account" />
  </Router>
)
