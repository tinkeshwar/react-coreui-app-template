export type RadioOptionType = {
    id: any;
    title: string;
}

export type RadioPropType = {
    onValueChange?: (value: any) => void;
    label?: string;
    leftIcon?: string;
    leftText?: string;
    selected: any;
    required?: boolean;
    items: RadioOptionType[]
}