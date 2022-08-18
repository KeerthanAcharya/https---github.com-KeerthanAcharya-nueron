import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

export type VehicleInfo = {
    vehicle_details: {
        year: string;
        vin: string;
        make: string;
        model: string;
        trim: string;
        odometer: string;
        engine: string;
        transmission: string;
        body_type: string;
        exterior_colour: string;
        interior_colour: string;
        carfax_info: any;
        option_info: [string];
        valuation_Info: {
            valuation: string;
            MSRP: string;
        };
    };
};
type Props = {
    vehicle_info: VehicleInfo;
};

export default function VehicleDetails({ vehicle_info }: Props) {
    return (
        <div className='containerBox'>
            <Card className='mx-1 card-sec'>
                <Card.Header>
                    <Card.Title>
                        <h3>Vehicle Details</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className='vehicle-details'>
                        {vehicle_info.vehicle_details && (
                            <div className='text-black mt-10'>
                                <p>VIN: {vehicle_info.vehicle_details.vin}</p>
                                <p>Year: {vehicle_info.vehicle_details.year}</p>
                                <p>Make: {vehicle_info.vehicle_details.make}</p>
                                <p>Model: {vehicle_info.vehicle_details.model}</p>
                                <p>Trim: {vehicle_info.vehicle_details.trim}</p>
                                <p>Odometer: {vehicle_info.vehicle_details.odometer}</p>
                                <p>Engine: {vehicle_info.vehicle_details.engine}</p>
                                <p>Transmission: {vehicle_info.vehicle_details.transmission}</p>
                                <p>Body Type: {vehicle_info.vehicle_details.body_type}</p>
                                <p>
                                    Exterior Color: {vehicle_info.vehicle_details.exterior_colour}
                                </p>
                                <p>
                                    Interior Color: {vehicle_info.vehicle_details.interior_colour}
                                </p>
                                {/* <p>Airbag Info: {lead.vehicle_info.vehicle_details.airbag_info.airbags}</p> */}
                                <Accordion defaultActiveKey='0'>
                                    <Accordion.Item eventKey='0'>
                                        <Accordion.Header>Options Info</Accordion.Header>
                                        <Accordion.Body>
                                            {vehicle_info.vehicle_details.option_info.map(
                                                (option: string, index: number) => {
                                                    return (
                                                        <div key={index}>
                                                            <p>{option}</p>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='1'>
                                        <Accordion.Header>Valuation Info</Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                Valuation:
                                                {
                                                    vehicle_info.vehicle_details.valuation_Info
                                                        .valuation
                                                }
                                            </p>
                                            <p>
                                                MSRP:
                                                {vehicle_info.vehicle_details.valuation_Info.MSRP}
                                            </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
