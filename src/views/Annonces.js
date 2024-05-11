import { Grid } from '@mui/material';
import{  Button,CardMedia,Typography,CardContent}from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
//import { textAlign } from '@mui/system';
const Annonces = () => {

// ==============================|| TYPOGRAPHY ||============================== //
const token = localStorage.getItem('authToken');
const [data, setData] = useState([]);
//const [selectedUser, setSelectedUser] = useState(null);
//const [open, setOpen] = useState(false);
console.log(data)
/*
const handleOpen = (user) => {
  setSelectedUser(user);
  setOpen(true); // Ouvre le modal
};

const handleClose = () => {
  setOpen(false); // Ferme le modal
};*/
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/ads/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setData(res.data);
        console.log(data)
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
    }
  };

  fetchData(); // Récupère les données lors du montage du composant
}, [token]);


return (
      <MainCard title="Basic Typography"  style={{marginTop:"40px"}}>
    <Grid container spacing={gridSpacing}>
    {data.map((data) => (
        
      <Grid item xs={12} sm={6} key={data.id} >

        <SubCard title={`${data.titre}`}  >
        <CardContent>
           
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8080/images/${data.image}`}  // Remplacez par l'URL de votre image
              alt="Image d'annonce"
            />                
        <br/>
        

            <Typography variant="body1" gutterBottom>
{data.description}            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <Button variant="contained" color="primary">
                  Valider
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary">
                  Détails
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </SubCard>
      </Grid>
     ))} </Grid>
    <SubdirectoryArrowRightIcon />
                  <CategoryIcon />
  </MainCard>
);
};
export default Annonces ;
