import styled from 'styled-components'

export const Div = styled.div``
export const Heading1 = styled.h1``
export const Para = styled.p``
export const Span = styled.span``

export const ULSpan = styled(Span)<{size?: number, color?: string, bold?: number, align?: string}>`
    ${({size})=> size && `font-size:${size}px;`}
    ${({color})=> color && `color:${color};`}
    ${({bold})=> bold && `font-weight:${bold};`}
    ${({align})=> align && `text-align:${align};`}
    border-bottom:1px solid #ccc;
    display:block;`