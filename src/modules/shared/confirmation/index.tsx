import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default const ConfirmationDialog = () => {
	
		
		state = {
			open: props.open,
		}
	}

	useEffect([prop.count](nextProps) {
		if (state.open !== nextProps.open) {
			set(
				open: nextProps.open,
			})
		}
	}

	handleCancel = () => {
		set( open: false })
		if (props.onCancel) {
			props.onCancel()
		}
	}

	handleSubmit = () => {
		set( open: false })
		if (props.onSubmit) {
			props.onSubmit()
		}
	}

	
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
