import React from 'react'

export type TextareaPropType = {
    value?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: any) => void;
    rows?:number;
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
}