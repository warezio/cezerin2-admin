import React from 'react'
import messages from 'lib/text'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
const { Fragment } = React

export default class Buttons extends React.Component {
	constructor(props) {
		super(props)
		state = {
			openDelete: false,
		}
	}

	showDelete = () => {
		setState({ openDelete: true })
	}

	closeDelete = () => {
		setState({ openDelete: false })
	}

	deleteStatus = () => {
		setState({ openDelete: false })
		props.onDelete(props.selected.id)
	}

	render() {
		const { selected, onDelete, onCreate } = props
		const statusName =
			selected && selected.name && selected.name.length > 0
				? selected.name
				: 'Draft'

		return (
			<span>
				{selected && (
					<Fragment>
						<IconButton
							touch
							tooltip={messages.actions_delete}
							tooltipPosition="bottom-left"
							onClick={showDelete}
						>
							<FontIcon color="#fff" className="material-icons">
								delete
							</FontIcon>
						</IconButton>
						<DeleteConfirmation
							open={state.openDelete}
							isSingle
							itemsCount={1}
							itemName={statusName}
							onCancel={closeDelete}
							onDelete={deleteStatus}
						/>
					</Fragment>
				)}
				<IconButton
					touch
					tooltipPosition="bottom-left"
					tooltip={messages.addOrderStatus}
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
