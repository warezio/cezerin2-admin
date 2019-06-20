import React from 'react';
import messages from 'lib/text';
import CezerinClient from '../../../client';
import settings from 'lib/settings';
import * as auth from 'lib/auth';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: localStorage.getItem('dashboard_email') || '',
			password: null,
			isFetching: false,
			isAuthorized: false,
			emailIsSent: false,
			error: null
		};
	}

	handleChange = event => {
		this.setState({
			email: event.target.value
		});
	};

	handlePasswordChange = event => {
		this.setState({
			password: event.target.value
		});
	};

	handleKeyPress = e => {
		if (e.keyCode === 13 || e.which === 13) {
			this.handleSubmit();
		}
	};

	handleSubmit = () => {
		this.setState({
			isFetching: true,
			isAuthorized: false,
			emailIsSent: false,
			error: null
		});

		CezerinClient.authorize(
			settings.apiBaseUrl,
			this.state.email,
			this.state.password
		)
			.then(authorizeResponse => {
				this.setState({
					isFetching: false,
					isAuthorized: false,
					emailIsSent: authorizeResponse.json.sent,
					error: authorizeResponse.json.error
				});
			})
			.catch(error => {
				this.setState({
					isFetching: false,
					isAuthorized: false,
					emailIsSent: false,
					error
				});
			});
	};

	componentWillMount() {
		auth.checkTokenFromUrl();
	}

	componentDidMount() {}

	render() {
		const { email, isFetching, isAuthorized, emailIsSent, error } = this.state;

		let response = null;
		if (isFetching) {
			response = (
				<div className="loginSuccessResponse">{messages.messages_loading}</div>
			);
		} else if (emailIsSent) {
			response = (
				<div className="loginSuccessResponse">{messages.loginLinkSent}</div>
			);
		} else if (emailIsSent === false && error) {
			response = <div className="loginErrorResponse">{error}</div>;
		}

		return (
			<div className="row col-full-height center-xs middle-xs">
				<div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
					<Paper className="loginBox">
						<div className="loginTitle">{messages.loginTitle}</div>
						<div className="loginDescription">
							{settings.securitySource === 'cognito'
								? messages.loginPasswordDescription
								: messages.loginDescription}
						</div>
						<div className="loginInputs">
							<div className="loginInput">
								<TextField
									type="email"
									value={email}
									onChange={this.handleChange}
									label={messages.email}
									fullWidth
								/>
							</div>
							{settings.securitySource === 'cognito' && (
								<div className="passwordInput">
									<TextField
										type="password"
										onChange={this.handlePasswordChange}
										onKeyPress={this.handleKeyPress}
										label={messages.password}
										fullWidth
									/>
								</div>
							)}
						</div>
						<Button
							variant="contained"
							color="primary"
							disabled={isFetching || emailIsSent}
							onClick={this.handleSubmit}
						>
							{messages.loginButton}
						</Button>
						{response}
					</Paper>
				</div>
			</div>
		);
	}
}
