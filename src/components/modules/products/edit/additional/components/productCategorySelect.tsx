import React, { useState } from "react"
import messages from "../../../../../lib/text"
import CategorySelect from "../../../../../modules/productCategories/select"
import FontIcon from "material-ui/FontIcon"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import "./style.sass"

const ProductCategorySelect = props => {
  const [open, setOpen] = useState(false)

  const opens = () => {
    setOpen(true)
  }

  const handleSelect = categoryId => {
    props.input.onChange(categoryId)
  }

  const { categories, input } = props
  const selectedCategoryId = input.value
  const category = categories.find(item => item.id === selectedCategoryId)
  const categoryName = category ? category.name : ""

  const dialogButtons = [
    <FlatButton
      label={messages.cancel}
      onClick={close}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.save}
      primary
      keyboardFocused
      onClick={close}
    />,
  ]

  return (
    <>
      <Dialog
        title={messages.category}
        actions={dialogButtons}
        modal={false}
        open={open}
        onRequestClose={close}
        autoScrollBodyContent
      >
        <CategorySelect
          onSelect={handleSelect}
          selectedId={selectedCategoryId}
          opened={false}
        />
      </Dialog>
      <FlatButton
        label={categoryName}
        onClick={opens}
        icon={
          <FontIcon color="#777" className="material-icons">
            create
          </FontIcon>
        }
      />
    </>
  )
}

export default ProductCategorySelect
