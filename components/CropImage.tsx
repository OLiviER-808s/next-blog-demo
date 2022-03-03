import Cropper from "cropperjs";
import { useEffect, useRef } from "react"
import Button from "./Button";

const CropImage = (props: any) => {
  const image: any = useRef(null)
  let cropper: any;

  const finishCrop = () => {
    console.log(cropper)
    const canvas = cropper.getCroppedCanvas();
    canvas.toBlob((blob: any) => {
      const reader = new FileReader()
      reader.addEventListener('loadend', () => {
        props.onEnd(reader.result)
      })
      reader.readAsDataURL(blob)
    })
  }

  useEffect(() => {
    cropper = new Cropper(image.current, {
      aspectRatio: 1 / 1,
      zoomable: false,
      scalable: false
    })
  }, [props.src])

  return (
    <div>
      <img style={{'maxWidth': '100%'}} src={props.src} ref={image} />
      <div className="btn-row" style={{'margin': '1em 0'}}>
        <Button color="blue" onClick={finishCrop}>Crop</Button>
        <Button secondary onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default CropImage