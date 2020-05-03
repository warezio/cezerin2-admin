import React, { useState, useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import { List, ListItem } from "material-ui/List"
import Checkbox from "material-ui/Checkbox"

const SelectShippingMethodsField = props => {
  const ids = Array.isArray(props.input.value) ? props.input.value : []

  const [selectedIds, setSelectedIDs] = useState(ids)

  useEffect(
    nextProps => {
      const newIds = Array.isArray(nextProps.input.value)
        ? nextProps.input.value
        : []
      if (newIds !== selectedIds) {
        setSelectedIds(newIds)
      }
    },
    [props.count]
  )

  const onCheckboxChecked = methodId => {
    let ids = selectedIds
    if (ids.includes(methodId)) {
      ids = ids.filter(id => id !== methodId)
    } else {
      ids.push(methodId)
    }
    setSelectedIds(ids)
    props.input.onChange(ids)
  }

  const isCheckboxChecked = methodId => selectedIds.includes(methodId)

  const items = props.shippingMethods.map(method => (
    <ListItem
      key={method.id}
      leftCheckbox={
        <Checkbox
          checked={isCheckboxChecked(method.id)}
          onCheck={() => {
            onCheckboxChecked(method.id)
          }}
        />
      }
      primaryText={method.name}
      secondaryText={method.description}
    />
  ))

  return <List>{items}</List>
}

export default SelectShippingMethodsField
