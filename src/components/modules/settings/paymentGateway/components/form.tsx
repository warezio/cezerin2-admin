import React, { useState, useEffect } from "react"
import { reduxForm } from "redux-form"

import messages from "../../../../lib/text"

import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import "./style.sass"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings.js"

const EditPaymentGatewayForm = props => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    props.onLoad()
  }, [])

  useEffect(
    nextProps => {
      if (nextProps.gateway !== props.gateway) {
        props.onLoad(nextProps.gateway)
      }
    },
    [props.count]
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { handleSubmit, pristine, submitting, initialValues } = props
  const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
    item => item.key === props.gateway
  )

  if (props.gateway && props.gateway.length > 0) {
    return (
      <>
        <RaisedButton
          onClick={handleOpen}
          label={messages.drawer_settings}
          style={{ margin: "15px 0 30px 0" }}
        />

        <Dialog
          title={gatewayDetails.name}
          modal={false}
          open={open}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
          onRequestClose={handleClose}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "initial", width: "100%" }}
          >
            <GatewaySettings gateway={props.gateway} />

            <div className="buttons">
              <FlatButton label={messages.cancel} onClick={handleClose} />
              <FlatButton
                label={messages.save}
                primary
                type="submit"
                onClick={handleClose}
                style={{ marginLeft: 12 }}
                disabled={pristine || submitting}
              />
            </div>
          </form>
        </Dialog>
      </>
    )
  }
  return null
}

export default reduxForm({
  form: "EditPaymentGatewayForm",
  enableReinitialize: true,
})(EditPaymentGatewayForm)
