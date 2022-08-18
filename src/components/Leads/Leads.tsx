import React, { useContext, useEffect } from 'react';
import { ColumnDescription, TableChangeHandler } from 'react-bootstrap-table-next';
import { useHistory } from 'react-router';
import { Col, Row, Form } from 'react-bootstrap';

import './Leads.css';

import { UserContext } from '../common/UserContext';
import Loader from '../common/Loader';
import NoDataFound from '../common/NoDataFound';
import { FilterLeads } from '../Filters/FilterLeads';
import { CustomTable } from '../common/customTable';
import { useGetLeadsData } from '../../hooks/useGetLeadsData';
import { dateformater, timeformater } from '../common/dateFormat';
import { useQuery } from 'react-query';
import { leadFilterDetailsApi } from '../../controllers/leads';

// interface dataSet {
//     _id: string;
//     customer_details: {
//         email: string;
//         first_name: string;
//         last_name: string;
//         mobile_number: string;
//     };
//     dealer_name: string;
//     owner: string;
//     status: string;
//     owner_name: string;
//     lead_created_at: string;
// }
// interface filter {
//     name: string;
//     sort: Function;
// }

// interface FilterQuery {
//     status: string;
//     dealer_id: string;
//     owner: string;
//     lead_created_at: string;
// }

const Leads = () => {
    const [page, setPage] = React.useState(1);
    const [toggle, setToggle] = React.useState('lead');
    const [limit] = React.useState(10);
    const [filterQuery, setFilterQuery] = React.useState<any>();
    const [userList, setUserList] = React.useState([]);
    const [dealerList, setDealerList] = React.useState([]);
    const [leadStatus, setLeadStatus] = React.useState<any>([]);
    const [opportunitiesStatus, setOpportunitiesStatus] = React.useState<any>([]);

    const history = useHistory();

    const { authToken } = useContext(UserContext);

    const { data: filterDetails, isLoading: isFilterDetailsLoading } = useQuery(
        'filterDetails',
        () => leadFilterDetailsApi(authToken),
        {
            staleTime: 120000,
        }
    );

    useEffect(() => {
        const query = localStorage.getItem('filterQuery');
        const toggleState = localStorage.getItem('toggle');

        if (query) {
            setFilterQuery(JSON.parse(query));
        } else {
            setFilterQuery({
                status: 'open_leads',
                reset: false,
            });
        }

        if (toggleState) {
            console.log('toggleState', toggleState, toggle);
            setToggle(toggleState);
        }
    }, []);

    useEffect(() => {
        if (filterDetails) {
            const userList = filterDetails.body.user_detail.map(
                (user: { _id: string; first_name: string; last_name: string }) => ({
                    key: user._id,
                    value: user.first_name + ' ' + user.last_name,
                })
            );

            const dealerList = filterDetails.body.dealer.map(
                (dealer: { dealer_id: string; dealer_name: string }) => ({
                    key: dealer.dealer_id,
                    value: dealer.dealer_name,
                })
            );

            const statusList = Object.entries(filterDetails.body.lead_status).map(([k, v]) => ({
                key: k,
                value: v,
            }));

            const opportunitiesStatusList = Object.entries(filterDetails.body.opp_status).map(
                ([k, v]) => ({
                    key: k,
                    value: v,
                })
            );

            setLeadStatus(statusList);
            setUserList(userList);
            setDealerList(dealerList);
            setOpportunitiesStatus(opportunitiesStatusList);
        }
    }, [filterDetails]);

    const { data, isLoading: isLeadLoading } = useGetLeadsData(
        page,
        limit,
        !!filterDetails,
        filterDetails,
        filterQuery
    );

    const columns: ColumnDescription[] = React.useMemo(
        () => [
            {
                dataField: '_id',
                text: 'S.No',
                formatter: (_cell, _row, idx) => {
                    return <div>{idx + 1}</div>;
                },
            },
            {
                dataField: 'customer_details.first_name',
                text: 'Name',
                formatter: (_: any, row: any) => {
                    return (
                        <div key={row._id}>
                            <span className='pointer'>
                                {row.customer_details.first_name} {row.customer_details.last_name}
                            </span>
                        </div>
                    );
                },
            },
            {
                dataField: 'dealer_name',
                text: 'Dealership',
            },
            {
                dataField: 'customer_details.email',
                text: 'Email',
            },
            {
                dataField: 'customer_details.mobile_number',
                text: 'Mobile',
            },
            {
                dataField: 'status',
                text: 'Lead Stage',
            },
            {
                dataField: 'owner_name',
                text: 'Owner',
            },
            {
                dataField: 'lead_created_at',
                text: 'Created at',
                formatter: (cell: any) => {
                    return dateformater(cell) + ' - ' + timeformater(cell);
                },
            },
        ],
        []
    );

    const handleTableChange: TableChangeHandler<any> = (type, { page }) => {
        setPage(page);
    };

    const handleToggleChange = () => {
        setToggle((prevToggle) => {
            setFilterQuery({
                status: prevToggle === 'lead' ? 'open_opp' : 'open_leads',
                reset: false,
            });
            return prevToggle === 'lead' ? 'opportunities' : 'lead';
        });
    };

    console.log('Toggle', toggle);

    return (
        <div className='containerBox'>
            {isLeadLoading || isFilterDetailsLoading ? (
                <Loader />
            ) : (
                <>
                    <Row className='spacing-2'>
                        <Col md='8' lg='8' className='button-col'>
                            <div className='spacing-1-1'>
                                <div className='pad-button card-title'>Leads</div>
                                <Form.Check
                                    type='switch'
                                    onChange={handleToggleChange}
                                    id=''
                                    label=''
                                    checked={toggle !== 'lead' ? true : false}
                                    className='card-title ml-3'
                                />
                                <div className='pad-button card-title ml-3'>Opportunities</div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='spacing-1'>
                        <FilterLeads
                            dealerList={dealerList}
                            userList={userList}
                            statusList={toggle === 'lead' ? leadStatus : opportunitiesStatus}
                            filterLeads={setFilterQuery}
                            toggle={toggle}
                            filterQuery={filterQuery}
                        />
                    </Row>
                    <hr className='divider-line1' />
                    <Row className='spacing-1'>
                        {!data ? (
                            <NoDataFound message1='No Leads Found' message2='' />
                        ) : (
                            !filterQuery?.reset && (
                                <CustomTable
                                    keyField='_id'
                                    data={data.body ? data.body : []}
                                    columns={columns}
                                    page={page}
                                    handleTableChange={handleTableChange}
                                    totalSize={
                                        data.config && data.config.totalLeads
                                            ? data.config.totalLeads
                                            : 0
                                    }
                                    noDataIndication={() => <Loader />}
                                    limit={limit}
                                    rowEvents={{
                                        onClick: (e, row, rowIndex) => {
                                            history.push(`/leads/${row._id}`, {
                                                toggle,
                                            });
                                        },
                                    }}
                                />
                            )
                        )}
                    </Row>
                </>
            )}
        </div>
    );
};
export default Leads;
