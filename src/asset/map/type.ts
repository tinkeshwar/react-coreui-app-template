export type MapTypeProp = {
    width?: string,
    height?: string,
    zoom?:number,
    center: {
        lat: number,
        lng: number
    },
    marker?: {
        lat: number,
        lng: number
    }
    onMarkerAdjust?:({lat, lng}:{lat: number, lng: number}) =>any
}

export type AutoCompleteTypeProp = {
    clear?: boolean;
    onPlaceChange: (data: any) => any;
    textarea?: boolean
}