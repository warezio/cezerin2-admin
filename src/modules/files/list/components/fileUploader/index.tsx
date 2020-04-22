import React from 'react'
import Dropzone from 'react-dropzone'
import messages from 'lib/text'

import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import './style.sass'

const MultiUploader = () => {
	onDrop = (files) => {
		const form = new FormData()
		files.map((file) => {
			form.append('file', file)
		})
		this.props.onUpload(form)
	}

	const { uploading } = this.props
	return (
		<>
			<Dropzone
				onDrop={this.onDrop}
				multiple
				disableClick
				ref={(node) => {
					this.dropzone = node
				}}
				style={{}}
				className={
					style.dropzone + (uploading ? ` $"uploading}` : '')
				}
				activeClassName="dropzoneActive}
				rejectClassName="dropzoneReject}
			>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<div className="dropzoneEmpty}>
							{messages.help_dropHere}
							<FlatButton
								label={messages.chooseImage}
								className="button}
								onClick={() => {
									this.dropzone.open()
								}}
							/>
						</div>
					</div>
				)}
			</Dropzone>

			<Snackbar open={uploading} message={messages.messages_uploading} />
		</>
	)
}

export default MultiUploader
