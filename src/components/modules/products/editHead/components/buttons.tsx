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

  const handleDelete = () => {
    closeDelete()
    props.onDelete()
  }

  const { product } = props
  const productName =
    product && product.name && product.name.length > 0 ? product.name : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.deleteProduct}
        onClick={openDeletes}
      >
        <FontIcon color="#fff" className="material-icons">
          delete
        </FontIcon>
      </IconButton>
      {product && product.enabled && (
        <a href={product.url} target="_blank">
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.viewOnWebsite}
          >
            <FontIcon color="#fff" className="material-icons">
              open_in_new
            </FontIcon>
          </IconButton>
        </a>
      )}
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={productName}
        onCancel={closeDelete}
        onDelete={handleDelete}
      />
    </>
  )
}

export default Buttons
