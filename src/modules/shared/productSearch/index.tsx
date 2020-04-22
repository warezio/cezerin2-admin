import React from 'react'

import messages from 'lib/text'
import api from 'lib/api'
import * as helper from 'lib/helper'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'

const SearchBox = ({ text, onChange }) => (
	<TextField
		fullWidth
		floatingLabelText={messages.products_search}
		onChange={onChange}
		value={text}
	/>
)

const SearchResult = ({ products, selectedId, settings, onSelect }) => {
	const rows = products.map((product, index) => {
		const priceFormatted = helper.formatCurrency(product.price, settings)
		const isSelected = product.id === selectedId

		return (
			<TableRow key={index} selected={isSelected}>
				<TableRowColumn>{product.name}</TableRowColumn>
				<TableRowColumn>{product.category_name}</TableRowColumn>
				<TableRowColumn>{product.sku}</TableRowColumn>
				<TableRowColumn style={{ textAlign: 'right' }}>
					{priceFormatted}
				</TableRowColumn>
			</TableRow>
		)
	})

	return (
		<Table
			height="400px"
			selectable
			multiSelectable={false}
			onRowSelection={onSelect}
		>
			<TableBody>{rows}</TableBody>
		</Table>
	)
}

export default const ConfirmationDialog = () => {
	
		
		state = {
			open: props.open,
			products: [],
			search: '',
			selectedId: null,
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
			props.onSubmit(state.selectedId)
		}
	}

	handleRowSelection = (selectedRows) => {
		if (selectedRows && selectedRows.length > 0) {
			const selectedIndex = selectedRows[0]
			const selectedProductId =
				state.products && state.products.length >= selectedIndex
					? state.products[selectedIndex].id
					: null
			set(
				selectedId: selectedProductId,
			})
		}
	}

	handleSearch = (event, value) => {
		set( search: value })

		api.products
			.list({
				limit: 50,
				enabled: true,
				discontinued: false,
				fields:
					'id,name,category_id,category_name,sku,enabled,discontinued,price,on_sale,regular_price',
				search: value,
			})
			.then((productsResponse) => {
				set(
					products: productsResponse.json.data,
				})
			})
	}

	
		const {
			title,
			submitLabel,
			cancelLabel,
			modal = false,
			settings,
		} = props

		const actions = [
			<FlatButton
				label={cancelLabel}
				onClick={handleCancel}
				style={{ marginRight: 10 }}
			/>,
			<FlatButton label={submitLabel} primary onClick={handleSubmit} />,
		]

		return (
			<Dialog
				title={title}
				actions={actions}
				actionsContainerStyle={{
					borderTop: '1px solid rgb(224, 224, 224)',
				}}
				modal={modal}
				open={state.open}
				onRequestClose={handleCancel}
			>
				<div>
					<SearchBox text={state.search} onChange={handleSearch} />
					<SearchResult
						products={state.products}
						selectedId={state.selectedId}
						onSelect={handleRowSelection}
						settings={settings}
					/>
				</div>
			</Dialog>
		)
	}
}
