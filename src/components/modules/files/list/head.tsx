import { connect } from "react-redux"
import { withRouter } from "react-router"
import Buttons from "./components/fileUploader"

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
