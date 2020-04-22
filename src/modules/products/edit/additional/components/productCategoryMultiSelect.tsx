import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import messages from 'lib/text'
import CategoryMultiselect from 'modules/productCategories/components/multiselectList'
import FontIcon from 'material-ui/FontIcon'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import './style.sass'

const CategoryItemActions = ({ fields, index }) => (
	<a
		title={messages.actions_delete}
		onClick={() => fields.remove(index)}
		className="react-tagsinput-remove"
	/>
)

const CategoryItem = ({ categoryName, actions }) => (
	<span className="react-tagsinput-tag">
		{categoryName}
		{actions}
	</span>
)

export default class ProductCategoryMultiSelect extends React.Component {
	constructor(props) {
		super(props)
		state = {
			open: false,
		}
	}

	close = () => {
		setState({ open: false })
	}

	open = () => {
		setState({ open: true })
	}

	handleCheck = (categoryId) => {
		const selectedIds = props.fields.getAll()
		if (selectedIds && selectedIds.includes(categoryId)) {
			// remove
			props.fields.forEach((name, index, fields) => {
				if (fields.get(index) === categoryId) {
					fields.remove(index)
				}
			})
		} else {
			// add
			props.fields.push(categoryId)
		}
	}

	render() {
		const {
			categories,
			fields,
			meta: { touched, error, submitFailed },
		} = props
		const { open } = state
		const selectedIds = fields.getAll()

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
			<div className="react-tagsinput">
				<span>
					{fields.map((field, index) => {
						const categoryId = fields.get(index)
						const category = categories.find(
							(item) => item.id === categoryId
						)
						const categoryName = category ? category.name : '-'
						const actions = (
							<CategoryItemActions
								fields={fields}
								index={index}
							/>
						)
						return (
							<CategoryItem
								key={index}
								categoryName={categoryName}
								actions={actions}
							/>
						)
					})}
					<Dialog
						title={messages.additionalCategories}
						actions={dialogButtons}
						modal={false}
						open={open}
						onRequestClose={close}
						autoScrollBodyContent
					>
						<CategoryMultiselect
							items={categories}
							selectedIds={selectedIds}
							opened={false}
							onCheck={handleCheck}
						/>
					</Dialog>
					<FlatButton
						style={{ minWidth: 52 }}
						onClick={open}
						icon={
							<FontIcon color="#333" className="material-icons">
								add
							</FontIcon>
						}
					/>
				</span>
			</div>
		)
	}
}
