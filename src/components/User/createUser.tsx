import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { toastify } from '../common/notification';

import { Col, Row, Button, Image, InputGroup, FormControl, Form } from 'react-bootstrap';

import leftArrow from '../../assets/images/leftArrow.svg';
import eyeOpen from '../../assets/images/eyeOpen.svg';
import eyeClose from '../../assets/images/eyeClose.svg';

import { UserContext } from '../common/UserContext';

import { createUserApi } from '../../controllers/users';

import Loader from '../common/Loader';
import ToggleSwitch from '../common/toggleSwitch';

const CreateUser = () => {
    const [isLoading] = React.useState<Boolean>(false);

    const [first_name, setFirstName] = React.useState<string>('');
    const [last_name, setLastName] = React.useState<string>('');
    const [cell_number, setCellNumber] = React.useState<string>('');
    const [work_number, setWorkNumber] = React.useState<string>('');
    const [communication_address, setCommunicationAddress] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [role, setRole] = React.useState('');

    const [status, setStatus] = React.useState(true);

    const { authToken } = useContext(UserContext);
    const history = useHistory();
    const location: {
        pathname: any;
        state: any;
        search: any;
    } = useLocation();

    const changeRoleEventHandler = (event: any) => {
        setRole(event.target.value);
    };

    const handleCreate = () => {
        const options = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            is_active: 1,
            role: role,
            contactdetails: {
                cell_number: cell_number,
                work_number: work_number,
                communication_address: communication_address,
            },
        };

        createUserApi(authToken, options).then((res) => {
            if (res.statusCode === 400) {
                toastify('failure', JSON.parse(res.body).message);
            } else {
                handleBack();
            }
        });
    };

    const handleUpdate = () => {
        // const options = {
        // 	name: name,
        // 	email: email,
        // 	active_status: status,
        // 	role: role,
        // 	granted_agents: [],
        // };
        // updateUserApi(authToken, options, id).then(() => {
        // 	history.push("/users");
        // });
    };

    const handleBack = () => {
        history.push('/users');
    };

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
                            {location.pathname.includes('create') ? 'Create User' : 'Update User'}
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
                                <Form.Label className='text'>First Name</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder='Enter name'
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Last Name</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder='Enter name'
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* Email Field */}
                            <Form.Group size='sm' lg='6' md='6' as={Col} controlId='formGridEmail'>
                                <Form.Label className='text'>Email</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='email'
                                        placeholder='Enter email'
                                        disabled={
                                            location.pathname.includes('create') ? false : true
                                        }
                                    />
                                </InputGroup>
                            </Form.Group>

                            {/* Password field */}
                            {location.pathname.includes('create') && (
                                <Form.Group as={Col} lg='6' md='6' controlId='formGridPassword'>
                                    <Form.Label className='text'>Password</Form.Label>
                                    <InputGroup className='mb-3'>
                                        <FormControl
                                            className='form-input'
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type={showPassword ? 'text' : 'password'}
                                            aria-label='Password'
                                        />
                                        <InputGroup.Text
                                            className='pointer'
                                            onClick={() => setShowPassword(!showPassword)}>
                                            <Image
                                                className='search-button'
                                                src={showPassword ? eyeOpen : eyeClose}
                                            />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            )}

                            {/* Role Field */}
                            <Form.Group as={Col} md='6' lg='6' controlId='formGridState'>
                                <Form.Label className='text'>Role</Form.Label>
                                <Form.Select
                                    value={role}
                                    onChange={changeRoleEventHandler}
                                    defaultValue='default'
                                    className='mb-3 select-field'
                                    disabled={location.pathname.includes('create') ? false : true}>
                                    <option value='default'>Select User Role</option>
                                    <option value='admin'>Admin</option>
                                    <option value='manager_internal'>Manager Internal</option>
                                    <option value='rep_internal'>REP Internal</option>
                                    <option value='dealer_admin'>Dealer Admin</option>
                                    <option value='dealer_rep'>Dealer REP</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Cell Number</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={cell_number}
                                        onChange={(e) => setCellNumber(e.target.value)}
                                        placeholder='Enter Cell Number'
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Work Number</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={work_number}
                                        onChange={(e) => setWorkNumber(e.target.value)}
                                        placeholder='Enter Work Number'
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group size='sm' as={Col} lg='6' md='6' controlId='formGridEmail'>
                                <Form.Label className='text'>Communication Address</Form.Label>
                                <InputGroup className='mb-3'>
                                    <Form.Control
                                        className='form-input'
                                        size='sm'
                                        type='input'
                                        value={communication_address}
                                        onChange={(e) => setCommunicationAddress(e.target.value)}
                                        placeholder='Enter Work Number'
                                    />
                                </InputGroup>
                            </Form.Group>

                            {location.pathname.includes('edit') && (
                                <Form.Group
                                    size='sm'
                                    as={Col}
                                    mb='6'
                                    lg='3'
                                    controlId='formGridEmail'>
                                    <Form.Label className='text'>Status</Form.Label>
                                    <ToggleSwitch
                                        label={status}
                                        handleStatus={() => setStatus(!status)}
                                    />
                                </Form.Group>
                            )}

                            {/* Select organization */}
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
                                if (first_name.trim().length === 0) return true;
                                else if (last_name.trim().length === 0) return true;
                                else if (cell_number.trim().length === 0) return true;
                                else if (email.trim().length === 0) return true;
                                else if (
                                    password.trim().length === 0 &&
                                    location.pathname.includes('create')
                                )
                                    return true;
                                else if (role === '') return true;
                                else if (role === 'default') return true;
                                return false;
                            })()}>
                            {location.pathname.includes('create') ? '+ Create User' : 'Update User'}
                        </Button>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default CreateUser;
