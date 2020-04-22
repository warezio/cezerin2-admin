import React from 'react'
import messages from 'lib/text'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
const { Fragment } = React

export default const Buttons = () => {
	
		
		state = {
			openDelete: false,
		}
	}

	openDelete = () => {
		set( openDelete: true })
	}

	closeDelete = () => {
		set( openDelete: false })
	}

	deletePage = () => {
		set( openDelete: false })
		props.onDelete(props.redirect.id)
	}

	
		const { redirect } = props
		const redirectName =
			redirect && redirect.from && redirect.from.length > 0
				? redirect.from
				: 'Draft'

		if (redirect) {
			return (
				<Fragment>
					<IconButton
						touch
						tooltipPosition="bottom-left"
						tooltip={messages.actions_delete}
						onClick={openDelete}
					>
						<FontIcon color="#fff" className="material-icons">
							delete
						</FontIcon>
					</IconButton>
					<DeleteConfirmation
						open={state.openDelete}
						isSingle
						itemsCount={1}
						itemName={redirectName}
						onCancel={closeDelete}
						onDelete={deletePage}
					/>
				</Fragment>
			)
		}
		return null
	}
}
