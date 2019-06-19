import React from 'react';
import { Link } from 'react-router-dom';
import ConfirmationDialog from 'modules/shared/confirmation';
import messages from 'lib/text';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

export default class Buttons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openDelete: false
		};
	}

	openDelete = () => {
		this.setState({ openDelete: true });
	};

	closeDelete = () => {
		this.setState({ openDelete: false });
	};

	deleteOrders = () => {
		this.setState({ openDelete: false });
		this.props.onDelete();
	};

	render() {
		return (
			<div>
				<Tooltip
					title={messages.settings_deleteAccess}
					placement="bottom-start"
				>
					<IconButton onClick={this.openDelete}>
						<Icon style={{ color: '#fff' }} className="material-icons">
							delete
						</Icon>
					</IconButton>
				</Tooltip>

				<ConfirmationDialog
					open={this.state.openDelete}
					title={messages.settings_tokenDeleteTitle}
					description={messages.settings_tokenDeleteDescription}
					onSubmit={this.deleteOrders}
					submitLabel={messages.settings_deleteAccess}
					cancelLabel={messages.cancel}
				/>
			</div>
		);
	}
}
