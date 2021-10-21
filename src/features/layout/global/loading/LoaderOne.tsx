import { CContainer } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import { LoaderProp } from '../../type'

const CContainerStyled = styled(CContainer)`
    height: 100vh;
    padding-top: 15%;
`

const LoaderOne = ({
  location,
  timer
}:LoaderProp) => {

  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      if(location)
      history.push(location)
    },(timer||500))
  })

    return (
      <CContainerStyled fluid className={'bg-primary'}>
        <ReactLoading className={'m-auto'} type={'bars'} color={'#fff'} height={200} width={200} />
      </CContainerStyled>
    )
}

export default LoaderOne