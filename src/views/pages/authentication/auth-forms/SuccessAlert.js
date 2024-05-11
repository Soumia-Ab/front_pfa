import React, { useState } from 'react';
import { Snackbar, Alert, Button } from '@mui/material';

const SuccessAlert = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fonction pour ouvrir le Snackbar
  const handleOpenSnackbar = () => {
    setSnackbarOpen(true);
  };

  // Fonction pour fermer le Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      {/* Bouton pour simuler la création de compte */}
      <Button onClick={handleOpenSnackbar} variant="contained" color="primary">
        Créer un compte
      </Button>

      {/* Snackbar avec un message de succès */}
      <Snackbar
        open={snackbarOpen} // Contrôle si le Snackbar est visible
        autoHideDuration={6000} // Temps d'affichage (6 secondes)
        onClose={handleCloseSnackbar} // Fonction de fermeture
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" // Couleur verte pour indiquer un succès
          sx={{ width: '100%' }}
        >
          Compte créé avec succès! Veuillez vérifier votre e-mail pour valider votre compte.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SuccessAlert;
