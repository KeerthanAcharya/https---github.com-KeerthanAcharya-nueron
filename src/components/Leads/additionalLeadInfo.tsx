import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import RepairOrderDetails, { Repairorder } from '../vehicle/repairVehicleInfo';
import SoldVehicleDetails, { SoldVehicleInfo } from '../vehicle/soldVehicleDetails';
import XmlDetails from '../vehicle/xmlDetails';
import VehicleDetails, { VehicleInfo } from '../vehicle/vehicleDetails';
import CarFax from '../vehicle/carFax';

type Props = {
    lead: {
        vehicle_info: VehicleInfo;
        sold_vehicle_info: SoldVehicleInfo;
        repair_order: Repairorder;
        xml: string;
    };
};

export default function AdditionalLeadInfo({ lead }: Props) {
    return (
        <div className='containerBox bg-white'>
            <Tabs defaultActiveKey='first'>
                <Tab eventKey='first' title='Vehicle Info'>
                    <VehicleDetails vehicle_info={lead.vehicle_info} />
                </Tab>
                <Tab eventKey='second' title='Sold Vehicle Info'>
                    <SoldVehicleDetails sold_vehicle_info={lead.sold_vehicle_info} />
                </Tab>
                <Tab eventKey='third' title='Repair Order'>
                    <RepairOrderDetails repair_order={lead.repair_order} />
                </Tab>
                <Tab eventKey='fourth' title='Carfax'>
                    <CarFax carfax_info={lead.vehicle_info.vehicle_details.carfax_info} />
                </Tab>
                <Tab eventKey='fifth' title='XML Details'>
                    <XmlDetails xml={lead.xml} />
                </Tab>
            </Tabs>
        </div>
    );
}
