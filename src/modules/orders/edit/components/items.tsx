import React from 'react'
import { Link } from 'react-router-dom'

import messages from 'lib/text'
import * as helper from 'lib/helper'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import Dialog from 'material-ui/Dialog'
import './style.sass'

const iconButtonElement = (
	<IconButton touch>
		<FontIcon color="rgb(189, 189, 189)" className="material-icons">
			more_vert
		</FontIcon>
	</IconButton>
)

const ProductOption = ({ option, onChange, selectedOptions }) => {
	const selectedValue = selectedOptions[option.id]
	const values = option.values
		.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
		.map((value, index) => (
			<MenuItem key={index} value={value.id} primaryText={value.name} />
		))

	return (
		<SelectField
			floatingLabelText={option.name}
			fullWidth
			value={selectedValue}
			onChange={(event, index, value) => {
				onChange(option.id, value)
			}}
		>
			{values}
		</SelectField>
	)
}

const ProductOptions = ({ options, onChange, selectedOptions }) => {
	if (options) {
		const items = options.map((option, index) => (
			<ProductOption
				key={index}
				option={option}
				onChange={onChange}
				selectedOptions={selectedOptions}
			/>
		))
		return <div className="product-options">{items}</div>
	}
	return null
}

export const OrderItem = () => {
	
		
		state = {
			quantity: props.item.quantity,
			variantId: props.item.variant_id,
			selectedOptions: getOptionsByVariant(),
			selectedVariant: getCurrentVariant(),
			showEdit: false,
		}
	}

	showEditForm = () => {
		set( showEdit: true })
	}

	hideEditForm = () => {
		set( showEdit: false })
	}

	quantityChange = (event, index, value) => {
		set( quantity: value })
	}

	submitEditForm = () => {
		hideEditForm()
		const newVariantId =
			state.selectedVariant && state.selectedVariant.id
				? state.selectedVariant.id
				: state.variantId
		props.onItemUpdate(
			props.item.id,
			state.quantity,
			newVariantId
		)
	}

	deleteItem = () => {
		props.onItemDelete(props.item.id)
	}

	onOptionChange = (optionId, valueId) => {
		set( quantity: 1 })
		const { selectedOptions } = state

		if (valueId === '') {
			delete selectedOptions[optionId]
		} else {
			selectedOptions[optionId] = valueId
		}

		set( selectedOptions })
		findVariantBySelectedOptions()
	}

	findVariantBySelectedOptions = () => {
		const { selectedOptions } = state
		const { product } = props.item
		for (const variant of product.variants) {
			const variantMutchSelectedOptions = variant.options.every(
				(variantOption) =>
					selectedOptions[variantOption.option_id] ===
					variantOption.value_id
			)
			if (variantMutchSelectedOptions) {
				set( selectedVariant: variant })
				return
			}
		}

		set( selectedVariant: null })
	}

	getCurrentVariant = () => {
		const variantId = props.item.variant_id
		const { product } = props.item
		let variant = null

		if (
			variantId &&
			product &&
			product.variants &&
			product.variants.length > 0
		) {
			variant = product.variants.find((v) => v.id === variantId)
		}

		return variant
	}

	getOptionsByVariant = () => {
		const variantId = props.item.variant_id
		const { product } = props.item
		const selectedOptions = {}
		if (
			variantId &&
			product &&
			product.variants &&
			product.variants.length > 0
		) {
			const variant = product.variants.find((v) => v.id === variantId)
			if (variant) {
				for (const option of variant.options) {
					selectedOptions[option.option_id] = option.value_id
				}
			}
		}

		return selectedOptions
	}

	
		const { item, settings, allowEdit } = props

		const editFormActions = [
			<FlatButton
				label={messages.cancel}
				onClick={hideEditForm}
				style={{ marginRight: 10 }}
			/>,
			<FlatButton
				label={messages.save}
				primary
				onClick={submitEditForm}
			/>,
		]

		let { quantity } = state
		const { selectedOptions, selectedVariant } = state
		const { product } = item
		const price = helper.formatCurrency(item.price, settings)
		const priceTotal = helper.formatCurrency(item.price_total, settings)
		const discountTotal = helper.formatCurrency(
			item.discount_total,
			settings
		)
		const imageUrl =
			product && product.images && product.images.length > 0
				? product.images[0].url
				: null
		const thumbnailUrl = helper.getThumbnailUrl(imageUrl, 100)
		const productOptions = product ? product.options : []

		let maxItems = product ? product.stock_quantity : 0
		if (selectedVariant) {
			maxItems = selectedVariant.stock_quantity
		} else if (product && product.options && product.options.length > 0) {
			// product variant not exists with this options
			maxItems = 0
		}

		const quantityItems = []
		if (maxItems === 0) {
			quantityItems.push(
				<MenuItem
					key={0}
					value={0}
					primaryText={messages.products_outOfStock}
				/>
			)
			quantity = 0
		} else {
			for (let i = 1; i <= maxItems, i <= 100; i++) {
				quantityItems.push(
					<MenuItem key={i} value={i} primaryText={i.toString()} />
				)
			}
		}

		return (
			<div>
				<div className={`$"item} row row--no-gutter middle-xs`}>
					<div className="col-xs-2">
						{thumbnailUrl && thumbnailUrl !== '' && (
							<img
								src={thumbnailUrl}
								className="itemImage}
							/>
						)}
					</div>
					<div className={`$"itemName} col-xs-4`}>
						<Link to={`/product/${item.product_id}`}>
							{item.name}
						</Link>
						<div>{item.variant_name}</div>
						<div>
							{messages.products_sku}: {item.sku}
						</div>
					</div>
					<div className="col-xs-2" style={{ textAlign: 'right' }}>
						{price}
					</div>
					<div className="col-xs-1" style={{ textAlign: 'center' }}>
						x {item.quantity}
					</div>
					<div className="col-xs-2" style={{ textAlign: 'right' }}>
						{priceTotal}
						{item.discount_total > 0 && (
							<small className="itemDiscount}>
								{discountTotal}
							</small>
						)}
					</div>
					<div className="col-xs-1" style={{ textAlign: 'center' }}>
						{allowEdit && (
							<IconMenu
								iconButtonElement={iconButtonElement}
								targetOrigin={{
									horizontal: 'right',
									vertical: 'top',
								}}
								anchorOrigin={{
									horizontal: 'right',
									vertical: 'top',
								}}
							>
								<MenuItem onClick={showEditForm}>
									{messages.edit}
								</MenuItem>
								<MenuItem onClick={deleteItem}>
									{messages.actions_delete}
								</MenuItem>
							</IconMenu>
						)}
					</div>
				</div>
				<Divider />
				<Dialog
					title={messages.editOrderItem}
					actions={editFormActions}
					modal={false}
					open={state.showEdit}
					onRequestClose={hideEditForm}
					contentStyle={{ width: 400 }}
				>
					<div>
						<ProductOptions
							options={productOptions}
							onChange={onOptionChange}
							selectedOptions={selectedOptions}
						/>
						<SelectField
							floatingLabelText={messages.quantity}
							fullWidth
							value={quantity}
							onChange={quantityChange}
						>
							{quantityItems}
						</SelectField>
					</div>
				</Dialog>
			</div>
		)
	}
}

const OrderItems = ({ order, settings, onItemDelete, onItemUpdate }) => {
	const allowEdit = order.closed === false && order.cancelled === false
	const items = order.items.map((item, index) => (
		<OrderItem
			key={index}
			item={item}
			settings={settings}
			onItemDelete={onItemDelete}
			onItemUpdate={onItemUpdate}
			allowEdit={allowEdit}
		/>
	))
	return <div>{items}</div>
}

export default OrderItems
