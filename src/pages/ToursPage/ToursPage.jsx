import { useEffect, useMemo } from "react";
import PageContainer from "../../components/containers/PageContainer";
import TableContainer from "../../components/TableContainer/TableContainer";
import { TableRow, TableCell } from "@mui/material";
import TourTable from "../../components/tables/TourTable";
import useTours from "../../hooks/useTours";
import Preloader from "../../components/preloader/Preloader";
import useAuth from "../../hooks/useAuth";

function ToursPage() {
  const { tours, getTours, isLoading } = useTours();
  const { isGid, authData } = useAuth();

  useEffect(() => {
    getTours();
  }, [getTours]);

  const renderList = useMemo(() => {
    if (isGid) {
      return tours
        .filter((el) => el.user?.id === authData?.id)
        .map((el) => <TourTable key={el.id} {...el} />);
    }
    return tours.map((el) => <TourTable key={el.id} {...el} />);
  }, [tours, isGid, authData?.id]);

  if (isLoading) return <Preloader full />;
  return (
    <PageContainer
      title={`${isGid ? "Ваши" : ""} Туры`}
      pathToAdd="/tour/create"
      btnText={"+ Добавить тур"}
    >
      <TableContainer
        isLoading={isLoading}
        Header={
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Локация</TableCell>
            <TableCell>Длительность</TableCell>
            <TableCell />
          </TableRow>
        }
        Body={renderList}
      />
    </PageContainer>
  );
}

export default ToursPage;
