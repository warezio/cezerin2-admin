import React, { useState } from "react"
import messages from "../../../../lib/text"
import CategorySelect from "../../../../modules/productCategories/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"

const Buttons = props => {
  const [categoryIDMoveTo, setCategoryIDMoveTo] = useState("root")
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const showMoveTo = () => {
    setOpenMoveTo(true)
  }

  const showDeletes = () => {
    setOpenDelete(true)
  }

  const closeMoveTo = () => {
    setOpenMoveTo(false)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteCategory = () => {
    setOpenDelete(false)
    props.onDelete(props.selected.id)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    props.onMoveTo(categoryIDMoveTo)
  }

  const selectMoveTo = categoryId => {
    setCategoryIDMoveTo(categoryId)
  }

  const { selected, onMoveUp, onMoveDown, onCreate } = props
  const categoryName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

  const actionsMoveTo = [
    <FlatButton
      label={messages.cancel}
      onClick={closeMoveTo}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.actions_moveHere}
      primary
      keyboardFocused
      onClick={saveMoveTo}
    />,
  ]

  return (
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveUp}
            onClick={onMoveUp}
          >
            <FontIcon color="#fff" className="material-icons">
              arrow_upward
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveDown}
            onClick={onMoveDown}
          >
            <FontIcon color="#fff" className="material-icons">
              arrow_downward
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={showDeletes}
          >
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveTo}
            onClick={showMoveTo}
          >
            <FontIcon color="#fff" className="material-icons">
              folder
            </FontIcon>
          </IconButton>
          <Dialog
            title={messages.actions_moveTo}
            actions={actionsMoveTo}
            modal={false}
            open={openMoveTo}
            onRequestClose={closeMoveTo}
            autoScrollBodyContent
          >
            <CategorySelect
              onSelect={selectMoveTo}
              selectedId={categoryIDMoveTo}
              showRoot
              showAll={false}
            />
          </Dialog>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={categoryName}
            onCancel={closeDelete}
            onDelete={deleteCategory}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.productCategories_titleAdd}
        onClick={onCreate}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </span>
  )
}

export default Buttons
