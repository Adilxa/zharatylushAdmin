import $api from "../../http/Api";
import React, { useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableCell, TableRow } from "@mui/material";
import Sightstable from "../../components/tables/SightsTable";

function SightsPage() {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getSightsData = async () => {
        setLoading(true)
        try {
            const res = await $api.get("sights")
            setData(res.data)
        } catch (e) {
            console.log(e);
        }
        setLoading(false)
    }

    const renderTables = useMemo(() => (
        data.map((el) => <Sightstable key={el.id} {...el} />)
    ), [data])


    useEffect(() => {
        getSightsData()
    }, [])


    return (
        <PageContainer title="Достопримечательности" pathToAdd="/sights/create" btnText={"+ добавить"}>
            <TableContainer
                isLoading={isLoading}
                Header={
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Tour title</TableCell>
                        <TableCell></TableCell>

                    </TableRow>
                }
                Body={renderTables}

            />
        </PageContainer>
    )
}

export default SightsPage;