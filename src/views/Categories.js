// project imports
import {
    Modal,Table,TableBody, TableCell, TableHead, TableRow,Button,Box,  Dialog,Avatar,Typography,  DialogTitle, DialogContent, DialogActions,TableContainer,Paper,Grid
  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
  import { IconEye,IconBan,IconCheck } from '@tabler/icons-react';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useTheme } from '@mui/material/styles';
//import CloseIcon from '@mui/icons-material/Close';

const Categories = () => {
  //  const theme = useTheme();

    const imgStyles = {
        width: '50px', // Taille réduite
        height: '50px',
        borderRadius: '50%', // Bord arrondi
        objectFit: 'cover', // Couper les images pour correspondre à la taille
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Un peu d'ombre pour le style
      };
const token = localStorage.getItem('authToken');
console.log(token)
const [data, setData] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [open, setOpen] = useState(false);
const [showModalAd, setShowModalAd] = useState(false);
const [image, setImage] = useState();
console.log(image)
const handleFileInputChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleSubmit = () => {

  };
function handleShowModalAdd() {
    setShowModalAd(true) 
  }
  function handleCloseModalAdd() {
    setShowModalD(false);
  }
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
        const res = await axios.get('http://localhost:8080/category/getAll', {
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
  /*
  const addCat = () => {
    console.log("click")
  };*/

  return (
  <MainCard title="Liste des catégories " style={{marginTop:"40px"}}> <Button
  variant="contained"
 style={{ marginTop: "-140px", marginLeft: "750px" }}
  startIcon={<AddIcon />}
onClick={handleShowModalAdd}

>
  Ajouter
</Button>
    <Grid container spacing={gridSpacing} >
      
    <Grid item xs={12}>
          <TableContainer component={Paper} style={{ margin: '20px', padding: '15px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell><strong>Titre</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <img src={`http://localhost:8080/images/${item.image}`} alt="Profile" style={imgStyles} />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    
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
              sx={{  width: 100, // Taille de l'image
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
    <Modal open={showModalAd}  onClose={handleCloseModalAdd}  
    
    >
     <div className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen">
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div className="relative bg-white rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Ajouter une nouvelle catégorie</h2>
        <button onClick={handleCloseModalAdd} className="text-gray-600 hover:text-gray-800">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4 mt-2">
          <div className="flex items-center">
            <label htmlFor="name" className="w-24 mr-4 text-gray-800">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={4}
              required
              className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-purple-600 focus:border-purple-600 flex-1"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="image" className="w-24 mr-4 text-gray-800">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <label htmlFor="image" className="cursor-pointer rounded-lg p-2 bg-gray-200 hover:bg-gray-300 text-sm font-medium">
              Choisir une image
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type="button" onClick={handleCloseModalAdd} className="mr-2 text-gray-600 hover:text-gray-800">Annuler</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </Modal>
  

  </MainCard>
);
};
export default Categories;
