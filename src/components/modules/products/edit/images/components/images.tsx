import React, { useState } from "react"
import messages from "../../../../../lib/text"
import Gallery from "../../../../../modules/shared/imageUploadMultiple"
import Paper from "material-ui/Paper"
import TextField from "material-ui/TextField"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"

const ProductImages = props => {
  const [openEdit, setOpenEdit] = useState(false)
  const [imageData, setImageData] = useState(null)

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const openEdits = () => {
    setOpenEdit: true
  }

  const handleEditOpen = image => {
    setImageData(image)
    openEdit()
  }

  const handleEditSave = () => {
    props.onImageUpdate(imageData)
    closeEdit()
  }

  const handleAltChange = (event, value) => {
    const newImageData = Object.assign({}, imageData, {
      alt: value,
    })
    setImageData(newImageData)
  }

  const {
    productId,
    images,
    onImageDelete,
    onImageSort,
    onImageUpload,
    uploadingImages,
  } = props
  const alt = imageData ? imageData.alt : ""

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
      <div style={{ padding: "10px 10px 30px 10px" }}>
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

export default ProductImages
