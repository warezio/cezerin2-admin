import React from 'react'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import messages from 'lib/text'
import ProductsListItem from './item'
import Head from './head'
import './style.sass'

export default const ProductsList = () => {
	useEffect(,[]() {
		props.onLoad()
	}

	
		const {
			items,
			selected,
			loadingItems,
			onSelect,
			onSelectAll,
			selectedAll,
			loadMore,
			settings,
			hasMore,
			totalCount,
		} = props

		const rows = items.map((item, index) => {
			const itemSelected = selected.includes(item.id)
			return (
				<ProductsListItem
					key={index}
					product={item}
					selected={itemSelected}
					onSelect={onSelect}
					settings={settings}
				/>
			)
		})

		return (
			<div className="product-list">
				<List>
					<Head onSelectAll={onSelectAll} />
					<Divider />
					{rows}
					<div className="more}>
						<RaisedButton
							disabled={loadingItems || !hasMore}
							label={messages.actions_loadMore}
							labelPosition="before"
							primary={false}
							icon={
								<FontIcon className="material-icons">
									refresh
								</FontIcon>
							}
							onClick={loadMore}
						/>
					</div>
				</List>
			</div>
		)
	}
}
