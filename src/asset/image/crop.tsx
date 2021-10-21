import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '..'
import { CropperType } from './type'

export const Cropper = ({ aspect, source, showCropperModel, setShowCropperModel, setCroppedImage }: CropperType) => {
    const [cropIt, setCropIt] = useState<any>({ aspect: aspect || .8 })
    const [cropped, setCropped] = useState<any>()
    const [imageLoaded, seImageLoaded] = useState<any>()

    const setCroppedHandle = async (cropped: any) => {
        if (imageLoaded !== undefined && cropIt.height !== 0 && cropIt.width !== 0) {
            const file = getCroppedImg(imageLoaded, cropped)
            setCropped(file)
        }
    }

    const validate = cropIt.height === 0 && cropIt.width === 0

    const handleCrop = () => {
        if (cropped) {
            setCroppedImage(cropped)
            setShowCropperModel(false)
        }
    }

    const getCroppedImg = (image: any, crop: any) => {
        const canvas = document.createElement('canvas')
        const pixelRatio = window.devicePixelRatio
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext('2d')
        canvas.width = crop.width * pixelRatio * scaleX
        canvas.height = crop.height * pixelRatio * scaleY
        if (ctx !== null) {
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY
            )
            return canvas.toDataURL()
        }
    }

    return (
        <CModal
            show={showCropperModel}
            onClose={setShowCropperModel}
            backdrop={false}
            closeOnBackdrop={false}
        >
            <CModalHeader>
                <CModalTitle>{'Crop Image'}</CModalTitle>
            </CModalHeader>
            <CModalBody className={'text-center'}>
                <ReactCrop
                    src={source}
                    crop={cropIt}
                    onChange={(c) => setCropIt(c)}
                    onImageLoaded={seImageLoaded}
                    rotate={0}
                    onComplete={(c) => setCroppedHandle(c)}
                />
            </CModalBody>
            <CModalFooter>
                {cropped && <Button buttonType={'primary'} className={'btn-block'} iconLeft={'cilCrop'} buttonText={'Crop'} onClick={handleCrop} disabled={validate} />}
            </CModalFooter>
        </CModal>
    )
}