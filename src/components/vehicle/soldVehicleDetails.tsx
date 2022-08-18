import React from 'react';
import { Card } from 'react-bootstrap';

export type SoldVehicleInfo = {
    sold_vehicle_vin: string;
    year: string;
    make: string;
    model: string;
    sales_rep: string;
    road_hazard: string;
    payment_Type: string;
    payment_Term: string;
    monthly_payment: string;
    lender: string;
    gap: string;
    front_Gross: string;
    sold_on: string;
    As_income: string;
    finance_Reserve: string;
    finance_Manager: string;
    finance_Income: string;
    down_payment: string;
    deal_status: string;
    deal: string;
    deal_Status: string;
    credit_disability: string;
    credit_Life: string;
    car_care: string;
    back_Gross: string;
    AS_income: string;
};

type Props = {
    sold_vehicle_info: SoldVehicleInfo;
};

export default function SoldVehicleDetails({ sold_vehicle_info }: Props) {
    return (
        <div className='containerBox'>
            <Card className='mx-1 card-sec'>
                <Card.Header>
                    <Card.Title>
                        <h3>Sold Vehicle Details</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className='vehicle-details'>
                        {sold_vehicle_info && (
                            <div className='text-black'>
                                <p>VIN: {sold_vehicle_info.sold_vehicle_vin}</p>
                                <p>Year: {sold_vehicle_info.year}</p>
                                <p>Make: {sold_vehicle_info.make}</p>
                                <p>Model: {sold_vehicle_info.model}</p>
                                <p>Sold on: {sold_vehicle_info.sold_on}</p>
                                <p>Sales Rep: {sold_vehicle_info.sales_rep}</p>
                                <p>Road Hazard: {sold_vehicle_info.road_hazard}</p>
                                <p>Payment Type: {sold_vehicle_info.payment_Type}</p>
                                <p>Payment Term: {sold_vehicle_info.payment_Term}</p>
                                <p>Monthly Payment: {sold_vehicle_info.monthly_payment}</p>
                                <p>Lender: {sold_vehicle_info.lender}</p>
                                <p>Gap: {sold_vehicle_info.gap}</p>
                                <p>Front Gross: {sold_vehicle_info.front_Gross}</p>
                                <p>Finance Reserve: {sold_vehicle_info.finance_Reserve}</p>
                                <p>Finance Manager: {sold_vehicle_info.finance_Manager}</p>
                                <p>Finance Income: {sold_vehicle_info.finance_Income}</p>
                                <p>Down Payment: {sold_vehicle_info.down_payment}</p>
                                <p>Deal Status: {sold_vehicle_info.deal_Status}</p>
                                <p>Deal: {sold_vehicle_info.deal}</p>
                                <p>Credit Disability: {sold_vehicle_info.credit_disability}</p>
                                <p>Credit Life: {sold_vehicle_info.credit_Life}</p>
                                <p>Car Care: {sold_vehicle_info.car_care}</p>
                                <p>Back Gross: {sold_vehicle_info.back_Gross}</p>
                                <p>AS Income: {sold_vehicle_info.AS_income}</p>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
