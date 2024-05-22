import "./App.css";
import useAuth from "./hooks/useAuth";
import useRoutes from "./hooks/useRoutes";
import Preloader from "./components/preloader/Preloader";

function App() {
  const { isAuth, isLoading , isGid } = useAuth();

  const routes = useRoutes(isAuth , isGid);


  if (isLoading) {
    return <Preloader full />;
  }
  return <div className="App">{routes}</div>;
}

export default App;
