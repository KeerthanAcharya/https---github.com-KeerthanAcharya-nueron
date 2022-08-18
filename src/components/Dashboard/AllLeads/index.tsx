import React, { useContext, useState } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useQuery } from 'react-query';
import { allLeadsApi } from '../../../controllers/leads';
import { pstTime } from '../../../utils/utils';
import { CustomTable } from '../../common/customTable';
import { dateformater, timeformater } from '../../common/dateFormat';
import Loader from '../../common/Loader';
import { UserContext } from '../../common/UserContext';

export default function AllLeads() {
    const [allLeadsPage, setAllLeadsPage] = useState(1);

    const { authToken } = useContext(UserContext);

    const { data: allLeadsData, isLoading: isLeadsLoading } = useQuery('all-leads', () =>
        allLeadsApi(authToken)
    );

    const allLeadsColumns: ColumnDescription[] = React.useMemo(
        () => [
            {
                dataField: '_id.leadcreatedat',
                text: 'Lead Created At',
                formatter: (cell: any, row: any) => {
                    return dateformater(cell);
                },
            },
            {
                dataField: '_id.dealer',
                text: 'Dealer',
            },
            {
                dataField: 'count',
                text: 'Count',
            },
        ],
        []
    );

    return isLeadsLoading ? (
        <Loader />
    ) : (
        <div
            style={{
                height: '20rem',
                overflow: 'auto',
            }}>
            <CustomTable
                keyField='count'
                data={allLeadsData.body ? allLeadsData.body : []}
                page={allLeadsPage}
                limit={allLeadsData.body ? allLeadsData.body.length : 0}
                handleTableChange={(type, { page }) => {
                    setAllLeadsPage(page);
                }}
                totalSize={0}
                noDataIndication='No Leads'
                columns={allLeadsColumns}
                tableClasses='h-50'
                pointer={false}
                custom
            />
        </div>
    );
}
