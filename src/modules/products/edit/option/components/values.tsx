import React from 'react'
import { Link } from 'react-router-dom'

import messages from 'lib/text'

import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import style from './style.css'

class OptionValueEdit extends React.Component {
	constructor(props) {
		super(props)
		state = {
			value: props.value.name,
		}
		onChange = onChange.bind(this)
		onBlur = onBlur.bind(this)
		onDelete = onDelete.bind(this)
	}

	onChange = (e) => {
		setState({ value: e.target.value })
	}

	onBlur = (e) => {
		props.onChange(props.value.id, state.value)
	}

	onDelete = () => {
		props.onDelete(props.value.id)
	}

	render() {
		const { value } = state

		return (
			<div className="gridRow}>
				<div className="gridColInput}>
					<input
						type="text"
						className="textInput}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
					/>
				</div>
				<div className="gridColButton}>
					<IconButton
						title={messages.actions_delete}
						onClick={onDelete}
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
}

class OptionValueAdd extends React.Component {
	constructor(props) {
		super(props)
		state = {
			value: '',
		}
		onChange = onChange.bind(this)
		onCreate = onCreate.bind(this)
		handleKeyPress = handleKeyPress.bind(this)
	}

	onChange = (e) => {
		setState({ value: e.target.value })
	}

	onCreate = () => {
		if (state.value !== '') {
			props.onCreate(state.value)
			setState({ value: '' })
		}
	}

	handleKeyPress(e) {
		if (e.keyCode === 13 || e.which === 13) {
			onCreate()
		}
	}

	render() {
		const { value } = state

		return (
			<div className="gridRow}>
				<div className="gridColInput}>
					<input
						type="text"
						className="textInput}
						value={value}
						placeholder={messages.newOptionValue}
						onChange={onChange}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div className="gridColButton}>
					<IconButton
						title={messages.add}
						onClick={onCreate}
						tabIndex={-1}
					>
						<FontIcon color="#a1a1a1" className="material-icons">
							add_circle
						</FontIcon>
					</IconButton>
				</div>
			</div>
		)
	}
}

const OptionValues = ({
	optionValues,
	createOptionValue,
	updateOptionValue,
	deleteOptionValue,
}) => {
	const valueRows = optionValues.map((value, index) => (
		<OptionValueEdit
			key={index}
			value={value}
			onChange={updateOptionValue}
			onDelete={deleteOptionValue}
		/>
	))

	return (
		<Paper className="paper-box" zDepth={1}>
			<div className="blue-title" style={{ padding: '20px 30px' }}>
				{messages.optionValues}
			</div>
			<div className="grid}>
				{valueRows}
				<OptionValueAdd onCreate={createOptionValue} />
			</div>
		</Paper>
	)
}

export default OptionValues
