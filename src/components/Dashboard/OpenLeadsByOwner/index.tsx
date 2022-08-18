import React, { useContext, useState } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useQuery } from 'react-query';
import { openLeadsOwnerApi } from '../../../controllers/leads';
import { CustomTable } from '../../common/customTable';
import Loader from '../../common/Loader';
import { UserContext } from '../../common/UserContext';

export default function OpenLeadsByOwner() {
    const [allLeadsByOwnerPage, setAllLeadsByOwnerPage] = useState(1);
    const { authToken } = useContext(UserContext);

    const { data: openLeadsOwnerData, isLoading: isOpenLeadsOwnerLoading } = useQuery(
        'open-leads-owner',
        () => openLeadsOwnerApi(authToken)
    );

    const allLeadsByOwnerColumns: ColumnDescription[] = React.useMemo(
        () => [
            {
                dataField: '_id.owner',
                text: 'Owner',
            },
            {
                dataField: '_id.dealer',
                text: 'Dealer',
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

    return isOpenLeadsOwnerLoading ? (
        <Loader />
    ) : (
        <div
            style={{
                maxHeight: '20rem',
                overflow: 'auto',
            }}>
            <CustomTable
                keyField='count'
                data={openLeadsOwnerData.body ? openLeadsOwnerData.body : []}
                page={allLeadsByOwnerPage}
                limit={0}
                handleTableChange={(type, { page }) => {
                    setAllLeadsByOwnerPage(page);
                }}
                totalSize={0}
                noDataIndication='No Open Leads By Owner'
                columns={allLeadsByOwnerColumns}
                pointer={false}
                custom
            />
        </div>
    );
}
