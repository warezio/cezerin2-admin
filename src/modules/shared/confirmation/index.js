import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ConfirmationDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.open !== nextProps.open) {
			this.setState({
				open: nextProps.open
			});
		}
	}

	handleCancel = () => {
		this.setState({ open: false });
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	};

	handleSubmit = () => {
		this.setState({ open: false });
		if (this.props.onSubmit) {
			this.props.onSubmit();
		}
	};

	render() {
		const {
			title,
			description,
			submitLabel,
			cancelLabel,
			modal = false
		} = this.props;

		return (
			<Dialog open={this.state.open} onClose={this.handleCancel}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ wordWrap: 'break-word' }}>
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleCancel} style={{ marginRight: 10 }}>
						{cancelLabel}
					</Button>
					<Button color="primary" onClick={this.handleSubmit}>
						{submitLabel}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
