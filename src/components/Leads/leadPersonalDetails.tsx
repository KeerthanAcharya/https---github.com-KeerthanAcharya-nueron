import React from 'react';
import { Tabs, Tab, Card, Table } from 'react-bootstrap';
import { dateformater, timeformater } from '../common/dateFormat';
import DealerInfo from '../Dealer/dealerInfo';

export type Message = {
    sender_type: string;
    text: string;
    time: string;
};

export type Dealer = {
    _id: string;
    dealer_id: number;
    dealer_name: string;
    website: string;
    timezone: string;
    contact_details: Contactdetails;
};

interface Contactdetails {
    cell_number: string;
    work_number: string;
    email: string;
    communication_address: string;
}

type Props = {
    messages: Message[];
    dealer: Dealer | {};
};

export default function LeadPersonalDetails({ messages, dealer }: Props) {
    return (
        <div className='containerBox bg-white'>
            <Tabs defaultActiveKey='first'>
                <Tab eventKey='first' title='Messages'>
                    <div className='containerBox'>
                        <Card className='mx-1 '>
                            <Card.Header>
                                <Card.Title as='h4'>Messages History</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className='notes-list'>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Sender</th>
                                                <th>Text</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {messages.map(
                                                (
                                                    message: {
                                                        sender_type: string;
                                                        text: string;
                                                        time: string;
                                                    },
                                                    index: number
                                                ) => (
                                                    <tr key={index}>
                                                        <td>{message.sender_type}</td>
                                                        <td>{message.text}</td>
                                                        <td>
                                                            {`${dateformater(
                                                                message.time
                                                            )} - ${timeformater(message.time)}`}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Tab>
                <Tab eventKey='second' title='Dealership Info'>
                    <DealerInfo dealer={dealer} />
                </Tab>
            </Tabs>
        </div>
    );
}
