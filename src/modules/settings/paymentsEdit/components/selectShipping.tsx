import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

export default class SelectShippingMethodsField extends React.Component {
	constructor(props) {
		super(props)
		const ids = Array.isArray(props.input.value) ? props.input.value : []
		state = {
			selectedIds: ids,
		}
	}

	componentWillReceiveProps(nextProps) {
		const newIds = Array.isArray(nextProps.input.value)
			? nextProps.input.value
			: []
		if (newIds !== state.selectedIds) {
			setState({
				selectedIds: newIds,
			})
		}
	}

	onCheckboxChecked = (methodId) => {
		let ids = state.selectedIds
		if (ids.includes(methodId)) {
			ids = ids.filter((id) => id !== methodId)
		} else {
			ids.push(methodId)
		}
		setState({ selectedIds: ids })
		props.input.onChange(ids)
	}

	isCheckboxChecked = (methodId) => state.selectedIds.includes(methodId)

	render() {
		const items = props.shippingMethods.map((method) => (
			<ListItem
				key={method.id}
				leftCheckbox={
					<Checkbox
						checked={isCheckboxChecked(method.id)}
						onCheck={(e, isChecked) => {
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
}
