import { Button } from "@mui/material";

function ErrorPage() {


    const onClearData = () => {
        localStorage.removeItem
        ("adminKey")
        window.location.href= "/"
    }

    return (
        <section style={{ position: "fixed", zIndex: 1000, height: "100vh", width: "100%", background: "white" , left:0 , display:"grid", placeItems:"center" }}>
            <h1>404</h1>

            <Button onClick={onClearData}>Go Login Page</Button>
        </section>
    );
}

export default ErrorPage;