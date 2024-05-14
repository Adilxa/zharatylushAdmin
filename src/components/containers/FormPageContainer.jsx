import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageContainerStyle, PageTitleBar } from "./PageContainer.style";
import PropTypes from "prop-types";
import Preloader from "../preloader/Preloader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function FormPageContainer({ title, isLoading, children }) {
  const navigate = useNavigate();
  if (isLoading) return <Preloader full />;
  return (
    <PageContainerStyle>
      <Button sx={{ mb: 2 }} onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{mr: 1}}/>
        Назад
      </Button>
      <PageTitleBar>
        <Typography variant="h4">{title}</Typography>
      </PageTitleBar>
      <div className="space" />
      {children}
    </PageContainerStyle>
  );
}

FormPageContainer.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default FormPageContainer;
