import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './dashboard.css';

import Loader from '../common/Loader';

import AllLeads from './AllLeads';
import BotLeads from './BotLeads';
import LeadProgression from './leadsProgression';
import OpenLeadsByDealer from './OpenLeadsByDealer';
import OpenLeadsByOwner from './OpenLeadsByOwner';

const Dashboard = () => {
    return (
        <div className='containerBox'>
            <>
                <Row className='spacing-1'>
                    <Col>
                        <h3>Bot ROs:</h3>
                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: '#868e96',
                            }}>
                            Count of ROs that the bot is working on, grouped by RO date & dealer.
                        </p>
                        <React.Suspense fallback={<Loader />}>
                            <BotLeads />
                        </React.Suspense>
                    </Col>
                    <Col>
                        <h3>All Leads</h3>
                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: '#868e96',
                            }}>
                            Count of leads created, grouped by date and dealership.
                        </p>
                        <React.Suspense fallback={<Loader />}>
                            <AllLeads />
                        </React.Suspense>
                    </Col>
                </Row>
                <Row className='spacing-1'>
                    <Col>
                        <h3>Open Leads Dealer-wise</h3>
                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: '#868e96',
                            }}>
                            Count of open leads, grouped by dealer and created date.
                        </p>
                        <React.Suspense fallback={<Loader />}>
                            <OpenLeadsByDealer />
                        </React.Suspense>
                    </Col>
                    <Col>
                        <h3>Open Leads Owner-wise</h3>
                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: '#868e96',
                            }}>
                            Count of open leads, grouped by owner and created date.
                        </p>
                        <React.Suspense fallback={<Loader />}>
                            <OpenLeadsByOwner />
                        </React.Suspense>
                    </Col>
                </Row>
                <Row className='spacing-1'>
                    <Col>
                        <h3>Leads Progression</h3>
                        <p
                            style={{
                                fontSize: '0.85rem',
                                color: '#868e96',
                            }}>
                            Various states in which leads lie. Count of leads grouped by created
                            date and status.
                        </p>
                        <React.Suspense fallback={<Loader />}>
                            <LeadProgression />
                        </React.Suspense>
                    </Col>
                    <Col></Col>
                </Row>
            </>
        </div>
    );
};
export default Dashboard;
