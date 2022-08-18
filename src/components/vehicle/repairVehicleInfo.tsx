import React from 'react';
import { Card } from 'react-bootstrap';

export interface Repairorder {
    repair_order_number: string;
    closed_Date: string;
    year: string;
    make: string;
    model: string;
    trim: string | Record<string, string>;
    odometer: string;
    last_Service: string;
    customer_Total: string;
    warranty_Total: string;
    internal_Total: string;
    service_advisor: string;
    status: string;
    recommended_Service: string;
    service_information_description: string;
    option_code: string;
}

type Props = {
    repair_order: Repairorder;
};

export default function RepairOrderDetails({ repair_order }: Props) {
    return (
        <div className='containerBox'>
            <Card className='mx-1 card-sec'>
                <Card.Header>
                    <Card.Title>
                        <h3>Repair Order</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className='vehicle-details'>
                        {repair_order && (
                            <div className='text-black'>
                                <p>Repair Order Number: {repair_order.repair_order_number}</p>
                                <p>Closed Date: {repair_order.closed_Date}</p>
                                <p>Year: {repair_order.year}</p>
                                <p>Make: {repair_order.make}</p>
                                <p>Model: {repair_order.model}</p>
                                <div>
                                    Trim:{' '}
                                    {Object.entries(repair_order.trim).map(([key, value]) => (
                                        <p
                                            style={{
                                                marginLeft: '2rem',
                                            }}>
                                            {key}: {value}
                                        </p>
                                    ))}
                                </div>
                                <p>Odometer: {repair_order.odometer}</p>
                                <p>Last Service: {repair_order.last_Service}</p>
                                <p>Customer Total: {repair_order.customer_Total}</p>
                                <p>Warranty Total: {repair_order.warranty_Total}</p>
                                <p>Internal Total: {repair_order.internal_Total}</p>
                                <p>Service Advisor: {repair_order.service_advisor}</p>
                                <p>Status: {repair_order.status}</p>
                                <p>Recommended Service: {repair_order.recommended_Service}</p>
                                <p>
                                    Service Information Description:{' '}
                                    {repair_order.service_information_description}
                                </p>
                                <p>Option Code: {repair_order.option_code}</p>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
