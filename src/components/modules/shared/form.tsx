import React, { useEffect, useState } from "react"
import Toggle from "material-ui/Toggle"
import TextField from "material-ui/TextField"
import Checkbox from "material-ui/Checkbox"
import List, { ListItem } from "material-ui/List"

export const CustomToggle = ({
  input,
  label,
  className = "",
  disabled = false,
  style,
}) => {
  return (
    <Toggle
      label={label}
      toggled={!!input.value}
      onToggle={isInputChecked => {
        input.onChange(isInputChecked)
      }}
      className={className}
      disabled={disabled}
      style={style}
    />
  )
}

export const NumberField = ({ input, label, disabled = false }) => (
  <TextField
    floatingLabelText={label}
    fullWidth
    disabled={disabled}
    value={input.value}
    type="number"
    onChange={value => {
      let number = parseFloat(value)
      number = number || 0
      input.onChange(number)
    }}
  />
)

export const ColorField = ({ input }) => <input {...input} type="color" />

export const MultiSelect = props => {
  const values = Array.isArray(props.input.value) ? props.input.value : []
  const [selectedItems, setSelectedItems] = useState(values)

  useEffect(
    nextProps => {
      const values = Array.isArray(nextProps.input.value)
        ? nextProps.input.value
        : []
      if (values !== selectedItems) {
        setSelectedItems(values)
      }
    },
    [props.count]
  )

  const onCheckboxChecked = (item, props) => {
    let newSelectedItems = []
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter(i => i !== item)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    newSelectedItems.sort()
    setSelectedItems(newSelectedItems)
    props.input.onChange(newSelectedItems)
  }

  const isCheckboxChecked = item => selectedItems.includes(item)

  const { items, disabled, columns = 2 } = props
  const columnsconst = 12 / columns

  const elements = items.map((item, index) => (
    <div className={`col-xs-12 col-sm-${columnsClass}`} key={index}>
      {item && item !== "" && (
        <ListItem
          leftCheckbox={
            <Checkbox
              checked={isCheckboxChecked(item)}
              disabled={disabled}
              onCheck={() => {
                onCheckboxChecked(item, null)
              }}
            />
          }
          primaryText={item}
        />
      )}
    </div>
  ))

  return (
    <List>
      <div className="row">{elements}</div>
    </List>
  )
}
