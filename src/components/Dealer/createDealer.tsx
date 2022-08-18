import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { toastify } from '../common/notification';

import { Col, Row, Button, Image, InputGroup, Form } from 'react-bootstrap';

import leftArrow from '../../assets/images/leftArrow.svg';

import { UserContext } from '../common/UserContext';

import Loader from '../common/Loader';
import { createDealerApi } from '../../controllers/dealers';

const CreateDealer = () => {
    const [isLoading, setIsLoading] = React.useState<Boolean>(false);

    const [name, setName] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [websiteUrl, setWebsiteUrl] = React.useState<string>('');
    const [timezone, setTimezone] = React.useState<string>('');
    const [crmName, setCrmName] = React.useState<string>('');
    const [crmAdfMail, setCrmAdfMail] = React.useState<string>('');
    const [inventoryTool, setInventoryTool] = useState<string>('');
    const [preferredBook, setPreferredBook] = useState<string>('');
    const [contactName, setContactName] = useState<string>('');
    const [dealershipGroup, setDealershipGroup] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [dealType, setDealType] = React.useState('');

    const { authToken, role: currentUserRole } = useContext(UserContext);

    const history = useHistory();

    const location: {
        pathname: any;
        state: any;
        search: any;
    } = useLocation();

    const handleCreate = () => {
        const dealerData = {
            dealer_name: name,
            website: websiteUrl,
            timezone,
            contact_name: contactName,
            phone: phone,
            address,
            crm_name: crmName,
            adf_email: crmAdfMail,
            preferred_book: preferredBook,
            inventory_tool: inventoryTool,
            dealership_group: dealershipGroup,
            notes: notes,
            deal_type: dealType,
            is_active: true,
            is_update: 0,
        };

        console.log('options', dealerData);

        createDealerApi(authToken, dealerData).then((res) => {
            if (res.statusCode === 400) {
                toastify('failure', JSON.parse(res.body).message);
            } else {
                handleBack();
            }
            console.log('res', res);
        });
    };

    const handleUpdate = () => {
        const dealerData = {
            id: location.state._id,
            dealer_id: location.state.dealer_id,
            dealer_name: name,
            website: websiteUrl,
            timezone,
            contact_name: contactName,
            phone: phone,
            address,
            crm_name: crmName,
            // adf_email: crmAdfMail,
            preferred_book: preferredBook,
            inventory_tool: inventoryTool,
            dealership_group: dealershipGroup,
            notes: notes,
            deal_type: dealType,
            is_active: true,
            is_update: 1,
        };

        console.log('options', dealerData);

        createDealerApi(authToken, dealerData).then((res) => {
            if (res.statusCode === 400) {
                toastify('failure', JSON.parse(res.body).message);
            } else {
                handleBack();
            }
            console.log('res', res);
        });
    };

    const handleBack = () => {
        history.push('/dealers');
    };

    useEffect(() => {
        if (location.pathname.includes('edit')) {
            const state: any = history.location.state;
            setName(state.dealer_name);
            setAddress(state.address);
            setWebsiteUrl(state.website);
            setTimezone(state.timezone);
            setCrmName(state.crm_name);
            setCrmAdfMail(state.adf_email);
            setPreferredBook(state.preferred_book);
            setInventoryTool(state.inventory_tool);
            setDealershipGroup(state.dealership_group);
            setNotes(state.notes);
            setDealType(state.deal_type);
            setContactName(state.contact_name);
            setPhone(state.phone);
        }
    }, [location, history]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='containerBox'>
            {/* Topbar Code*/}
            <Row className='spacing-2'>
                <Col className='button-col'>
                    <div className='spacing-1-1'>
                        <div>
                            <Image
                                onClick={() => {
                                    handleBack();
                                }}
                                className='pointer'
                                src={leftArrow}
                            />
                        </div>
                        <div className='pad-button text-name'>
                            {location.pathname.includes('create')
                                ? 'Create Dealer'
                                : 'Update Dealer'}
                        </div>
                    </div>
                </Col>
            </Row>
            <hr className='divider-line' />

            <Row className='spacing-1'>
                <div className='form-container'>
                    <Form>
                        <Row className='mb-3'>
                            {/* Name Field */}
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Dealer Name</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                        placeholder='Enter name'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Address</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={address}
                                        onChange={(e: any) => setAddress(e.target.value)}
                                        placeholder='Enter address'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Phone</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={phone}
                                        onChange={(e: any) => setPhone(e.target.value)}
                                        placeholder='Enter phone'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Website</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={websiteUrl}
                                        onChange={(e: any) => setWebsiteUrl(e.target.value)}
                                        placeholder='Enter website url'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Timezone</Form.Label>
                                <Form.Select
                                    aria-label='Select timezone'
                                    value={timezone}
                                    onChange={(e: any) => setTimezone(e.target.value)}>
                                    <option>Select timezone</option>
                                    <option value='PST'>PST</option>
                                    <option value='MST'>MST</option>
                                    <option value='CST'>CST</option>
                                    <option value='EST'>EST</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>CRM Name</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={crmName}
                                        disabled={location.pathname.includes('edit') ? true : false}
                                        onChange={(e: any) => setCrmName(e.target.value)}
                                        placeholder='Enter crm name'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>CRM Adf Email</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        disabled={location.pathname.includes('edit') ? true : false}
                                        value={crmAdfMail}
                                        onChange={(e: any) => setCrmAdfMail(e.target.value)}
                                        placeholder='Enter crm adf mail'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Inventory Tool</Form.Label>
                                <Form.Select
                                    aria-label='Select inventory tool'
                                    value={inventoryTool}
                                    onChange={(e: any) => setInventoryTool(e.target.value)}>
                                    <option>Select inventory tool</option>
                                    <option value='inventory tool 1'>inventory tool 1</option>
                                    <option value='inventory tool 2'>inventory tool 2</option>
                                    <option value='inventory tool 3'>inventory tool 3</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Preferred Book</Form.Label>
                                <Form.Select
                                    aria-label='Select preferred book'
                                    value={preferredBook}
                                    onChange={(e: any) => setPreferredBook(e.target.value)}>
                                    <option>Select preferred book</option>
                                    <option value='preffered book 1'>preferred book 1</option>
                                    <option value='preffered book 2'>preferred book 2</option>
                                    <option value='preffered book 3'>preferred book 3</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Contact Name</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={contactName}
                                        onChange={(e: any) => setContactName(e.target.value)}
                                        placeholder='Enter contact name'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Dealership Group</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={dealershipGroup}
                                        onChange={(e: any) => setDealershipGroup(e.target.value)}
                                        placeholder='Enter dealership group'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Notes</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        as='textarea'
                                        rows={3}
                                        value={notes}
                                        onChange={(e: any) => setNotes(e.target.value)}
                                        placeholder='Type notes here'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Deal Type</Form.Label>
                                <Form.Select
                                    aria-label='Select deal type'
                                    value={dealType}
                                    onChange={(e: any) => setDealType(e.target.value)}>
                                    <option>Select deal type</option>
                                    <option value='deal type 1'>deal type 1</option>
                                    <option value='deal type 2'>deal type 2</option>
                                    <option value='deal type 3'>deal type 3</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>

                    <div className='button-container'>
                        <Button
                            onClick={
                                location.pathname.includes('create') ? handleCreate : handleUpdate
                            }
                            variant='primary'
                            type='submit'
                            disabled={(() => {
                                if (name.trim().length === 0) return true;
                                else if (address.trim().length === 0) return true;
                                else if (phone.trim().length === 0) return true;
                                else if (websiteUrl.trim().length === 0) return true;
                                else if (timezone.trim().length === 0) return true;
                                else if (crmName.trim().length === 0) return true;
                                else if (crmAdfMail.trim().length === 0) return true;
                                else if (inventoryTool.trim().length === 0) return true;
                                else if (preferredBook.trim().length === 0) return true;
                                else if (contactName.trim().length === 0) return true;
                                else if (dealershipGroup.trim().length === 0) return true;
                                else if (notes.trim().length === 0) return true;
                                else if (dealType.trim().length === 0) return true;
                                return false;
                            })()}>
                            {location.pathname.includes('create')
                                ? '+ Create Dealer'
                                : 'Update Dealer'}
                        </Button>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default CreateDealer;
