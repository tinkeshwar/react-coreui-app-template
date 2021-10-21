export type checkboxTypeProp = {
    label?: string;
    required?: boolean;
    items: checkboxItemType[];
    checked?: number[];
    inline?: boolean;
    onValueChange: (value: number[]) => any;
    onBoxClick?: (value: number) => any;
    inbutton?: string;
    isDisabled?: number[];
}

export type checkboxItemType = {
    id: string | number;
    title: string
}