import React from 'react'
import styled from 'styled-components'
import { ImageDisplayPropType } from './type'

const Img = styled.img``

export const ImageDisplay = ({
    src
}:ImageDisplayPropType) => {
    return (
        <Img src={createImage(src||'')} className={'img-fluid img-thumbnail'}/>
    )
}

const createImage = (url: string| undefined, height?: number, width?: number) => {
    if(url !== undefined && url !== null && url !== ''){
        return url
    }else{
        return `https://dummyimage.com/${width || 150}x${height || 150}/e6dfe6/0011ff`
    }
}