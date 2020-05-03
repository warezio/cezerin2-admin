import React, { useState, useEffect } from "react"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"

const ConfirmationDialog = props => {
  const [open, setOpen] = useState(props.open)

  useEffect(
    nextProps => {
      if (open !== nextProps.open) {
        setOpen(nextProps.open)
      }
    },
    [props.count]
  )

  const handleCancel = () => {
    setOpen(false)
    if (props.onCancel) {
      props.onCancel()
    }
  }

  const handleSubmit = () => {
    setOpen(false)
    if (props.onSubmit) {
      props.onSubmit()
    }
  }

  const { title, description, submitLabel, cancelLabel, modal = false } = props

  const actions = [
    <FlatButton
      label={cancelLabel}
      onClick={handleCancel}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={submitLabel}
      primary
      keyboardFocused
      onClick={handleSubmit}
    />,
  ]

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={modal}
      open={open}
      onRequestClose={handleCancel}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
    </Dialog>
  )
}

export default ConfirmationDialog
