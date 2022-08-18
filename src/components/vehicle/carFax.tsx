import React from 'react';
import { JSONTree } from 'react-json-tree';

type Props = {
    carfax_info: any;
};
const theme = {
    scheme: 'flat',
    author: 'chris kempson (http://chriskempson.com)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base0A: '#F1C40F',
    base0B: '#FFFFFF',
    base0C: '#0d6efd',
    base0D: '#0d6efd',
};

export default function CarFax({ carfax_info }: Props) {
    return (
        <div className='containerBox text-black'>
            <JSONTree data={carfax_info} theme={theme} />
        </div>
    );
}
