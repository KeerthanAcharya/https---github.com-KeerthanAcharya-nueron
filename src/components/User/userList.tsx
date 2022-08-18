import React, { useContext, useEffect } from 'react';
import { Col, Row, Button, Table, Image, Modal } from 'react-bootstrap';
import './userList.css';
import add from '../../assets/images/AddButton.svg';
import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import { userDeleteApi, userListApi } from '../../controllers/users';
import { useHistory } from 'react-router';
import { UserContext } from '../common/UserContext';

import { agentTypes } from '../common/globalValues';
import Loader from '../common/Loader';
import NoDataFound from '../common/NoDataFound';
import { dateformater } from '../common/dateFormat';
import { useQuery } from 'react-query';

interface dataSet {
    userList1: [];
    first_name: string;
    last_name: string;
    email: string;
    createdAt: string;
    active_status: string;
    role: string;
    password: string;
    _id: string;
    granted_organization: string[];
}
interface filter {
    name: string;
    sort: Function;
}
const UserList = () => {
    const [show, setShow] = React.useState<boolean>(false);
    const [userList, setUserList] = React.useState([]);
    const [filterData, setFilterData] = React.useState([]);
    const [userFilter, setUserFilter] = React.useState('All');
    const [deleteId, setDeleteId] = React.useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(true);
    const Globalvalues: any = agentTypes;

    const handleClose = () => setShow(false);
    const { authToken } = useContext(UserContext);

    const { refetch } = useQuery('users', () => userListApi(authToken), {
        onSuccess: (data) => {
            setUserList(data?.body?.data ?? []);
            setFilterData(data?.body?.data ?? []);
            setIsLoading(false);
        },
    });

    useEffect(() => {
        setIsLoading(true);
    }, []);

    const handleSearch: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchUser = userList.filter((word: filter) => {
            return word.name.toLowerCase().startsWith(e.target.value);
        });
        if (e.target.value === '') {
            setFilterData(userList);
        } else {
            setFilterData(searchUser);
        }
    };
    const handleDelete = () => {
        userDeleteApi(authToken, deleteId).then(() => {
            setShow(false);
            setDeleteId('');
            refetch();
        });
    };
    const handleFilter = (filter: string) => {
        if (filter !== 'All') {
            const filterData = userList.filter((data: { role: string }) => {
                return data.role === filter;
            });
            setFilterData(filterData);
            setUserFilter(filter);
        } else {
            setFilterData(userList);
            setUserFilter(filter);
        }
    };
    return (
        <div className='containerBox'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Row className='spacing-2'>
                        <Col md='8' lg='8' className='button-col'>
                            <div className='spacing-1-1'>
                                <div className='pad-button card-title'>Users</div>
                                <div className='pad-button'>
                                    <Button
                                        className={
                                            userFilter === 'All'
                                                ? 'buttons text active'
                                                : 'buttons text'
                                        }
                                        onClick={() => handleFilter('All')}
                                        variant='outline-secondary'>
                                        All
                                    </Button>{' '}
                                </div>
                                <div className='pad-button'>
                                    <Button
                                        className={
                                            userFilter === 'admin'
                                                ? 'buttons text active'
                                                : 'buttons text'
                                        }
                                        onClick={() => handleFilter('admin')}
                                        variant='outline-secondary'>
                                        Admin
                                    </Button>{' '}
                                </div>
                                <div className='pad-button'>
                                    <Button
                                        className={
                                            userFilter === 'manager_internal'
                                                ? 'buttons text active'
                                                : 'buttons text'
                                        }
                                        onClick={() => handleFilter('manager_internal')}
                                        variant='outline-secondary'>
                                        Manager Internal
                                    </Button>{' '}
                                </div>
                                <div>
                                    <Button
                                        className={
                                            userFilter === 'rep_internal'
                                                ? 'buttons text active'
                                                : 'buttons text'
                                        }
                                        onClick={() => handleFilter('rep_internal')}
                                        variant='outline-secondary'>
                                        REP Internal
                                    </Button>{' '}
                                </div>
                                <div className='pad-button'>
                                    <Button
                                        className={
                                            userFilter === 'dealer_admin'
                                                ? 'buttons text active'
                                                : 'buttons text'
                                        }
                                        onClick={() => handleFilter('dealer_admin')}
                                        variant='outline-secondary'>
                                        Dealer Admin
                                    </Button>{' '}
                                </div>
                                <div className='pad-button'>
                                    <Button
                                        className={
                                            userFilter === 'dealer_rep'
                                                ? 'buttons text active'
                                                : 'buttons text'
                                        }
                                        onClick={() => handleFilter('dealer_rep')}
                                        variant='outline-secondary'>
                                        Dealer REP
                                    </Button>{' '}
                                </div>
                            </div>
                        </Col>
                        <Col className='search-col'>
                            <div>
                                {/* <InputGroup>
									<InputGroup.Text className='search-icon' id='basic-addon1'>
										<Image className='search-button' src={search} />
									</InputGroup.Text>
									<FormControl
										className='search-input'
										onChange={handleSearch}
										placeholder='Search'
										aria-label='Username'
										aria-describedby='basic-addon1'
									/>
								</InputGroup> */}
                            </div>
                            <Image
                                onClick={() => history.push('/users/create')}
                                className='add-button'
                                src={add}
                            />
                        </Col>
                    </Row>
                    <hr className='divider-line1' />
                    <Row className='spacing-1'>
                        {!userList.length ? (
                            <NoDataFound
                                message1='Add users to get started'
                                message2='Click on the plus icon to add users'
                            />
                        ) : !filterData.length ? (
                            <NoDataFound
                                message1='No users found for this search query.'
                                message2=''
                            />
                        ) : (
                            <Table responsive className='table' borderless>
                                <thead className='table-head'>
                                    <tr className='table-row no-after'>
                                        {/* <th>ID</th> */}
                                        <th></th>
                                        <th className='width20'>Name</th>
                                        <th className='width20'>Email</th>
                                        {/* <th className='width20'>Status</th> */}
                                        <th className='width20'>Role</th>
                                        <th className='width20'>Created At</th>
                                        <th className='width20'>Actions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {filterData.map((data: dataSet, index) => {
                                        return (
                                            <tr className='table-row'>
                                                <td></td>
                                                {/* <td className="body-tr iconDetail">{index + 1}</td> */}
                                                <td className='body-tr iconDetail'>{`${data.first_name} ${data.last_name}`}</td>
                                                <td className='body-tr iconDetail'>{data.email}</td>
                                                {/* <td className='body-tr iconDetail'>
													<div
														className={
															data.active_status
																? "status-success"
																: "status-failure"
														}>
														{data.active_status ? "Active" : "Inactive"}
													</div>
												</td> */}
                                                <td
                                                    className='body-tr iconDetail'
                                                    style={{ width: '15%' }}>
                                                    {Globalvalues[data.role]}
                                                </td>

                                                <td className='body-tr iconDetail'>
                                                    {dateformater(data.createdAt)}
                                                </td>
                                                <td>
                                                    {/* <div className='action'>
                                                        <div
                                                            className='iconDetail paddingRight'
                                                            onClick={() =>
                                                                history.push({
                                                                    pathname: `/users/edit/${data._id}`,
                                                                    state: data,
                                                                })
                                                            }>
                                                            <Image
                                                                className='iconAction'
                                                                src={editIcon}
                                                            />
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                setShow(!show);
                                                                setDeleteId(data._id);
                                                            }}
                                                            className='iconDetail paddingMiddle'>
                                                            <Image
                                                                className='iconAction'
                                                                src={deleteIcon}
                                                            />
                                                        </div>
                                                    </div>{' '} */}
                                                </td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        )}
                    </Row>
                    <Modal centered show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the user</Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant='secondary'
                                // onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='danger'
                                // onClick={handleDelete}
                            >
                                Delete User
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};
export default UserList;
