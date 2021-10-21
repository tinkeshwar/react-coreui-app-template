export type DropdownItemType = {
    id: string|number;
    title: string;
}

export type DropdownPropType = {
    onSelect: (item: DropdownItemType) => void;
    items: DropdownItemType[];
    label?: string;
    placeholder?: string | undefined;
    searchTitle?: string;
    title: string;
    disabled?: boolean;
    required?: boolean;
    leftIcon?: string;
    leftText?: string;
    rightIcon?: string;
    rightText?: string;
}