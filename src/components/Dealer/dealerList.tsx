import React, { useContext, useEffect } from 'react';
import { Col, Row, Button, Table, Image, Modal } from 'react-bootstrap';

import './dealerList.css';
import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import addIcon from '../../assets/icons/AddButton.svg';

import { dealerListApi } from '../../controllers/dealers';

import { UserContext } from '../common/UserContext';

import Loader from '../common/Loader';
import NoDataFound from '../common/NoDataFound';
import { useHistory } from 'react-router-dom';

interface dataSet {
    _id: string;
    timezone: string;
    dealer_id: string;
    dealer_name: string;
    name: string;
    dealer_group: string;
    website: string;
    adf_email: string;
    createdAt: string;
    active_status: string;
}
interface filter {
    name: string;
    sort: Function;
}
const DealerList = () => {
    const [show, setShow] = React.useState<boolean>(false);
    const [userList, setUserList] = React.useState([]);
    const [filterData, setFilterData] = React.useState([]);
    const [userFilter, setUserFilter] = React.useState('All');
    // const [deleteId, setDeleteId] = React.useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(true);

    const handleClose = () => setShow(false);
    const { authToken } = useContext(UserContext);

    const listApi = () => {
        dealerListApi(authToken)
            .then((response: any) => {
                setUserList(response?.body?.data ? response.body.data : []);
                setFilterData(response?.body?.data ? response.body.data : []);
                setIsLoading(false);
            })
            .catch((err: any) => {
                console.log(err);
            });
    };
    useEffect(() => {
        setIsLoading(true);
        listApi();
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
        // userDeleteApi(authToken, deleteId).then(() => {
        // 	setShow(false);
        // 	setDeleteId("");
        // 	listApi();
        // });
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
                                <div className='pad-button card-title'>Dealers</div>
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
                                onClick={() => history.push('/dealers/create')}
                                className='add-button'
                                src={addIcon}
                            />
                        </Col>
                    </Row>
                    <hr className='divider-line1' />
                    <Row className='spacing-1'>
                        {!userList.length ? (
                            <NoDataFound
                                message1='Add dealers to get started'
                                message2='Click on the plus icon to add dealers'
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
                                        <th className='width20'>Dealer Id</th>
                                        <th className='width20'>Name</th>
                                        <th className='width20'>Email</th>
                                        {/* <th className='width20'>Dealer Group</th> */}
                                        <th className='width20'>Website</th>
                                        <th className='width20'>Timezone</th>
                                        {/* <th className='width20'>Created At</th> */}
                                        <th className='width20'>Actions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {filterData.map((data: dataSet, index) => {
                                        return (
                                            <tr className='table-row'>
                                                <td className='body-tr iconDetail'>
                                                    {data?.dealer_id}
                                                </td>
                                                <td className='body-tr iconDetail'>
                                                    {data?.dealer_name}
                                                </td>
                                                <td className='body-tr iconDetail'>
                                                    {data?.adf_email}
                                                </td>
                                                {/* <td className='body-tr iconDetail'>
                                                    {data?.dealer_group}
                                                </td> */}
                                                <th className='body-tr iconDetail'>
                                                    {data?.website}
                                                </th>
                                                <th className='body-tr iconDetail'>
                                                    {data?.timezone}
                                                </th>
                                                {/* <td className='body-tr iconDetail'>
                                                    {dateformater(data?.createdAt)}
                                                </td> */}
                                                <td>
                                                    <div className='action'>
                                                        <div
                                                            className='iconDetail paddingRight'
                                                            onClick={() =>
                                                                history.push({
                                                                    pathname: `/dealers/edit/${data._id}`,
                                                                    state: data,
                                                                })
                                                            }>
                                                            <Image
                                                                className='iconAction'
                                                                src={editIcon}
                                                            />
                                                        </div>
                                                        {/* <div
                                                            // onClick={() => {
                                                            //     setShow(!show);
                                                            //     setDeleteId(data._id);
                                                            // }}
                                                            className='iconDetail paddingMiddle'>
                                                            <Image
                                                                className='iconAction'
                                                                src={deleteIcon}
                                                            />
                                                        </div> */}
                                                    </div>{' '}
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
                            <Modal.Title>Delete Dealer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the dealer</Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant='danger' onClick={handleDelete}>
                                Delete User
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};
export default DealerList;
