import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box, Button, Checkbox, Snackbar, Alert, Divider,FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment,InputLabel,OutlinedInput,TextField,Typography,useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
//import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
/*
  const googleHandler = async () => {
    console.error('Register');
  };
*/
/*
const villesDuMaroc = [
  'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan',
  // Ajoutez d'autres villes selon vos besoins
];*/
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position de l'alerte
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Compte créé avec succès! Veuillez vérifier votre e-mail pour valider votre compte.
        </Alert>
      </Snackbar>
      <Grid container direction="column" justifyContent="center" spacing={2}>
       
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
Inscrivez-vous avec votre adresse e-mail            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
       
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          fname: '', 
          lname: '',
          adresse:'',
          dateNaiss:'01/01/2000',
          telephone:'',

          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email est requis'),
          password: Yup.string().max(255).required('Password est requis'),
          fname: Yup.string().required('Le prénom est requis'), // Optionnel : validation pour "fname"
          lname: Yup.string().required('Le nom de famille est requis'),
          adresse: Yup.string().required('Veuillez saisir votre adresse'), // Validation pour la ville
          telephone: Yup.string().required('Veuillez saisir votre numero de telephone'), // Validation pour la ville
          dateNaiss: Yup.string().required('Veuillez choisir votre adresse de naissance '), // Validation pour la ville

        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

          try {
         console.log(values.fname)
            const response = await axios.post('http://localhost:8080/register', {
              login: values.email,
              password: values.password,
              firstName:values.fname,
              lastName:values.lname,
              adresse:values.adresse,
              dateNaiss:values.dateNaiss,
              telephone:values.telephone
            });
         
            if (response.status === 200) { // Vérifiez le statut de la réponse
              console.log('created');
              setSnackbarOpen(true); // Ouvrir le Snackbar pour afficher l'alerte

              setStatus({ success: true });
              // Vous pouvez effectuer des actions comme la redirection, stockage du token, etc.
            }
        
            setSubmitting(false); // Arrête la soumission pour éviter des comportements indésirables
          } catch (err) {
            console.error('Erreur lors de la creation de compte', err);
            setStatus({ success: false });
          }
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={values.fname}
                  onChange={handleChange}

                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  margin="normal"
                  name="lname"
                  type="text"
                  value={values.lname}
l            onChange={handleChange}

                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
              <Grid item xs={12} >
              <TextField
                  fullWidth
                  label="Adresse"
                  margin="normal"
                  name="adresse"
                  type="text"
                  value={values.adresse}
l            onChange={handleChange}
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                    {touched.adresse && errors.adresse && (
                      <FormHelperText error>{errors.adresse}</FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} >
              <TextField
                  fullWidth
                  label="Date de Naissance "
                  margin="normal"
                  name="dateNaiss"
                  type="Date"
                  value={values.dateNaiss}
l            onChange={handleChange}
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                    {touched.dateNaiss && errors.dateNaiss && (
                      <FormHelperText error>{errors.dateNaiss}</FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} >
              <TextField
                  fullWidth
                  label="Numero de telephone "
                  margin="normal"
                  name="telephone"
                  type="text"
                  value={values.telephone}
l            onChange={handleChange}
                  defaultValue=""
                  sx={{ ...theme.typography.customInput }}
                />
                    {touched.telephone && errors.telephone && (
                      <FormHelperText error>{errors.telephone}</FormHelperText>
                    )}
                </Grid>
              
                <Grid item xs={12} >

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">adresse Email </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            </Grid >

            <Grid item xs={12}  >

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Mot de passe </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            </Grid >

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
   </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                     Accepter les &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                    Conditions Générales
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
Créer un nouveau compte                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
