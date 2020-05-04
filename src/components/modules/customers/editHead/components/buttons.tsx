import React, { useState } from "react"
import messages from "../../../../lib/text"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const openDeletes = () => {
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteOrder = () => {
    closeDelete()
    props.onDelete()
  }

  const { customer } = props
  const customerName =
    customer && customer.full_name && customer.full_name.length > 0
      ? customer.full_name
      : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.actions_delete}
        onClick={openDelete}
      >
        <FontIcon color="#fff" className="material-icons">
          delete
        </FontIcon>
      </IconButton>
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={customerName}
        onCancel={closeDelete}
        onDelete={props.onDelete}
      />
    </>
  )
}

export default Buttons
