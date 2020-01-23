import React from 'react';

import { Element } from './alert-styled'

type Alert = {
    msg: string ;
    severity: 'error'
        | 'info'
        | 'success'
        | 'warning';
    variant?: 'filled'
    | 'outlined'
    | 'standard';
    onClose: () => void
    className?: string
};

export function CommonAlert({ msg, variant= 'filled', ...props }: Alert) {
    return (
        <Element elevation={6} variant={variant}  {...props}>
            {msg}
        </Element>
    );
}
