import React from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { List, ListItem } from 'material-ui/List'

export const CustomToggle = ({
	input,
	label,
	className = '',
	disabled = false,
	style,
}) => (
	<Toggle
		label={label}
		toggled={!!input.value}
		onToggle={(event, isInputChecked) => {
			input.onChange(isInputChecked)
		}}
		className={className}
		disabled={disabled}
		style={style}
	/>
)

export const NumberField = ({
	input,
	label,
	className = '',
	disabled = false,
	style,
}) => (
	<TextField
		floatingLabelText={label}
		fullWidth
		disabled={disabled}
		value={input.value}
		type="number"
		onChange={(event, value) => {
			let number = parseFloat(value)
			number = number || 0
			input.onChange(number)
		}}
	/>
)

export const ColorField = ({ input, meta: { touched, error } }) => (
	<input {...input} type="color" />
)

export class MultiSelect extends React.Component {
	constructor(props) {
		super(props)
		const values = Array.isArray(props.input.value) ? props.input.value : []
		state = {
			selectedItems: values,
		}
	}

	componentWillReceiveProps(nextProps) {
		const values = Array.isArray(nextProps.input.value)
			? nextProps.input.value
			: []
		if (values !== state.selectedItems) {
			setState({
				selectedItems: values,
			})
		}
	}

	onCheckboxChecked = (item) => {
		const { selectedItems } = state
		let newSelectedItems = []
		if (selectedItems.includes(item)) {
			newSelectedItems = selectedItems.filter((i) => i !== item)
		} else {
			newSelectedItems = [...selectedItems, item]
		}
		newSelectedItems.sort()
		setState({ selectedItems: newSelectedItems })
		props.input.onChange(newSelectedItems)
	}

	isCheckboxChecked = (item) => state.selectedItems.includes(item)

	render() {
		const { items, disabled, columns = 2 } = props
		const columnsClass = 12 / columns

		const elements = items.map((item, index) => (
			<div className={`col-xs-12 col-sm-${columnsClass}`} key={index}>
				{item && item !== '' && (
					<ListItem
						leftCheckbox={
							<Checkbox
								checked={isCheckboxChecked(item)}
								disabled={disabled}
								onCheck={(e, isChecked) => {
									onCheckboxChecked(item)
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
}
