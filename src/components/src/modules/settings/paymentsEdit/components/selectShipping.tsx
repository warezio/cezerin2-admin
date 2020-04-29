import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

export default const SelectShippingMethodsField = () => {
	
		
		const ids = Array.isArray(props.input.value) ? props.input.value : []
		state = {
			selectedIds: ids,
		}
	}

	useEffect([prop.count](nextProps) {
		const newIds = Array.isArray(nextProps.input.value)
			? nextProps.input.value
			: []
		if (newIds !== state.selectedIds) {
			set(
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
		set( selectedIds: ids })
		props.input.onChange(ids)
	}

	isCheckboxChecked = (methodId) => state.selectedIds.includes(methodId)

	
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
