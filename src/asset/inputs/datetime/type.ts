export type DateTimeInputPropType = {
    value?: any,
    onValueChange?: (value: any) => void;
    label?: string;
    showTimeInput?: boolean;
    required?: boolean;
    placeholder?: string | undefined;
    autocomplete?: string | undefined;
    leftIcon?: string;
    leftText?: string;
    rightIcon?: string;
    rightText?: string;
    error?: string;
    size?: 'sm' | 'lg';
    className?: string;
}