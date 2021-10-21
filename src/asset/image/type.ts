export type ImageUploadTypeProp = {
    thumb?: string,
    height: number,
    width: number,
    onUploadSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearPreview?: boolean | undefined;
    camOff?: true|undefined,
    aspects?: number|undefined
}

export type CameraModalTypeProp = {
    showCameraModel: boolean,
    setShowCameraModel: (value: boolean)=> any,
    setCameraThumb: (value: string)=>any,
    setFileToUpload: (data: string) =>any
}

export type DeviceInfoType = {
    deviceId: string,
    groupId: string,
    kind: string,
    label: string,
}

export type CropperType = {
    aspect?: number|undefined
    source: string,
    showCropperModel: boolean,
    setShowCropperModel: (value: boolean)=>any
    setCroppedImage: (value: string)=>any
}