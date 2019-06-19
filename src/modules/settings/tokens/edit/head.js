import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Buttons from './components/headButtons';
import { deleteCurrentToken } from '../../actions';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onDelete: () => {
		dispatch(deleteCurrentToken());
		ownProps.history.push('/settings/tokens');
	}
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Buttons)
);
