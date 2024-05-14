import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PageContainerStyle, PageTitleBar } from "./PageContainer.style";
import PropTypes from "prop-types";
import Preloader from "../preloader/Preloader";

function PageContainer({ title, pathToAdd, btnText, isLoading, children }) {
  if (isLoading) return <Preloader full />;
  return (
    <PageContainerStyle>
      <PageTitleBar>
        <Typography variant="h4">{title}</Typography>
        {pathToAdd && (
          <Link to={pathToAdd}>
            <Button variant="contained">{btnText}</Button>
          </Link>
        )}
      </PageTitleBar>
      <div className="space" />
      {children}
    </PageContainerStyle>
  );
}

PageContainer.propTypes = {
  title: PropTypes.string,
  pathToAdd: PropTypes.string,
  btnText: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default PageContainer;
