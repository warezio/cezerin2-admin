import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import messages from 'lib/text'
import GroupSelect from 'modules/customerGroups/select'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Search from './search'

const Buttons = () => {
	state = {
		groupId: null,
		openSetGroup: false,
		openDelete: false,
	}

	showSetGroup = () => {
		setState({ openSetGroup: true })
	}

	showDelete = () => {
		setState({ openDelete: true })
	}

	closeSetGroup = () => {
		setState({ openSetGroup: false })
	}

	closeDelete = () => {
		setState({ openDelete: false })
	}

	deleteCustomers = () => {
		setState({ openDelete: false })
		props.onDelete()
	}

	saveSetGroup = () => {
		setState({ openSetGroup: false })
		props.onSetGroup(state.groupId)
	}

	selectSetGroup = (groupId) => {
		setState({ groupId })
	}

	const {
		search,
		setSearch,
		selectedCount,
		onDelete,
		onCreate,
		onEdit,
	} = props

	const actionsSetGroup = [
		<FlatButton
			label={messages.cancel}
			onClick={closeSetGroup}
			style={{ marginRight: 10 }}
		/>,
		<FlatButton
			label={messages.save}
			primary
			keyboardFocused
			onClick={saveSetGroup}
		/>,
	]

	return (
		<>
			<Search value={search} setSearch={setSearch} />
			{selectedCount > 0 && (
				<Fragment>
					{selectedCount == 1 && (
						<IconButton
							touch={true}
							tooltipPosition="bottom-left"
							tooltip={messages.actions_edit}
							onClick={onEdit}
						>
							<FontIcon color="#fff" className="material-icons">
								edit
							</FontIcon>
						</IconButton>
					)}
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
						tooltip={messages.customers_setGroup}
						onClick={showSetGroup}
					>
						<FontIcon color="#fff" className="material-icons">
							folder
						</FontIcon>
					</IconButton>
					<DeleteConfirmation
						open={state.openDelete}
						isSingle={false}
						itemsCount={selectedCount}
						onCancel={closeDelete}
						onDelete={deleteCustomers}
					/>
					<Dialog
						title={messages.customers_setGroup}
						actions={actionsSetGroup}
						modal={false}
						open={state.openSetGroup}
						onRequestClose={closeSetGroup}
						autoScrollBodyContent
					>
						<GroupSelect
							onSelect={selectSetGroup}
							selectedId={state.groupId}
							showRoot
							showAll={false}
						/>
					</Dialog>
				</Fragment>
			)}
			{selectedCount < 1 && (
				<IconButton
					touch={true}
					tooltipPosition="bottom-left"
					tooltip={messages.customers_titleAdd}
					onClick={onCreate}
				>
					<FontIcon color="#fff" className="material-icons">
						add
					</FontIcon>
				</IconButton>
			)}
		</>
	)
}

export default Buttons
