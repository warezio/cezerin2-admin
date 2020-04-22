import React from 'react'
import { Link } from 'react-router-dom'
import messages from 'lib/text'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
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
		props.onDelete(props.webhook.id)
	}

	
		const { webhook } = props
		const webhookName =
			webhook && webhook.url && webhook.url.length > 0
				? webhook.url
				: 'Draft'

		if (webhook) {
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
						itemName={webhookName}
						onCancel={closeDelete}
						onDelete={deletePage}
					/>
				</Fragment>
			)
		}
		return null
	}
}
