import React from 'react'
import messages from '../../../../lib/text'
import DeleteConfirmation from '../../../../modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const Buttons = (props) => {
	state = {
		openDelete: false,
	}

	const showDelete = () => {
		setState({ openDelete: true })
	}

	const closeDelete = () => {
		setState({ openDelete: false })
	}

	const deleteGroup = () => {
		setState({ openDelete: false })
		props.onDelete(props.selected.id)
	}

	const { selected, onDelete, onCreate } = props
	const groupName =
		selected && selected.name && selected.name.length > 0
			? selected.name
			: 'Draft'

	return (
		<span>
			{selected && (
				<>
					<IconButton
						touch
						tooltip={messages.actions_delete}
						tooltipPosition="bottom-left"
						onClick={this.showDelete}
					>
						<FontIcon color="#fff" className="material-icons">
							delete
						</FontIcon>
					</IconButton>
					<DeleteConfirmation
						open={this.state.openDelete}
						isSingle
						itemsCount={1}
						itemName={groupName}
						onCancel={this.closeDelete}
						onDelete={this.deleteGroup}
					/>
				</>
			)}
			<IconButton
				touch
				tooltipPosition="bottom-left"
				tooltip={messages.customerGroups_titleAdd}
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
