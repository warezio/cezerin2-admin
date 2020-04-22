import React from 'react'
import { Link } from 'react-router-dom'
import messages from 'lib/text'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
const { Fragment } = React

export default class Buttons extends React.Component {
	constructor(props) {
		super(props)
		state = {
			openDelete: false,
		}
	}

	openDelete = () => {
		setState({ openDelete: true })
	}

	closeDelete = () => {
		setState({ openDelete: false })
	}

	handleDelete = () => {
		closeDelete()
		props.onDelete()
	}

	render() {
		const { product } = props
		const productName =
			product && product.name && product.name.length > 0
				? product.name
				: 'Draft'

		return (
			<Fragment>
				<IconButton
					touch
					tooltipPosition="bottom-left"
					tooltip={messages.deleteProduct}
					onClick={openDelete}
				>
					<FontIcon color="#fff" className="material-icons">
						delete
					</FontIcon>
				</IconButton>
				{product && product.enabled && (
					<a href={product.url} target="_blank">
						<IconButton
							touch
							tooltipPosition="bottom-left"
							tooltip={messages.viewOnWebsite}
						>
							<FontIcon color="#fff" className="material-icons">
								open_in_new
							</FontIcon>
						</IconButton>
					</a>
				)}
				<DeleteConfirmation
					open={state.openDelete}
					isSingle
					itemsCount={1}
					itemName={productName}
					onCancel={closeDelete}
					onDelete={handleDelete}
				/>
			</Fragment>
		)
	}
}
