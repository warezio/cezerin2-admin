import React from 'react'
import messages from 'lib/text'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

export default const Buttons = () => {
	
		
		state = {
			openDelete: false,
		}
	}

	showDelete = () => {
		set( openDelete: true })
	}

	closeDelete = () => {
		set( openDelete: false })
	}

	deleteGroup = () => {
		set( openDelete: false })
		props.onDelete(props.paymentMethod.id)
	}

	
		const { paymentMethod, onDelete } = props
		const methodName =
			paymentMethod && paymentMethod.name && paymentMethod.name.length > 0
				? paymentMethod.name
				: 'Draft'

		return (
			<span>
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
				<DeleteConfirmation
					open={state.openDelete}
					isSingle
					itemsCount={1}
					itemName={methodName}
					onCancel={closeDelete}
					onDelete={deleteGroup}
				/>
			</span>
		)
	}
}
