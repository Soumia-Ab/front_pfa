//import { useTheme } from '@mui/material/styles';
import logoImage from './logo.jpg'; // Chemin vers votre image JPEG

const Logo = () => {
  //const theme = useTheme();

  return (
    // Utilisez un élément <img> pour afficher le logo
    <img
      src={logoImage}
      alt="Logo"
        
      width="200" // Ajustez la largeur selon vos besoins
      height="300" // Ajustez la hauteur selon vos besoins
      style={{ objectFit: 'contain', 
      marginTop: '-80px', // Ajustez la marge supérieure
      marginBottom: '-120px',
      }} // Pour assurer que l'image s'ajuste sans déformation
    />
  );
};

export default Logo;
