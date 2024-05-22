import { json, useParams } from "react-router-dom";
import $api from "../../http/Api";
import { useEffect, useState } from "react";
import Preloader from "../../components/preloader/Preloader";
import { Container, Typography, Grid, Paper, TextField, Button } from "@mui/material";

function UserPage() {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const params = useParams();

    const getUser = async () => {
        try {
            const res = await $api.get("user/" + params.id);
            setUserData(res.data);
            setEditedData({ role: res.data.role }); // Initialize editedData with user role
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    useEffect(() => {
        getUser();
    }, [params.id]); // Added params.id as a dependency to refetch if the id changes

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            await $api.patch("/user/" + params.id, { role: editedData.role });
            setUserData({ ...userData, role: editedData.role }); // Update userData with the edited role
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
        <Container>
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>
                    User Details
                </Typography>
                <Grid container spacing={2}>
                    {Object.entries(userData).map(([key, value]) => (
                        <Grid item xs={12} key={key}>
                            {editMode && key === 'role' ? (
                                <TextField
                                    fullWidth
                                    label="Role"
                                    name="role"
                                    value={editedData.role || ''}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography variant="subtitle1">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                </Typography>
                            )}
                        </Grid>
                    ))}
                    {editMode ? (
                        <>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="secondary" onClick={() => setEditMode(false)}>
                                    Cancel
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleEdit}>
                                Edit
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Container>
    );
}

export default UserPage;
