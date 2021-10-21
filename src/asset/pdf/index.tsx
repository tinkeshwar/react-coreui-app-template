import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Document, Page, pdfjs } from 'react-pdf'
import { CPagination } from '@coreui/react'
import './style.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const DivBox = styled.div``
const DivFooter = styled.div`position: absolute; bottom:0; display: block;`

export const PdfViewer = ({url, password}:{
    url:string,
    password?: string
}) => {
    const pdfWrapper = useRef<HTMLInputElement>(null)
    const [current, setCurrent] = useState<number>(1)
    const [total, setTotal] = useState<number>(1)
    const [initialWidth, setInitialWidth] = useState<number|null|undefined>(246)

    const setWidth = () => {
        const currentWidth = pdfWrapper?.current?.offsetWidth
        if(currentWidth){
            setInitialWidth(currentWidth)
        }
    }

    useLayoutEffect(() => {
        setInitialWidth(pdfWrapper?.current?.offsetWidth)
    }, [])

    return (
        <DivBox className={'page-number-box'} ref={pdfWrapper}>
            {(url) && <Document
                file={{url: url}}
                error={'File not found'}
                noData={'No Data Found'}
                onLoadError={()=>{}}
                renderMode={'svg'}
                onLoadSuccess={(page)=>setTotal(page.numPages)}
                onPassword={(callback)=>callback(password||'ui')}
            >
                <Page
                    pageNumber={current}
                    width={initialWidth||246}
                    onRenderSuccess={setWidth}
                />
            </Document>}
            <DivFooter className={'w-100 p-1'}>
                <DivBox className={'page-number-action-box p-1 text-center text-white'}>
                    <CPagination
                        size={'sm'}
                        className={'pdf-box-pagination'}
                        activePage={current}
                        pages={total}
                        onActivePageChange={(page: number)=>setCurrent(page)}
                    />
                </DivBox>
            </DivFooter>
        </DivBox>
    )
}