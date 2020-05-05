import React, { useState, useEffect } from "react"
import messages from "../../lib/text"
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

  const close = () => {
    setOpen(false)
  }

  const handleCancel = props => {
    close()
    if (props.onCancel) {
      props.onCancel()
    }
  }

  const handleDelete = () => {
    close()
    if (props.onDelete) {
      props.onDelete()
    }
  }

  const { isSingle = true, itemsCount = 0, itemName = "" } = props

  const title = isSingle
    ? messages.singleDeleteTitle.replace("{name}", itemName)
    : messages.multipleDeleteTitle.replace("{count}", itemsCount)

  const description = isSingle
    ? messages.singleDeleteDescription
    : messages.multipleDeleteDescription.replace("{count}", itemsCount)

  const actions = [
    <FlatButton
      label={messages.cancel}
      onClick={handleCancel}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.actions_delete}
      primary
      keyboardFocused
      onClick={handleDelete}
    />,
  ]

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleCancel}
      contentStyle={{ maxWidth: 540 }}
      titleStyle={{ fontSize: "18px", lineHeight: "28px" }}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
    </Dialog>
  )
}

export default ConfirmationDialog
