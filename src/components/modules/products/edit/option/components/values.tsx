import React, { useState } from "react"

import messages from "../../../../../lib/text"

import Paper from "material-ui/Paper"
import "./style.sass"
import { FontIcon, IconButton } from "material-ui"

const OptionValueEdit = props => {
  const [value, setValue] = useState(props.value.name)

  const onChange = e => {
    setValue(e.target.value)
  }

  const onBlur = e => {
    props.onChange(props.value.id, value)
  }

  const onDelete = () => {
    props.onDelete(props.value.id)
  }

  return (
    <div className="gridRow">
      <div className="gridColInput">
        <input
          type="text"
          className="textInput"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      <div className="gridColButton">
        <IconButton
          title={messages.actions_delete}
          onClick={onDelete}
          tabIndex={-1}
        >
          <FontIcon color="#a1a1a1" className="material-icons">
            delete
          </FontIcon>
        </IconButton>
      </div>
    </div>
  )
}

const OptionValueAdd = props => {
  const [value, setValue] = useState("")

  const onChange = e => {
    setValue(e.target.value)
  }

  const onCreate = props => {
    if (value !== "") {
      props.onCreate(value)
      setValue("")
    }
  }

  function handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) {
      onCreate(props)
    }
  }

  return (
    <div className="gridRow">
      <div className="gridColInput">
        <input
          type="text"
          className="textInput"
          value={value}
          placeholder={messages.newOptionValue}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="gridColButton">
        <IconButton title={messages.add} onClick={onCreate} tabIndex={-1}>
          <FontIcon color="#a1a1a1" className="material-icons">
            add_circle
          </FontIcon>
        </IconButton>
      </div>
    </div>
  )
}

const OptionValues = ({
  optionValues,
  createOptionValue,
  updateOptionValue,
  deleteOptionValue,
}) => {
  const valueRows = optionValues.map((value, index) => (
    <OptionValueEdit
      key={index}
      value={value}
      onChange={updateOptionValue}
      onDelete={deleteOptionValue}
    />
  ))

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className="blue-title" style={{ padding: "20px 30px" }}>
        {messages.optionValues}
      </div>
      <div className="grid">
        {valueRows}
        <OptionValueAdd onCreate={createOptionValue} />
      </div>
    </Paper>
  )
}

export default OptionValues
