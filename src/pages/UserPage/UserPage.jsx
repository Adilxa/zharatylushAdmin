import { useParams } from "react-router-dom";
import $api from "../../http/Api";
import { useEffect, useState } from "react";
import Preloader from "../../components/preloader/Preloader";
import { Container, Typography, Grid, TextField, Button, Card, CardContent, CardActions, Box } from "@mui/material";

function UserPage() {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const params = useParams();

    const getUser = async () => {
        try {
            const res = await $api.get("user/" + params.id);
            setUserData(res.data);
            setEditedData(res.data); // Initialize editedData with all user data
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, [params.id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            await $api.put("/user/" + params.id, editedData);
            setUserData(editedData); // Update userData with the edited data
            setEditMode(false);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    if (!userData) return <Preloader full />;

    return (
        <Container >
            <Card elevation={2} style={{ padding: 20, marginTop: 20 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {userData.email}
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(userData).map(([key, value]) => (
                            <Grid item xs={12} sm={6} key={key}>
                                {editMode ? (
                                    <TextField
                                        fullWidth
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        name={key}
                                        value={editedData[key] || ''}
                                        onChange={handleChange}
                                        disabled={key === 'id' || key === 'createDate'} // Disable editing for id and createDate
                                    />
                                ) : (
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </Typography>
                                        <Typography variant="body1">
                                            {value.toString()}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
                <CardActions>
                    {editMode ? (
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setEditMode(false)}>
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Edit
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Container>
    );
}

export default UserPage;
