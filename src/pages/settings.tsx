import React from "react"
import { Router, Link } from "@reach/router"
import messages from "../components/lib/text"

import { List, ListItem } from "material-ui/List"
import FontIcon from "material-ui/FontIcon"

import General from "../components/modules/settings/general"
import GeneralLogo from "../components/modules/settings/generalLogo"
import Theme from "../components/modules/settings/theme"
import Shipping from "../components/modules/settings/shipping"
import ShippingEdit from "../components/modules/settings/shippingEdit"
import Payments from "../components/modules/settings/payments"
import PaymentsEdit from "../components/modules/settings/paymentsEdit"
import Tokens from "../components/modules/settings/tokens/list"
import TokensEdit from "../components/modules/settings/tokens/edit"
import Email from "../components/modules/settings/email"
import Import from "../components/modules/settings/import"
import GoogleSpredsheet from "../components/modules/settings/googlespreadsheet"
import Smtp from "../components/modules/settings/smtp"
import EmailTemplate from "../components/modules/settings/emailTemplates"
import Checkout from "../components/modules/settings/checkout"
import CheckoutFields from "../components/modules/settings/checkoutFields"
import Redirects from "../components/modules/settings/redirects/list"
import RedirectsEdit from "../components/modules/settings/redirects/edit"
import Webhooks from "../components/modules/settings/webhooks/list"
import WebhooksEdit from "../components/modules/settings/webhooks/edit"

const styles = {
  link: {
    color: "inherit",
    textDecoration: "none",
    fontWeight: "inherit",
    display: "block",
  },
  linkActive: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
}

const SettingsMenu = () => (
  <List>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings"
      exact
    >
      <ListItem
        primaryText={messages.settings_general}
        leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/shipping"
    >
      <ListItem
        primaryText={messages.settings_shipping}
        leftIcon={
          <FontIcon className="material-icons">local_shipping</FontIcon>
        }
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/payments"
    >
      <ListItem
        primaryText={messages.settings_payments}
        leftIcon={<FontIcon className="material-icons">payment</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/theme"
    >
      <ListItem
        primaryText={messages.settings_theme}
        leftIcon={<FontIcon className="material-icons">palette</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/checkout"
    >
      <ListItem
        primaryText={messages.settings_checkout}
        leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/email"
    >
      <ListItem
        primaryText={messages.settings_emails}
        leftIcon={<FontIcon className="material-icons">email</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/import"
      exact={true}
    >
      <ListItem
        primaryText={messages.drawer_importing}
        leftIcon={<FontIcon className="material-icons">get_app</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/redirects"
    >
      <ListItem
        primaryText={messages.redirects}
        leftIcon={<FontIcon className="material-icons">swap_calls</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/webhooks"
    >
      <ListItem
        primaryText={messages.webhooks}
        leftIcon={<FontIcon className="material-icons">http</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/tokens"
    >
      <ListItem
        primaryText={messages.settings_tokens}
        leftIcon={<FontIcon className="material-icons">vpn_key</FontIcon>}
      />
    </Link>
    {/* <NavLink style={styles.link} activeStyle={styles.linkActive} to="/settings/taxes"><ListItem primaryText={messages.settings_taxes} leftIcon={<FontIcon className="material-icons">attach_money</FontIcon>}/></NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/settings/security"><ListItem primaryText={messages.settings_security} leftIcon={<FontIcon className="material-icons">security</FontIcon>}/></NavLink> */}
  </List>
)

const Settings = () => (
  <div className="row row--no-gutter col-full-height">
    <div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
      <SettingsMenu />
    </div>
    <div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
      <Router>
        <General path="/settings" />
        <GeneralLogo path="/settings/general/logo" />
        <Theme path="/settings/theme" />
        <Shipping path="/settings/shipping" />
        <ShippingEdit path="/settings/shipping/add" />
        <ShippingEdit path="/settings/shipping/:methodId" />
        <Payments path="/settings/payments" />
        <PaymentsEdit path="/settings/payments/add" />
        <PaymentsEdit path="/settings/payments/:methodId" />
        <Tokens path="/settings/tokens" />
        <TokensEdit path="/settings/tokens/add" />
        <TokensEdit path="/settings/tokens/:tokenId" />
        <Email path="/settings/email" />
        <Smtp path="/settings/email/smtp" />
        <EmailTemplate path="/settings/email/templates/:templateName" />
        <Import path="/settings/import" />
        <GoogleSpredsheet path="/settings/import/googlespreadsheet" />
        <Checkout path="/settings/checkout" />
        <CheckoutFields path="/settings/checkout/fields/:fieldName" />
        <Redirects path="/settings/redirects" />
        <RedirectsEdit path="/settings/redirects/add" />
        <RedirectsEdit path="/settings/redirects/:redirectId" />
        <Webhooks path="/settings/webhooks" />
        <WebhooksEdit path="/settings/webhooks/add" />
        <WebhooksEdit path="/settings/webhooks/:webhookId" />
      </Router>
    </div>
  </div>
)

export default Settings
