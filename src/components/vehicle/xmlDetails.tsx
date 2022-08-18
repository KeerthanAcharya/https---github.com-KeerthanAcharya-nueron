import React from 'react';
import XMLViewer from 'react-xml-viewer';

type Props = {
    xml: string;
};

export default function XmlDetails({ xml }: Props) {
    return (
        <div className='containerBox text-black'>
            <div
                style={{
                    width: '60rem',
                    overflowX: 'auto',
                }}>
                <XMLViewer xml={xml} collapsible overflowbreak={true} />
            </div>
        </div>
    );
}
