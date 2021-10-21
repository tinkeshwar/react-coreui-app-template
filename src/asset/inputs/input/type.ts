import React from 'react'

export type TextInputPropType = {
    value?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: any) => void;
    onBlur?: (value: any) => void;
    type?: 'text' | 'password' | 'number' | 'email' | 'date';
    label?: string;
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
    readonly?: boolean | undefined;
    plainText?: boolean| undefined;
}