import { CImg, CSpinner } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ImageUploadTypeProp } from './type'
import './index.css'
import CIcon from '@coreui/icons-react'
import { Camera, Cropper } from '..'
import { convertBase64ToBlob } from '../../helper'

const Div = styled.div<{width?: number}>`
    ${({width}) => width && `width: ${width}px;`}
`
//const Hr = styled.hr``;
const Input = styled.input`display: none;`

export const ImageUpload = ({
    thumb,
    height,
    width,
    onUploadSelect,
    clearPreview,
    camOff,
    aspects
}:ImageUploadTypeProp) => {
    const previewThumb = thumb || `https://dummyimage.com/${width}x${height}/e6dfe6/7f84c7`
    const [preview, setPreview] = useState<string|null|any>()
    const [showCameraModel, setShowCameraModel] = useState(false)
    const [showCropperModel, setShowCropperModel] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toCrop, setToCrop] = useState<string>()
    const imageRef = useRef<HTMLInputElement | null>(null)
    const openOsExplorer = () =>{
        setLoading(true)
        imageRef.current?.click()
        setLoading(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files as any
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onloadend = function (e) {
            if(reader.result && (typeof reader.result === 'string')){
                setToCrop(reader.result)
                setShowCropperModel(true)
            }
        }
    }

    const handleCroppedChange = (image: string) => {
        setPreview(image)
        if(onUploadSelect){
            const BlobData = convertBase64ToBlob(image) as Blob
            const cam = [] as any
            if(BlobData){
                cam.push(BlobData)
            }
            return onUploadSelect(cam)
        }
        throw new Error('Provide either onChange or onValueChange to Input component.')
    }

    const handleCamChange = (data: string) => {
        setToCrop(data)
        setShowCropperModel(true)
    }

    const handleClearImage = () => {
        setPreview(undefined)
        if(imageRef.current){
            imageRef.current.value = ''
        }
    }

    useEffect(() => {
        if (clearPreview) {
            setPreview(null)
            if(imageRef.current){
                imageRef.current.value = ''
            }
        }
    }, [clearPreview, imageRef])

    return (
        <Div className={'main-image-div'}>
            <Div className={'text-center'}>
                {(!preview && !loading) && <Div className={'option-image-div'}>
                    <Div><CIcon className={'m-1 p-2 bg-light shadow image-container rounded float-left'} name={'cil-image-plus'} size={'4xl'} onClick={openOsExplorer}/></Div>
                    {(camOff===undefined) && <Div><CIcon className={'m-1 p-2 bg-light shadow image-container rounded float-right d-none d-md-block'} name={'cil-camera'} size={'4xl'} onClick={()=>setShowCameraModel(true)}/></Div>}
                </Div>}
                {(preview  && !loading) && <Div className={'option-image-div text-center'}>
                    <Div><CIcon className={'m-1 p-2 bg-danger shadow image-container rounded'} name={'cil-trash'} size={'5xl'} onClick={handleClearImage}/></Div>
                </Div>}
                {loading && <CSpinner grow={true} color={'warning'} type={'glow'} size={'lg'} />}
                <CImg
                    src={preview || previewThumb}
                    className={'img-fluid img-thumbnail'}
                    alt={thumb || 'image'}
                    width={width}
                    height={height}
                />
            </Div>
            <Input ref={imageRef} type={'file'} accept="image/*" onChange={handleChange}/>
            {showCameraModel && <Camera
                showCameraModel={showCameraModel}
                setShowCameraModel={setShowCameraModel}
                setCameraThumb={setPreview}
                setFileToUpload={handleCamChange}
            />}
            {toCrop && <Cropper aspect={aspects} source={toCrop} showCropperModel={showCropperModel} setShowCropperModel={setShowCropperModel} setCroppedImage={handleCroppedChange}/>}
        </Div>
    )
}