import React, { useContext, useState } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useQuery } from 'react-query';
import { botLeadsApi } from '../../../controllers/leads';
import { pstTime } from '../../../utils/utils';
import { CustomTable } from '../../common/customTable';
import { dateformater, timeformater } from '../../common/dateFormat';
import Loader from '../../common/Loader';
import { UserContext } from '../../common/UserContext';

export default function BotLeads() {
    const [botLeadsPage, setBotLeadsPage] = useState(1);
    const { authToken } = useContext(UserContext);

    const { data: botLeadsData, isLoading: isBotLeadsLoading } = useQuery('bot-leads', () =>
        botLeadsApi(authToken)
    );

    const botLeadsColumns: ColumnDescription[] = React.useMemo(
        () => [
            {
                dataField: '_id.record_created_at',
                text: 'Created At',
                formatter: (cell: any, row: any) => {
                    return dateformater(cell);
                },
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

    return isBotLeadsLoading ? (
        <Loader />
    ) : (
        <div
            style={{
                height: '20rem',
                overflow: 'auto',
            }}>
            <CustomTable
                keyField='count'
                data={botLeadsData.body ? botLeadsData.body : []}
                page={botLeadsPage}
                limit={botLeadsData.body ? botLeadsData.body.length : 0}
                handleTableChange={(type, { page }) => {
                    setBotLeadsPage(page);
                }}
                totalSize={botLeadsData.body ? botLeadsData.body.length : 0}
                noDataIndication='No Bot Leads'
                columns={botLeadsColumns}
                pointer={false}
                custom
            />
        </div>
    );
}
