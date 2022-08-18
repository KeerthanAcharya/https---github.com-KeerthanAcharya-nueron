import React from 'react';
import { Card } from 'react-bootstrap';
import { Dealer } from '../Leads/leadPersonalDetails';

type Props = {
    dealer: Dealer | any;
};

export default function DealerInfo({ dealer }: Props) {
    return (
        <div className='containerBox'>
            <Card className='mx-1 card-sec'>
                <Card.Header>
                    <Card.Title>
                        <h3>Dealership Info</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className='vehicle-details'>
                        {dealer && (
                            <div className='text-black'>
                                <p>Dealership Id: {dealer.dealer_id}</p>
                                <p>Dealership Name: {dealer.dealer_name}</p>
                                <p>Website: {dealer.website}</p>
                                <p>Email: {dealer?.email}</p>
                                <p>Phone Number: {dealer?.cell_number}</p>
                                <p>Work Number: {dealer?.work_number}</p>
                                <p>Communication Address: {dealer?.communication_address}</p>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
