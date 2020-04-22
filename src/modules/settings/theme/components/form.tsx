import React from 'react'

import messages from 'lib/text'
import api from 'lib/api'
import ThemeSettings from 'modules/settings/themeSettings'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import './style.sass'

const styles = {
	button: {
		margin: 12,
	},
	exampleImageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0,
	},
}

export default const Theme = () => {
	onExportClick() {
		props.exportRequest()
		api.theme.export().then(({ satus, json }) => {
			props.exportReceive()
			if (json.file) {
				window.location = json.file
			} else {
				alert(`Error: ${JSON.stringify(json)}`)
			}
		})
	}

	onImportFileChoose(e) {
		props.installRequest()
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('file', file)

		api.theme.install(formData)
	}

	
		const { exportInProcess, installInProcess } = props

		return (
			<div>
				<Paper className="paper-box" zDepth={1}>
					<div className="innerBox}>
						<div className="row between-xs middle-xs">
							<div className="col-xs-6">
								{messages.settings_themeExportDesciption}
							</div>
							<div
								className="col-xs-4"
								style={{ textAlign: 'right' }}
							>
								<RaisedButton
									label={
										exportInProcess
											? messages.settings_themeExporting
											: messages.settings_themeExport
									}
									disabled={
										exportInProcess || installInProcess
									}
									onClick={onExportClick.bind(this)}
									primary
								/>
							</div>
						</div>

						<Divider
							style={{
								marginTop: 30,
								marginBottom: 30,
								marginLeft: -30,
								marginRight: -30,
							}}
						/>

						<div className="row between-xs middle-xs">
							<div className="col-xs-6">
								{messages.settings_themeInstallDesciption}
							</div>
							<div
								className="col-xs-4"
								style={{ textAlign: 'right' }}
							>
								<RaisedButton
									label={
										installInProcess
											? messages.settings_themeInstalling
											: messages.settings_themeInstall
									}
									disabled={installInProcess}
									labelPosition="before"
									containerElement="label"
									primary
								>
									<input
										type="file"
										onChange={onImportFileChoose.bind(
											this
										)}
										disabled={installInProcess}
										style={styles.exampleImageInput}
									/>
								</RaisedButton>
							</div>
						</div>
					</div>
				</Paper>

				<ThemeSettings />
			</div>
		)
	}
}
