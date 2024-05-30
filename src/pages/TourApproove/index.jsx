import React, { useMemo, useEffect } from 'react'
import PageContainer from '../../components/containers/PageContainer';
import TableContainer from '../../components/TableContainer/TableContainer';
import useAuth from '../../hooks/useAuth';
import useTours from '../../hooks/useTours';
import TourTable from '../../components/tables/TourTable';
import { TableCell, TableRow } from '@mui/material';
import Preloader from '../../components/preloader/Preloader';

function TourApproove() {
    const { tours, isLoading, getTours } = useTours();
    const { isGid, authData } = useAuth();

    useEffect(() => {
        getTours()
    }, [])

    const renderList = useMemo(() => {

        if (isGid) {
            return tours
                .filter((el) => el.user?.id == authData.id)
                .map((el) => <TourTable key={el.id} isGid={isGid} {...el} />);
        } else {
            return tours.map((el) => (
                <TourTable key={el.id} isApprove={el.isApprove} isApprovePage={true} {...el} />
            ));
        }
    }, [tours]);

    if (isLoading) return <Preloader full />;
    return (
        <PageContainer title="Одобрение тура">
            <TableContainer
                isLoading={isLoading}
                Header={
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Локация</TableCell>
                        <TableCell>Длительность</TableCell>
                        <TableCell></TableCell>
                        <TableCell />
                    </TableRow>
                }
                Body={renderList}
            />
        </PageContainer>
    );
}

export default TourApproove;
