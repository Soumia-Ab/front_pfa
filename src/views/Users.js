import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { IconEye,IconBan,IconCheck } from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
Button,Box,
  Dialog,Avatar,Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Ajoutez des styles personnalisés
const imgStyles = {
  width: '50px', // Taille réduite
  height: '50px',
  borderRadius: '50%', // Bord arrondi
  objectFit: 'cover', // Couper les images pour correspondre à la taille
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Un peu d'ombre pour le style
};

const Users = () => {
  const token = localStorage.getItem('authToken');
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  console.log(selectedUser)
  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true); // Ouvre le modal
  };

  const handleClose = () => {
    setOpen(false); // Ferme le modal
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/users/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
      }
    };

    fetchData(); // Récupère les données lors du montage du composant
  }, [token]);

  return (
    <MainCard title="Users List" style={{marginTop:"40px"}}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '-20px', padding: '15px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Profil</strong></TableCell>
                  <TableCell><strong>Prénom</strong></TableCell>
                  <TableCell><strong>Nom</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>État</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <img src={`http://localhost:8080/images/${item.profile}`} alt="Profile" style={imgStyles} />
                    </TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.login}</TableCell>
                    <TableCell>{item.activate ? 'Activé' : 'désactivé'}</TableCell>
                    <TableCell>
                       <IconEye  color='#673ab7' onClick={() => handleOpen(item)}/>     
                       {item.activate ?      <IconBan color='red'/>
  :                        <IconCheck color='green'/>

                           }
                      {/* Actions comme éditer, supprimer, etc. */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Informations utilisateur</DialogTitle>
      <DialogContent>
        {selectedUser && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={`http://localhost:8080/images/${selectedUser.profile}`} // Assurez-vous que le chemin de l'image est correct
              alt="Profile Picture"
              sx={{
                width: 100, // Taille de l'image
                height: 100,
                borderRadius: '50%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                marginBottom: 2, // Espacement entre l'image et le texte
              }}
            />

            <Typography variant="h6">
              {selectedUser.firstName} {selectedUser.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Email:</strong> {selectedUser.login}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>État:</strong> {selectedUser.activate ? 'Actif' : 'Inactif'}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
    </MainCard>
  );
};

export default Users;
