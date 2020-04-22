import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class ConfirmationDialog extends React.Component {
	constructor(props) {
		super(props)
		state = {
			open: props.open,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (state.open !== nextProps.open) {
			setState({
				open: nextProps.open,
			})
		}
	}

	handleCancel = () => {
		setState({ open: false })
		if (props.onCancel) {
			props.onCancel()
		}
	}

	handleSubmit = () => {
		setState({ open: false })
		if (props.onSubmit) {
			props.onSubmit()
		}
	}

	render() {
		const {
			title,
			description,
			submitLabel,
			cancelLabel,
			modal = false,
		} = props

		const actions = [
			<FlatButton
				label={cancelLabel}
				onClick={handleCancel}
				style={{ marginRight: 10 }}
			/>,
			<FlatButton
				label={submitLabel}
				primary
				keyboardFocused
				onClick={handleSubmit}
			/>,
		]

		return (
			<Dialog
				title={title}
				actions={actions}
				modal={modal}
				open={state.open}
				onRequestClose={handleCancel}
			>
				<div style={{ wordWrap: 'break-word' }}>{description}</div>
			</Dialog>
		)
	}
}
