import React from 'react'
import messages from 'lib/text'
import Gallery from 'modules/shared/imageUploadMultiple'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class ProductImages extends React.Component {
	constructor(props) {
		super(props)
		state = {
			openEdit: false,
			imageData: null,
		}
	}

	closeEdit = () => {
		setState({ openEdit: false })
	}

	openEdit = () => {
		setState({ openEdit: true })
	}

	handleEditOpen = (image) => {
		setState({ imageData: image })
		openEdit()
	}

	handleEditSave = () => {
		props.onImageUpdate(state.imageData)
		closeEdit()
	}

	handleAltChange = (event, value) => {
		const newImageData = Object.assign({}, state.imageData, {
			alt: value,
		})
		setState({ imageData: newImageData })
	}

	render() {
		const {
			productId,
			images,
			onImageDelete,
			onImageSort,
			onImageUpload,
			uploadingImages,
		} = props
		const { openEdit, imageData } = state
		const alt = imageData ? imageData.alt : ''

		const dialogButtons = [
			<FlatButton
				label={messages.cancel}
				onClick={closeEdit}
				style={{ marginRight: 10 }}
			/>,
			<FlatButton
				label={messages.save}
				primary
				keyboardFocused
				onClick={handleEditSave}
			/>,
		]

		return (
			<Paper className="paper-box" zDepth={1}>
				<div style={{ padding: '10px 10px 30px 10px' }}>
					<Gallery
						productId={productId}
						images={images}
						onImageDelete={onImageDelete}
						onImageSort={onImageSort}
						onImageUpload={onImageUpload}
						uploading={uploadingImages}
						onImageEdit={handleEditOpen}
					/>
					<Dialog
						contentStyle={{ maxWidth: 540 }}
						title={messages.edit}
						actions={dialogButtons}
						modal={false}
						open={openEdit}
						onRequestClose={closeEdit}
						autoScrollBodyContent={false}
					>
						<TextField
							floatingLabelText={messages.alt}
							fullWidth
							value={alt}
							onChange={handleAltChange}
						/>
					</Dialog>
				</div>
			</Paper>
		)
	}
}
