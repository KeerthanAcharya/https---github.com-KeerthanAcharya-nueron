import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { Col, Row, Modal, Card, Form, Button, Table, Tab, Nav } from 'react-bootstrap';

import { UserContext } from '../common/UserContext';
import { leadDetailsApi, leadFilterDetailsApi, leadUpdateApi } from '../../controllers/leads';
import { dateformater, timeformater } from '../common/dateFormat';

import Loader from '../common/Loader';
import { toastify } from '../common/notification';
import AdditionalLeadInfo from './additionalLeadInfo';

import LeadPersonalDetails, { Dealer } from './leadPersonalDetails';
import { dealerListApi } from '../../controllers/dealers';

const LeadDetails = () => {
    const { id }: any = useParams();
    const { authToken, id: currentUserId, role } = useContext(UserContext);
    const {
        state,
    }: {
        state: {
            toggle: string;
        };
    } = useLocation();

    const [lead, setLead] = useState<any>(null);
    const [userList, setUserList] = useState<any[]>([]);
    const [dealer, setDealer] = useState<Dealer | undefined>();
    const [openNote, setOpenNote] = useState<boolean>(false);
    const [isLeadLoading, setIsLeadLoading] = useState<boolean>(true);
    const [isDealerLoading, setIsDealerLoading] = useState<boolean>(true);
    const [isFilterDetailsLoading, setIsFilterDetailsLoading] = useState<boolean>(true);
    const [note, setNote] = useState<string>('');
    const [leadStatus, setLeadStatus] = useState<any>([]);
    const [opportunitiesStatus, setOpportunitiesStatus] = React.useState<any>([]);

    const {
        data: leadDetails,
        isError: isLeadError,
        refetch,
    } = useQuery(['leadDetails', id], () => leadDetailsApi(authToken, id), {
        onSuccess: (data: any) => {
            setLead(data.body.data);
            refetchDealer();
            refetchFilters();
        },
        onError: (error: any) => {
            toastify('failure', 'Failed to fetch lead details');
            setLead({});
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (leadDetails) {
            setLead(leadDetails.body.data);
            setIsLeadLoading(false);
        }
    }, [leadDetails]);

    const {
        data: filterDetailsData,
        isError: isFilterDetailsError,
        refetch: refetchFilters,
    } = useQuery('filterDetails', () => leadFilterDetailsApi(authToken), {
        staleTime: 120000,
    });

    const { refetch: refetchDealer, data: dealersData } = useQuery(
        'dealers',
        () => dealerListApi(authToken),
        {
            enabled: !!leadDetails,
        }
    );

    const leadMutation = useMutation((data: any) => leadUpdateApi(authToken, data), {
        onSuccess: () => {
            toastify('success', 'Lead updated successfully');
            refetch();
        },
    });

    useEffect(() => {
        if (filterDetailsData) {
            const _userList = filterDetailsData.body.user_detail.map(
                (user: { _id: string; first_name: string; last_name: string }) => ({
                    key: user._id,
                    value: user.first_name + ' ' + user.last_name,
                })
            );

            const statusList = Object.entries(filterDetailsData.body.lead_status).map(([k, v]) => ({
                key: k,
                value: v,
            }));

            const opportunitiesStatusList = Object.entries(filterDetailsData.body.opp_status).map(
                ([k, v]) => ({
                    key: k,
                    value: v,
                })
            );

            setLeadStatus(statusList);
            setUserList(_userList);
            setOpportunitiesStatus(opportunitiesStatusList);
            setIsFilterDetailsLoading(false);
        }
    }, [filterDetailsData]);

    useEffect(() => {
        if (dealersData && leadDetails) {
            const _dealer_details = dealersData.body.data.find((dealerr: any) => {
                return dealerr.dealer_id === leadDetails.body.data.dealer_id;
            });
            setDealer(_dealer_details);
            setIsDealerLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealersData, leadDetails]);

    if (isLeadError || isFilterDetailsError) {
        return null;
    }

    return (
        <div className='containerBox'>
            {isLeadLoading ||
            isFilterDetailsLoading ||
            isDealerLoading ||
            leadMutation.isLoading ? (
                <Loader />
            ) : (
                <>
                    <Row className='spacing-2'>
                        <Col className='button-col'>
                            <div className='spacing-1-1'>
                                <div></div>
                                <div className='pad-button text-name'>Lead Details</div>
                            </div>
                        </Col>
                    </Row>

                    <hr className='divider-line' />

                    <Row className='spacing-1'>
                        <div className='form-container'>
                            <Row className='mb-3'>
                                <Col md={2}>
                                    <h3>Name</h3>
                                    {lead && (
                                        <p>
                                            {lead.customer_details.first_name}{' '}
                                            {lead.customer_details.last_name}
                                        </p>
                                    )}
                                </Col>
                                <Col md={3}>
                                    <h3>Email</h3>
                                    {lead && <p>{lead.customer_details.email}</p>}
                                </Col>
                                <Col md={2}>
                                    <h3>Phone</h3>
                                    {lead && <p>{lead.customer_details.mobile_number}</p>}
                                </Col>
                                <Col md={2}>
                                    <h3>Dealer Id</h3>
                                    <p>{lead && lead.dealer_id}</p>
                                </Col>
                                <Col md={2}>
                                    <h3>Dealer Name</h3>
                                    <p>{lead && lead.dealer_name}</p>
                                </Col>
                            <Col md={2}>
                                    <h3>RO Open Date</h3>
                                    {lead && <p>{dateformater(lead.ro_open_date)}</p>}
                                </Col>
                                <Col md={2}>
                                    <h3>RO Close Date</h3>
                                    {lead && <p>{dateformater(lead.ro_close_date)}</p>}
                            </Col>
                                <Col md={2}>
                                    <h3>Status</h3>
                                    <Form.Select
                                        value={lead.status}
                                        onChange={(event: any) => {
                                            leadMutation.mutateAsync({
                                                id,
                                                status: event.target.value,
                                            });
                                        }}
                                        className='mb-3 select-field'>
                                        <option value={lead.status} key={lead.status}>
                                            {lead.status &&
                                                lead.status[0].toUpperCase() + lead.status.slice(1)}
                                        </option>
                                        {state?.toggle === 'lead'
                                            ? leadStatus
                                                  .filter(
                                                      (e: { key: string }) => e.key !== lead.status
                                                  )
                                                  .map((e: { key: string; value: string }) => (
                                                      <option
                                                          value={e.key}
                                                          key={e.key}
                                                          className='capitialize'>
                                                          {e.value}
                                                      </option>
                                                  ))
                                            : opportunitiesStatus
                                                  .filter(
                                                      (e: { key: string }) => e.key !== lead.status
                                                  )
                                                  .map((e: { key: string; value: string }) => (
                                                      <option
                                                          value={e.key}
                                                          key={e.key}
                                                          className='capitialize'>
                                                          {' '}
                                                          {e.value}
                                                      </option>
                                                  ))}
                                    </Form.Select>
                                </Col>
                                {role === 'rep_internal' ? (
                                    <Col md={2}>
                                        <h3>Owner</h3>
                                        <Form.Select
                                            value={lead.owner}
                                            onChange={(event: any) => {
                                                leadMutation.mutate({
                                                    id,
                                                    owner: event.target.value,
                                                });
                                            }}
                                            disabled={lead.owner !== ''}
                                            className='mb-3 select-field'>
                                            {lead.owner === '' ? (
                                                <>
                                                    <option key={'unassigned'} value={''}>
                                                        Unassigned
                                                    </option>
                                                    <option key='self' value={currentUserId}>
                                                        self
                                                    </option>
                                                </>
                                            ) : (
                                                userList.map((user: any) => (
                                                    <option value={user.key} key={user.key}>
                                                        {user.value}
                                                    </option>
                                                ))
                                            )}
                                        </Form.Select>
                                    </Col>
                                ) : (
                                    <Col md={2}>
                                        <h3>Owner</h3>
                                        <Form.Select
                                            value={lead.owner}
                                            onChange={(event: any) => {
                                                leadMutation.mutate({
                                                    id,
                                                    owner: event.target.value,
                                                });
                                            }}
                                            disabled={role === 'rep_internal' && lead.owner !== ''}
                                            className='mb-3 select-field'>
                                            <option key={'unassigned'} value={''}>
                                                Unassigned
                                            </option>
                                            <option key='self' value={currentUserId}>
                                                self
                                            </option>
                                            {userList.map((user: any) => (
                                                <option value={user.key} key={user.key}>
                                                    {user.value}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}
                            </Row>
                            <hr className='divider-line' />
                            <Row>
                                <Tab.Container transition={false} defaultActiveKey='first'>
                                    <Row>
                                        <Col md='auto'>
                                            <Nav variant='pills' className='flex-column'>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='first' className='pointer'>
                                                        Lead Info
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='second' className='pointer'>
                                                        Additional Info
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='third' className='pointer'>
                                                        Notes
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey='fourth' className='pointer'>
                                                        Status History
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col>
                                            <Tab.Content>
                                                <Tab.Pane eventKey='first'>
                                                    <LeadPersonalDetails
                                                        messages={lead?.messages ?? []}
                                                        dealer={dealer ? dealer : {}}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey='second'>
                                                    <AdditionalLeadInfo lead={lead} />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey='third'>
                                                    <div className='containerBox'>
                                                        <Card className='mx-1 '>
                                                            <Card.Header>
                                                                <Card.Title as='h4'>
                                                                    Notes History
                                                                </Card.Title>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <button
                                                                    onClick={() =>
                                                                        setOpenNote(true)
                                                                    }>
                                                                    Create Note
                                                                </button>
                                                                <div className='notes-list'>
                                                                    <Table striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Notes</th>
                                                                                <th>Created At</th>
                                                                            </tr>
                                                                        </thead>

                                                                        <tbody>
                                                                            {lead &&
                                                                                lead.notes.map(
                                                                                    (
                                                                                        note: any,
                                                                                        index: number
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                index
                                                                                            }>
                                                                                            <td>
                                                                                                {
                                                                                                    note.note
                                                                                                }
                                                                                            </td>
                                                                                            <td>
                                                                                                {`${dateformater(
                                                                                                    note.created_at
                                                                                                )} - ${timeformater(
                                                                                                    note.created_at
                                                                                                )}`}
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
                                                </Tab.Pane>
                                                <Tab.Pane eventKey='fourth'>
                                                    <div className='containerBox'>
                                                        <Card className='mx-1 card-sec'>
                                                            <Card.Header>
                                                                <Card.Title>
                                                                    <h3>Status History</h3>
                                                                </Card.Title>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <div className='activity-list'>
                                                                    <Table striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Status</th>
                                                                                <th>Updated At</th>
                                                                            </tr>
                                                                        </thead>

                                                                        <tbody>
                                                                            {lead &&
                                                                                lead.status_history &&
                                                                                lead.status_history.map(
                                                                                    (
                                                                                        status: any,
                                                                                        index: number
                                                                                    ) => (
                                                                                        <tr
                                                                                            key={
                                                                                                index
                                                                                            }>
                                                                                            <td>
                                                                                                {
                                                                                                    status.new_status
                                                                                                }
                                                                                            </td>
                                                                                            <td>{`${dateformater(
                                                                                                status.status_lastupdated_at
                                                                                            )} - ${timeformater(
                                                                                                status.status_lastupdated_at
                                                                                            )}`}</td>
                                                                                        </tr>
                                                                                    )
                                                                                )}
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Row>
                        </div>
                    </Row>

                    <Modal
                        centered
                        show={openNote}
                        onHide={() => {
                            setOpenNote(false);
                            setNote('');
                        }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create new note</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col>
                                <div>
                                    <textarea
                                        className='search-input'
                                        onChange={(e) => setNote(e.target.value)}
                                        value={note}
                                        placeholder='Note'
                                        aria-label='Username'
                                        aria-describedby='basic-addon1'
                                    />
                                </div>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant='secondary'
                                onClick={() => {
                                    setOpenNote(false);
                                    setNote('');
                                }}>
                                Cancel
                            </Button>
                            <Button
                                variant='danger'
                                onClick={() => {
                                    leadMutation.mutateAsync({ id, note, appointment: 'no' });
                                    setOpenNote(false);
                                    setNote('');
                                }}>
                                Save
                            </Button>
                            <Button
                                variant='danger'
                                onClick={() => {
                                    leadMutation.mutateAsync({ id, note, appointment: 'yes' });
                                    setOpenNote(false);
                                    setNote('');
                                }}>
                                {`Save & Send`}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default LeadDetails;
