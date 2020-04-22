import React from 'react'
import messages from 'lib/text'
import CategorySelect from 'modules/productCategories/select'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
const { Fragment } = React

export default const Buttons = () => {
	
		
		state = {
			categoryIdMoveTo: 'root',
			openMoveTo: false,
			openDelete: false,
		}
	}

	showMoveTo = () => {
		set( openMoveTo: true })
	}

	showDelete = () => {
		set( openDelete: true })
	}

	closeMoveTo = () => {
		set( openMoveTo: false })
	}

	closeDelete = () => {
		set( openDelete: false })
	}

	deleteCategory = () => {
		set( openDelete: false })
		props.onDelete(props.selected.id)
	}

	saveMoveTo = () => {
		set( openMoveTo: false })
		props.onMoveTo(state.categoryIdMoveTo)
	}

	selectMoveTo = (categoryId) => {
		set( categoryIdMoveTo: categoryId })
	}

	
		const { selected, onMoveUp, onMoveDown, onDelete, onCreate } = props
		const categoryName =
			selected && selected.name && selected.name.length > 0
				? selected.name
				: 'Draft'

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
					<Fragment>
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
							onClick={showDelete}
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
							open={state.openMoveTo}
							onRequestClose={closeMoveTo}
							autoScrollBodyContent
						>
							<CategorySelect
								onSelect={selectMoveTo}
								selectedId={state.categoryIdMoveTo}
								showRoot
								showAll={false}
							/>
						</Dialog>
						<DeleteConfirmation
							open={state.openDelete}
							isSingle
							itemsCount={1}
							itemName={categoryName}
							onCancel={closeDelete}
							onDelete={deleteCategory}
						/>
					</Fragment>
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
}
