import React, { useEffect, useMemo, useState } from 'react';
import { InputLabel, Select, TextField, Button, ImageList, ImageListItem, Container, Grid, Box, Typography, MenuItem, FormControl } from '@mui/material';
import FormPageContainer from '../../components/containers/FormPageContainer';
import $api from '../../http/Api';
import { toast } from 'react-toastify';

const SightsCreate = () => {
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [imgList, setImgList] = useState([]);
    const [description, setDescription] = useState('');
    const [tour, setTour] = useState('');

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = async (e) => {
        const res = await toBase64(e.target.files[0]);
        setImg(res);
    };

    const handleImageListChange = async (e) => {
        const files = Array.from(e.target.files);
        const imgList = await Promise.all(files.map(file => toBase64(file)));
        setImgList(prevImgList => [...prevImgList, ...imgList]);
    };


    const notify = () => toast("Success")
    const badReq = () => toast("Something went wrong!")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sightData = {
            title,
            img,
            imgList,
            description,
            tour: parseInt(tour),
        };
        console.log({ ...sightData });
        await $api.post("/sights", { ...sightData })
            .then(() => {
                notify()
                setTitle("");
                setImg("")
                setImgList([])
                setDescription("")
                setTour("")
            })
            .catch(() => {
                badReq()
            })
        // You can send sightData to your backend here
    };

    ///

    const [tours, setTours] = useState([]);

    const getTours = async () => {
        try {
            const res = await $api.get("tour");
            setTours(res.data)
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        getTours()
    }, [])

    const renderSelectTour = useMemo(() => (
        tours.map((el) => (
            <MenuItem key={el.id} value={el.id}>{el.title}</MenuItem>
        ))
    ), [tours])

    ///

    return (
        <FormPageContainer title="" isLoading={false}>
            <Container maxWidth="md">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Tour</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tour}
                                    label="Tour"
                                    required
                                    placeholder='Tour'
                                    onChange={(e) => setTour(e.target.value)}
                                >
                                    {renderSelectTour}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Upload Main Image</Typography>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload-input"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload-input">
                                <Button
                                    component="span"
                                    variant="outlined"
                                >
                                    Upload Image
                                </Button>
                            </label>
                            {img && (
                                <Box mt={2}>
                                    <ImageListItem key={img}>
                                        <img
                                            src={img}
                                            alt="Uploaded"
                                            style={{ maxHeight: 100, objectFit: 'contain' }}
                                        />
                                    </ImageListItem>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Upload Additional Images</Typography>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-list-upload-input"
                                type="file"
                                onChange={handleImageListChange}
                                multiple
                            />
                            <label htmlFor="image-list-upload-input">
                                <Button
                                    component="span"
                                    variant="outlined"
                                >
                                    Upload Images
                                </Button>
                            </label>
                            {imgList.length > 0 && (
                                <Box mt={2} sx={{ maxHeight: 300, overflowY: 'auto' }}>
                                    <ImageList cols={3} gap={10}>
                                        {imgList.map((image, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Additional Image ${index + 1}`}
                                                    style={{ height: 100, objectFit: 'contain' }}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create Sight
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </FormPageContainer>
    );
};

export default SightsCreate;
