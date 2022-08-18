import React, { useContext, useState } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useQuery } from 'react-query';
import { leadsProgressionApi } from '../../../controllers/leads';
import { pstTime } from '../../../utils/utils';
import { CustomTable } from '../../common/customTable';
import { dateformater, timeformater } from '../../common/dateFormat';
import Loader from '../../common/Loader';
import { UserContext } from '../../common/UserContext';

function LeadProgression() {
    const [leadsProgressionPage, setLeadsProgressionPage] = useState(1);
    const { authToken } = useContext(UserContext);

    const { data: leadsProgressionData, isLoading: isLeadProgressionLoading } = useQuery(
        'leads-progression',
        () => leadsProgressionApi(authToken)
    );

    const leadsProgressionColumns: ColumnDescription[] = React.useMemo(
        () => [
            {
                dataField: '_id.leadcreatedat',
                text: 'Created At',
                formatter: (cell: any, row: any) => {
                    return dateformater(cell);
                },
            },
            {
                dataField: '_id.status',
                text: 'Status',
            },
            {
                dataField: 'count',
                text: 'Count',
            },
        ],
        []
    );
    return isLeadProgressionLoading ? (
        <Loader />
    ) : (
        <div
            style={{
                maxHeight: '20rem',
                overflow: 'auto',
            }}>
            <CustomTable
                keyField='count'
                data={leadsProgressionData.body ? leadsProgressionData.body : []}
                page={leadsProgressionPage}
                limit={leadsProgressionData.body ? leadsProgressionData.body.length : 0}
                handleTableChange={(type, { page }) => {
                    setLeadsProgressionPage(page);
                }}
                totalSize={0}
                noDataIndication='No Leads Progression'
                columns={leadsProgressionColumns}
                pointer={false}
                custom
            />
        </div>
    );
}

export default LeadProgression;
