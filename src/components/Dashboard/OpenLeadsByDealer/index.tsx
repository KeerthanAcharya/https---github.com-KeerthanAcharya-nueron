import React, { useContext, useState } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useQuery } from 'react-query';
import { openLeadsDealerApi } from '../../../controllers/leads';
import { CustomTable } from '../../common/customTable';
import { dateformater, timeformater } from '../../common/dateFormat';
import Loader from '../../common/Loader';
import { UserContext } from '../../common/UserContext';

function OpenLeadsByDealer() {
    const [allLeadsByDealerPage, setAllLeadsByDealerPage] = useState(1);
    const { authToken } = useContext(UserContext);

    const { data: openDealerData, isLoading: isOpenDealerLoading } = useQuery(
        'open-leads-dealer',
        () => openLeadsDealerApi(authToken)
    );
    const allLeadsByDealerColumns: ColumnDescription[] = React.useMemo(
        () => [
            {
                dataField: '_id.dealer',
                text: 'Dealer',
            },
            {
                dataField: '_id.leadcreatedat',
                text: 'Lead Created At',
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
    return isOpenDealerLoading ? (
        <Loader />
    ) : (
        <div
            style={{
                maxHeight: '20rem',
                overflow: 'auto',
            }}>
            <CustomTable
                keyField='count'
                data={openDealerData.body ? openDealerData.body : []}
                page={allLeadsByDealerPage}
                limit={0}
                handleTableChange={(type, { page }) => {
                    setAllLeadsByDealerPage(page);
                }}
                totalSize={0}
                noDataIndication='No Open Leads By Dealer'
                columns={allLeadsByDealerColumns}
                pointer={false}
                custom
            />
        </div>
    );
}

export default OpenLeadsByDealer;
