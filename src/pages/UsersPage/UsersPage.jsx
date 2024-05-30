import React, { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import useUsers from "../../hooks/useUsers";
import Preloader from "../../components/preloader/Preloader";
import UserTable from "../../components/tables/Usertable";


const UsersPage = () => {

    const { isLoading, userData, getUsers } = useUsers()

    useEffect(() => {
        getUsers()
    }, [])

    const renderUsers = useMemo(() => {

        if (userData) {
            const sortedUserData = [...userData].sort((a, b) => {
                if (a.role === 'admin' && b.role !== 'admin') {
                    return -1;
                }
                if (b.role === 'admin' && a.role !== 'admin') {
                    return 1;
                }
                return 0;
            });
            return sortedUserData.map((el, i) => (
                <UserTable key={el.createDate + i} title={el.email} {...el} />
            ));
        }
    }, [userData]);

    if (isLoading) return <Preloader full={true} />
    return (
        <PageContainer title="Пользователи">
            <TableContainer Header={
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Дата Создания</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell>Админ</TableCell>
                    <TableCell>Гид</TableCell>
                    <TableCell>Юзер</TableCell>


                    <TableCell />
                </TableRow>
            }
                Body={renderUsers}
            >

            </TableContainer>
        </PageContainer>
    )
}


export default UsersPage;