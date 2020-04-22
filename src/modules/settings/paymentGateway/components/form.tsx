import React from 'react'
import { reduxForm } from 'redux-form'

import messages from 'lib/text'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import style from './style.css'
import { AVAILABLE_PAYMENT_GATEWAYS } from '../availablePaymentGateways'
import GatewaySettings from './gatewaySettings.js'

class EditPaymentGatewayForm extends React.Component {
	constructor(props) {
		super(props)
		state = {
			open: false,
		}
	}

	componentDidMount() {
		props.onLoad()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.gateway !== props.gateway) {
			props.onLoad(nextProps.gateway)
		}
	}

	handleOpen = () => {
		setState({ open: true })
	}

	handleClose = () => {
		setState({ open: false })
	}

	render() {
		const { handleSubmit, pristine, submitting, initialValues } = props
		const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
			(item) => item.key === props.gateway
		)

		if (props.gateway && props.gateway.length > 0) {
			return (
				<div>
					<RaisedButton
						onClick={handleOpen}
						label={messages.drawer_settings}
						style={{ margin: '15px 0 30px 0' }}
					/>

					<Dialog
						title={gatewayDetails.name}
						modal={false}
						open={state.open}
						autoScrollBodyContent
						contentStyle={{ width: 600 }}
						onRequestClose={handleClose}
					>
						<form
							onSubmit={handleSubmit}
							style={{ display: 'initial', width: '100%' }}
						>
							<GatewaySettings gateway={props.gateway} />

							<div className="buttons}>
								<FlatButton
									label={messages.cancel}
									onClick={handleClose}
								/>
								<FlatButton
									label={messages.save}
									primary
									type="submit"
									onClick={handleClose}
									style={{ marginLeft: 12 }}
									disabled={pristine || submitting}
								/>
							</div>
						</form>
					</Dialog>
				</div>
			)
		}
		return null
	}
}

export default reduxForm({
	form: 'EditPaymentGatewayForm',
	enableReinitialize: true,
})(EditPaymentGatewayForm)
