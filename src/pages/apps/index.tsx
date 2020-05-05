import React from "react"
import { Router } from "@reach/router"
import Login from "../../routes/apps/login"
import Account from "../../modules/apps/account"
import Services from "../../modules/apps/services"
import ServiceDetails from "../../modules/apps/serviceDetails"
import AppDetails from "../../modules/apps/appDetails"

export default () => (
  <Router>
    <Services path="/apps" />
    <ServiceDetails path="/apps/service/:serviceId" />
    <AppDetails path="/apps/app/:appKey" />
    <Login path="/apps/login" />
    <Account path="/apps/account" />
  </Router>
)
