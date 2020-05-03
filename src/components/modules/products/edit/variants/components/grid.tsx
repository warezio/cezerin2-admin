import React from 'react'
import { Link } from 'gatsby'

import messages from 'lib/text'

import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import './style.sass'

const VariantInput = () => {
	
		
		state = {
			value: props.value,
		}
		onChange = onChange.bind(this)
		onBlur = onBlur.bind(this)
	}

	onChange = (e) => {
		set( value: e.target.value })
	}

	onBlur = (e) => {
		props.onChange(props.variantId, state.value)
	}

	
		const { type, placeholder } = props
		const { value } = state

		return (
			<input
				type={type}
				className="textInput}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				min="0"
			/>
		)
	}
}

const VariantRow = ({
	variant,
	options,
	onSkuChange,
	onPriceChange,
	onStockChange,
	onWeightChange,
	onOptionChange,
	onDeleteVariant,
}) => {
	const cols = options.map((option, index) => {
		const variantOption = variant.options.find(
			(i) => i.option_id === option.id
		)
		const variantOptionValueId = variantOption
			? variantOption.value_id
			: null

		if (option.values && option.values.length > 0) {
			const menuItems = option.values
				.sort((a, b) =>
					a.name > b.name ? 1 : b.name > a.name ? -1 : 0
				)
				.map((value, index) => (
					<MenuItem
						key={index}
						value={value.id}
						primaryText={value.name}
					/>
				))
			return (
				<div key={option.id} className="gridCol}>
					<DropDownMenu
						value={variantOptionValueId}
						style={{ width: '100%' }}
						underlineStyle={{ border: 'none' }}
						onChange={(event, key, value) => {
							onOptionChange(variant.id, option.id, value)
						}}
					>
						{menuItems}
					</DropDownMenu>
				</div>
			)
		}
		return <div key={option.id} className="gridCol} />
	})

	return (
		<div className="gridRow}>
			<div className="gridCol}>
				<VariantInput
					type="text"
					placeholder=""
					variantId={variant.id}
					value={variant.sku}
					onChange={onSkuChange}
				/>
			</div>
			<div className="gridCol}>
				<VariantInput
					type="number"
					placeholder="0"
					variantId={variant.id}
					value={variant.price}
					onChange={onPriceChange}
				/>
			</div>
			<div className="gridCol}>
				<VariantInput
					type="number"
					placeholder="0"
					variantId={variant.id}
					value={variant.stock_quantity}
					onChange={onStockChange}
				/>
			</div>
			<div className="gridCol}>
				<VariantInput
					type="number"
					placeholder="0"
					variantId={variant.id}
					value={variant.weight}
					onChange={onWeightChange}
				/>
			</div>
			{cols}
			<div className="gridCol}>
				<IconButton
					title={messages.actions_delete}
					onClick={() => {
						onDeleteVariant(variant.id)
					}}
					tabIndex={-1}
				>
					<FontIcon color="#a1a1a1" className="material-icons">
						delete
					</FontIcon>
				</IconButton>
			</div>
		</div>
	)
}

const ProductVariantsGrid = ({
	settings,
	options,
	variants,
	createVariant,
	deleteVariant,
	createOption,
	productId,
	onSkuChange,
	onPriceChange,
	onStockChange,
	onWeightChange,
	onOptionChange,
}) => {
	const hasOptions = options && options.length > 0
	const hasVariants = variants && variants.length > 0

	const headRowCols = hasOptions
		? options.map((option, index) => (
				<div key={index} className="gridCol}>
					<Link
						title={messages.editProductOption}
						to={`/product/${productId}/option/${option.id}`}
					>
						{option.name}
					</Link>
				</div>
		  ))
		: null

	const variantRows = hasVariants
		? variants.map((variant, index) => (
				<VariantRow
					key={index}
					variant={variant}
					options={options}
					onSkuChange={onSkuChange}
					onPriceChange={onPriceChange}
					onStockChange={onStockChange}
					onWeightChange={onWeightChange}
					onOptionChange={onOptionChange}
					onDeleteVariant={deleteVariant}
				/>
		  ))
		: null

	return (
		<Paper className="paper-box" zDepth={1}>
			<div className="grid}>
				<div className="gridHeadRow}>
					<div className="gridCol}>{messages.products_sku}</div>
					<div className="gridCol}>
						{messages.products_price}
					</div>
					<div className="gridCol}>
						{messages.products_stock}
					</div>
					<div className="gridCol}>
						{messages.products_weight}
					</div>
					{headRowCols}
					<div className="gridCol} />
				</div>
				{variantRows}
			</div>
			<div className="innerBox}>
				<RaisedButton
					label={messages.addVariant}
					onClick={createVariant}
					style={{ marginRight: 20 }}
					disabled={!hasOptions}
				/>
				<RaisedButton
					label={messages.addOption}
					onClick={createOption}
				/>
			</div>
		</Paper>
	)
}

export default ProductVariantsGrid
