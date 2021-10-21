import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../buttons'
import { CameraModalTypeProp, DeviceInfoType } from './type'

export const Camera = ({
    showCameraModel,
    setShowCameraModel,
    setCameraThumb,
    setFileToUpload
}:CameraModalTypeProp) => {
    const webcamRef = useRef<any>(null)
    const [devices, setDevices] = useState<DeviceInfoType[]>([])
    const [switchCamera, setSwitchCamera] = useState<object>({facingMode:'user'})
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        setCameraThumb(imageSrc)
        setFileToUpload(imageSrc)
        setShowCameraModel(false)
    },[setCameraThumb, setShowCameraModel, setFileToUpload])

    const switchCameraHandle = (deviceId: string) => {
        setSwitchCamera({deviceId:deviceId})
    }

    const handleDevices = useCallback(
        mediaDevices =>
          setDevices(mediaDevices.filter(({ kind }:{kind: any}) => kind === 'videoinput')),
        [setDevices]
    )

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices)
    },[handleDevices])

    return (
        <CModal
            show={showCameraModel}
            onClose={setShowCameraModel}
        >
            <CModalHeader closeButton>
                <CModalTitle>{'Camera'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Webcam
                    ref={webcamRef}
                    width={465}
                    screenshotFormat={'image/png'}
                    videoConstraints={switchCamera}
                />
            </CModalBody>
            <CModalFooter>
                {(devices?.length > 0) && devices.map((device: DeviceInfoType)=>{
                        return (<Button key={device.deviceId} buttonType={'secondary'} className={'btn-block'} iconLeft={'cil-swap-horizontal'} buttonText={device?.label} onClick={()=>switchCameraHandle(device.deviceId)}/>)
                    }
                )}
                <Button buttonType={'primary'} className={'btn-block'} iconLeft={'cil-camera'} buttonText={'Take'} onClick={()=>capture()}/>
            </CModalFooter>
        </CModal>
    )
}
