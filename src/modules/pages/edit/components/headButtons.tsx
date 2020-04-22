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
		props.onDelete(props.page.id)
	}

	
		const { page } = props
		const pageName =
			page && page.meta_title && page.meta_title.length > 0
				? page.meta_title
				: 'Draft'

		if (page && !page.is_system) {
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
					{page.enabled && (
						<a href={page.url} target="_blank">
							<IconButton
								touch
								tooltipPosition="bottom-left"
								tooltip={messages.viewOnWebsite}
							>
								<FontIcon
									color="#fff"
									className="material-icons"
								>
									open_in_new
								</FontIcon>
							</IconButton>
						</a>
					)}
					<DeleteConfirmation
						open={state.openDelete}
						isSingle
						itemsCount={1}
						itemName={pageName}
						onCancel={closeDelete}
						onDelete={deletePage}
					/>
				</Fragment>
			)
		}
		return null
	}
}
