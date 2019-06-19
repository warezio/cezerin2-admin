import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import messages from 'lib/text';
import ConfirmationDialog from 'modules/shared/confirmation';
import { MultiSelect } from 'modules/shared/form';

import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import style from './style.css';

const Scopes = [
	'admin',
	'dashboard',
	'read:products',
	'write:products',
	'read:product_categories',
	'write:product_categories',
	'read:orders',
	'write:orders',
	'read:customers',
	'write:customers',
	'read:customer_groups',
	'write:customer_groups',
	'read:pages',
	'write:pages',
	'read:order_statuses',
	'write:order_statuses',
	'read:theme',
	'write:theme',
	'read:sitemap',
	'',
	'read:shipping_methods',
	'write:shipping_methods',
	'read:payment_methods',
	'write:payment_methods',
	'read:settings',
	'write:settings',
	'read:files',
	'write:files'
];

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];

	requiredFields.map(field => {
		if (!values.is_system && values && !values[field]) {
			errors[field] = messages.errors_required;
		}
	});

	return errors;
};

class EditTokenForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDeleteDialog: false,
			is_revoked: this.props.initialValues.is_revoked
		};
	}

	handleDelete = () => {
		this.setState({ showDeleteDialog: true });
	};

	componentDidMount() {
		this.props.onLoad();
	}

	componentWillUnmount() {
		this.props.clearData();
	}

	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			tokenId,
			newToken,
			is_revoked,
			onRevoke,
			onReinstate
		} = this.props;
		const isTokenAdded = !!newToken;
		const isAdd = tokenId === null || tokenId === undefined;
		return (
			<div>
				<form onSubmit={handleSubmit}>
					<Paper className="paper-box">
						<div className={style.innerBox}>
							<Field
								name="name"
								component={TextField}
								floatingLabelText={messages.settings_tokenName}
								fullWidth
							/>
							<Field
								name="email"
								component={TextField}
								floatingLabelText={messages.email}
								fullWidth
								disabled={!isAdd}
								type="email"
							/>
							<Field
								name="expiration"
								component={TextField}
								floatingLabelText={messages.settings_tokenExp}
								fullWidth
								type="number"
							/>
							<div className="blue-title">{messages.settings_selectScopes}</div>
							<Field
								name="scopes"
								component={MultiSelect}
								items={Scopes}
								disabled={!isAdd}
							/>
						</div>
						<div className="buttons-box">
							{!isAdd && (
								<div>
									{is_revoked ? (
										<Button
											variant="contained"
											size="medium"
											color="secondary"
											className={style.reinstateButton}
											onClick={onReinstate}
										>
											{messages.settings_reinstateAccess}
										</Button>
									) : (
										<Button
											variant="contained"
											size="medium"
											color="secondary"
											className={style.button}
											onClick={onRevoke}
										>
											{messages.settings_revokeAccess}
										</Button>
									)}
								</div>
							)}
							<Button
								variant="contained"
								size="medium"
								type="submit"
								color="primary"
								className={style.button}
								disabled={pristine || submitting}
							>
								{isAdd ? messages.settings_generateToken : messages.save}
							</Button>
						</div>
					</Paper>
				</form>

				<ConfirmationDialog
					open={isTokenAdded}
					title={messages.settings_copyYourNewToken}
					description={newToken}
					submitLabel={messages.actions_done}
					cancelLabel={messages.cancel}
				/>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditTokenForm',
	validate,
	enableReinitialize: true
})(EditTokenForm);
