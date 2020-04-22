import React, { useState, useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField, SelectField } from 'redux-form-material-ui'

import api from '../../../../lib/api'
import messages from '../../../../lib/text'

import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import './style.sass'

const validate = (values) => {
	const errors = {}
	const requiredFields = []

	requiredFields.map((field) => {
		if (values && !values[field]) {
			errors[field] = messages.errors_required
		}
	})

	return errors
}

const SummaryForm = () => {
	state = {
		shippingMethods: [],
		paymentMethods: [],
		orderStatuses: [],
	}
	useEffect(() => fetchData(props.initialValues.id), [])

	fetchData = (orderId) => {
		const filter = {
			order_id: orderId,
		}

		api.orderStatuses.list().then(({ status, json }) => {
			set( orderStatuses: json })
		})

		api.shippingMethods.list(filter).then(({ status, json }) => {
			set( shippingMethods: json })
		})

		api.paymentMethods.list(filter).then(({ status, json }) => {
			set( paymentMethods: json })
		})
	}

	const {
		handleSubmit,
		pristine,
		submitting,
		initialValues,
		onCancel,
	} = props

	const statusItems = state.orderStatuses.map((item, index) => (
		<MenuItem key={index} value={item.id} primaryText={item.name} />
	))
	const shippingItems = state.shippingMethods.map((item, index) => (
		<MenuItem key={index} value={item.id} primaryText={item.name} />
	))
	const paymentItems = state.paymentMethods.map((item, index) => (
		<MenuItem key={index} value={item.id} primaryText={item.name} />
	))

	statusItems.push(
		<MenuItem
			key="none"
			value={null}
			primaryText={messages.noOrderStatus}
		/>
	)

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'initial',
				width: '100%',
			}}
		>
			<>
				<Field
					component={SelectField}
					fullWidth
					name="status_id"
					floatingLabelText={messages.orderStatus}
				>
					{statusItems}
				</Field>

				<Field
					component={TextField}
					fullWidth
					name="tracking_number"
					floatingLabelText={messages.trackingNumber}
				/>

				<Field
					component={SelectField}
					fullWidth
					name="shipping_method_id"
					floatingLabelText={messages.shippingMethod}
				>
					{shippingItems}
				</Field>

				<Field
					component={SelectField}
					fullWidth
					name="payment_method_id"
					floatingLabelText={messages.paymentsMethod}
				>
					{paymentItems}
				</Field>

				<Field
					component={TextField}
					fullWidth
					name="comments"
					floatingLabelText={messages.customerComment}
				/>

				<Field
					component={TextField}
					fullWidth
					name="note"
					floatingLabelText={messages.note}
				/>
				<Field
					component={TextField}
					fullWidth
					name="email"
					floatingLabelText={messages.email}
				/>
				<Field
					component={TextField}
					fullWidth
					name="mobile"
					floatingLabelText={messages.mobile}
				/>
			</>
			<div className="shippingButtons">
				<FlatButton label={messages.cancel} onClick={onCancel} />
				<FlatButton
					label={messages.save}
					primary
					type="submit"
					style={{ marginLeft: 12 }}
					disabled={pristine || submitting}
				/>
			</div>
		</form>
	)
}

export default reduxForm({
	form: 'SummaryForm',
	validate,
	enableReinitialize: true,
})(SummaryForm)
