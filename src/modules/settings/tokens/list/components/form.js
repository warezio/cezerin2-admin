import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const TokenItem = ({ token }) => (
	<div>
		<Divider />
		<Link
			to={`/settings/tokens/${token.id}`}
			style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.84)' }}
		>
			<ListItem>
				<ListItemText
					primary={
						<div className="row">
							<div className="col-xs-5">{token.name}</div>
							<div className="col-xs-5" style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
								{token.email}
							</div>
							<div className="col-xs-2">
								{token.is_revoked ? messages.inactive : messages.active}
							</div>
						</div>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton edge="end">
						<Icon>arrow_forward_ios</Icon>
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</Link>
	</div>
);

export default class TokensList extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { tokens } = this.props;
		let listItems = [];
		if (tokens && tokens.length > 0) {
			listItems = tokens.map((token, index) => (
				<TokenItem key={index} token={token} />
			));
		}

		return (
			<div>
				<div style={{ margin: 20, color: 'rgba(0, 0, 0, 0.52)' }}>
					{messages.settings_tokenHelp}
				</div>
				<Paper className="paper-box">
					<div style={{ width: '100%' }}>
						<List style={{ padding: 0 }}>{listItems}</List>
					</div>
				</Paper>
			</div>
		);
	}
}
