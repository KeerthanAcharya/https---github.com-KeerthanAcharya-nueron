import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

type Props = {
    dealerList:
        | {
              key: string;
              value: string;
          }[]
        | any;
    userList:
        | {
              key: string;
              value: string;
          }[]
        | any;
    filterLeads: any;
    statusList:
        | {
              key: string;
              value: string;
          }[]
        | any;
    toggle: string;
    filterQuery: Object;
};

export const FilterLeads = ({
    dealerList,
    userList,
    filterLeads,
    statusList,
    toggle,
    filterQuery,
}: Props) => {
    const [values, setValues] = useState<DateObject | DateObject[] | null>([]);
    const [selectedFilters, setSelectedFilters] = useState({
        status: '',
        dealer: '',
        owner: '',
        sdate: '',
        edate: '',
        customer_name: '',
        phone_no: '',
        reset: false,
    });

    // useEffect(() => {
    //     console.log('selectedFilters', selectedFilters, userList, dealerList);
    //     setSelectedFilters({
    //         status: toggle === 'lead' ? 'open_leads' : 'open_opp',
    //         dealer: '',
    //         owner: '',
    //         sdate: '',
    //         edate: '',
    //         customer_name: '',
    //         phone_no: '',
    //         reset: false,
    //     });
    // }, [toggle]);

    useEffect(() => {
        setSelectedFilters({
            ...selectedFilters,
            ...filterQuery,
        });
        const query = localStorage.getItem('filterQuery');
        if (query) {
            setSelectedFilters({
                ...selectedFilters,
                ...JSON.parse(query),
            });
        }
    }, []);

    const onFilterChange = (e: any) => {
        e.preventDefault();
        setSelectedFilters({
            ...selectedFilters,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (dates: DateObject[]) => {
        if (dates.length === 1) {
            setSelectedFilters({
                ...selectedFilters,
                sdate: dates[0].toString(),
                edate: moment(dates[0].toString()).add(1, 'days').toString(),
            });
        }
        if (dates.length === 2) {
            setSelectedFilters({
                ...selectedFilters,
                sdate: dates[0].toString(),
                edate: moment(dates[1].toString()).add(1, 'days').toString(),
            });
        }

        setValues(dates);
    };

    const submitFilters = (e: any) => {
        e.preventDefault();
        const filtersObj = Object.fromEntries(
            Object.entries(selectedFilters).filter(([_, v]) => v !== '')
        );
        filtersObj.reset = false;
        localStorage.setItem('filterQuery', JSON.stringify(filtersObj));
        localStorage.setItem('toggle', toggle);
        console.log('FILTERS::', filtersObj);
        filterLeads(filtersObj);
    };

    const resetFilters = (e: any) => {
        e.preventDefault();
        setSelectedFilters({
            dealer: '',
            edate: '',
            owner: '',
            sdate: '',
            status: '',
            customer_name: '',
            phone_no: '',
            reset: true,
        });
        setValues([]);
        filterLeads({
            dealer: '',
            edate: '',
            owner: '',
            sdate: '',
            status: '',
            customer_name: '',
            phone_no: '',
            reset: true,
        });
    };

    return (
        <div className='py-1'>
            <Card className='py-3'>
                <Card.Body>
                    <Form onSubmit={submitFilters} onReset={resetFilters}>
                        <Form.Group className='row gap-4'>
                            <div className='col-md-3'>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name='status'
                                    onChange={onFilterChange}
                                    value={selectedFilters.status}>
                                    <option value=''>Select</option>
                                    {statusList.map((e: { key: string; value: string }) => (
                                        <option
                                            value={e.key}
                                            key={e.key}
                                            className='text-capitalize'>
                                            {e.value}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                            <div className='col-md-3'>
                                <Form.Label>Dealership</Form.Label>
                                <Form.Select
                                    name='dealer'
                                    onChange={onFilterChange}
                                    value={selectedFilters.dealer}>
                                    <option value=''>Select</option>
                                    {dealerList.map((dealer: any) => (
                                        <option value={dealer.key} key={dealer.key}>
                                            {dealer.value}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                            <div className='col-md-3'>
                                <Form.Label>Owner</Form.Label>
                                <Form.Select
                                    name='owner'
                                    onChange={onFilterChange}
                                    value={selectedFilters.owner}>
                                    <option value=''>Select</option>
                                    {userList.map((user: any) => (
                                        <option value={user.key} key={user.key}>
                                            {user.value}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                            <div className='col-md-3 d-flex align-items-center'>
                                <div className='w-100'>
                                    <Form.Label>Lead created</Form.Label>
                                    <DatePicker
                                        value={values}
                                        placeholder='Select Date'
                                        onChange={handleDateChange}
                                        range
                                        plugins={[<DatePanel />]}
                                    />
                                </div>
                            </div>
                            <div className='col-md-3 mt-auto'>
                                <Form.Group className='mb-3' controlId='formBasicEmail'>
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='customer_name'
                                        placeholder='Enter customer name'
                                        onChange={onFilterChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-md-3 mt-auto'>
                                <Form.Group className='mb-3' controlId='formBasicEmail'>
                                    <Form.Label>Phone No</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='phone_no'
                                        onChange={onFilterChange}
                                        placeholder='Enter customer phone no'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-md-3 mt-auto'>
                                <Button className='w-100' variant='primary' type='submit'>
                                    SEARCH
                                </Button>
                            </div>

                            {!!Object.entries(selectedFilters).filter(([_, v]) => v !== '')
                                .length && (
                                <div className='col-md-2 mt-auto'>
                                    <Button className='w-20' variant='secondary' type='reset'>
                                        RESET
                                    </Button>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
