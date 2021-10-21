export type ButtonPropType = {
    type?: 'submit' | 'reset';
    buttonText?: string;
    buttonType?: 'primary' | 'info' | 'danger' | 'warning' | 'success' | 'link'  | 'secondary' | 'dark';
    buttonStyle?: 'ghost' | 'outline';
    className?: string;
    iconLeft?: string;
    iconRight?: string;
    loading?: boolean | undefined;
    disabled?: boolean;
    onClick?: () => any;
}

export type ItemType = {
    text: string,
    handle:()=> any,
    visible: boolean,
    disabled?: boolean,
}

export type ButtonListPropType = {
    items: ItemType[];
    buttonText?: string;
    buttonType?: 'primary' | 'info' | 'danger' | 'warning' | 'success' | 'link'  | 'secondary' | 'dark';
    buttonStyle?: 'ghost' | 'outline';
    iconLeft?: string;
    iconRight?: string;
    loading?: boolean | undefined;
    size?: 'sm' | 'lg',
}

export type WidgetButtonPropType = {
    className?: string,
    buttonTextLarge?: string,
    buttonTextSmall?: string,
    icon?: string,
    iconSize?: number,
    clickHandle?: ()=>any,
    isDisabled?: boolean,
    buttonColor: string|'danger'|'info'|'primary'|'secondary'|'dark'|'warning'|'success',
    loading?: boolean
}