import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import './style.css'

import AdminNavbar from './AdminNavbar';
import { Table } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import './people.png'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
function ListCategories(props) {
  const [idDelete, setIddelete] = useState();

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [prix_max, setprix_max] = useState("");
  const [prix_min, setprix_min] = useState("");
  const [id, setId] = useState("")
  const status = {
    disponible: "disponible",
    non_disponible: "non disponible",
  };
  const [etat, setEtat] = useState(status.admin);
  const handleChange = (event) => {
    setEtat(event.target.value);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const prj = JSON.parse(localStorage.getItem("projet"));
  let projet = prj._id
  // Affichage des informations de l'utilisateur



  let [data, setData] = useState([])

  const [hidemenu, setHidemenu] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModalD, setShowModalD] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  function handleHide() {
    if (hidemenu == 'hide') {
      setHidemenu('')
    }
    else if (hidemenu == '')
      setHidemenu('hide')
  }

  //fermer model add
  function handleCloseModalAdd() {
    setShowModalAdd(false)
  }
  //afficher model add
  function handleShowModalAdd() {
    setShowModalAdd(true)
  }

  //fermer model update
  function handleCloseModal() {
    ///  caissier(id)
    setShowModal(false);
  };

  //afficher model delete
  function showModalDelete(id) {
    setIddelete(id)
    setShowModalD(true)
  }
  //fermer model delete
  function handleCloseModalDelete() {
    setShowModalD(false)
  }
  //handle submit delete


  function handleSubmitDelete(e) {
    e.preventDefault()
    console.log("iddelete")
    console.log(idDelete)
    axios.post('http://localhost:5001/api/categories/delete', { idDelete })
      .then(res => {
        console.log(res.status)

        if (res.status === 404) {
          console.log("404")
        }
        else {

          window.location.replace(`http://localhost:3000/pro/admins/ListCategorie`);


        }
      }).catch(err => {
        console.log(err)
      })

  }  //afficher le modele de update
  function handleShowModal(id) {
    setId(id)

    const categorie = {
      name, description, prix_max, prix_min, etat
    }
    console.log(categorie)
    axios.post('http://localhost:5001/api/categories/getCategorie',
      { id })
      .then(res => {
        console.log(res.status)
        console.log(res.data)
        console.log(`http://localhost:3000/`)

        if (res.status === 404) {
          /*alert('Password is wrong')*/
          console.log("404")
        }
        else {
          setName(res.data.name)
          setEtat(res.data.etat)
          setdescription(res.data.description)
          setprix_max(res.data.prix_max)
          setprix_min(res.data.prix_min)

        }
      }).then(() => { setShowModal(true) }
      ).catch(err => {
        console.log(err)
      })

  }
  function handleSubmit(e) {
    e.preventDefault()

    const categorie = {
      id, name, description, prix_max, prix_min, etat
    }
    console.log()
    axios.put(`http://localhost:5001/api/categories/update/`,
      categorie)
      .then(res => {
        console.log(res.status)
        if (res.status === 404) {
          console.log("404")
        }
        else {
          console.log("200")
          window.location.replace(`http://localhost:3000/pro/admins/ListCategorie/`);

        }
      }).catch(err => {
        console.log(err)
      })


  }
  function handleSubmitAdd(e) {



    e.preventDefault()
    const categorie = {
      name, description, prix_max, prix_min, etat, projet
    }
    console.log(categorie)
    axios.post('http://localhost:5001/api/categories/add',
      categorie)
      .then(res => {
        console.log(res.status)

        if (res.status === 404) {
          console.log("404")
        }
        if (res.status === 201) {
          console.log("hu")
          window.location.replace(`http://localhost:3000/pro/admins/ListCategorie`);

        }
      }).catch(err => {
        console.log(err)
      })






  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const projet = JSON.parse(localStorage.getItem("projet"));

    // Affichage des informations de l'utilisateur
    console.log(user.NomComplet); // Affiche : "John Doe"
    console.log(projet._id)
    axios.post('http://localhost:5001/api/categories/', { projet })
      .then(res => {
        console.log(res.status)

        if (res.status === 404) {
          console.log("404")
        }
        if (res.status === 200) {

          //  data.date_ajout = moment(data.date_ajout).format('YYYY-MM-DD ');

          setData(res.data)

        }
      }).catch(err => {
        console.log(err)
      })


  }, [])


  return (

    <div className="App">
      <AdminNavbar />
      <section id="content">

        <nav>
          <i class='bx bx-menu' onClick={handleHide} ><AiOutlineMenu /> </i>
          <form action="#">
            <div class="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" class="search-btn">
                <i class='bx bx-search' ><FaSearch style={{ fontSize: '15px' }} /></i>
              </button>
            </div>
          </form>

          <input type="checkbox" id="switch-mode" hidden />
          <label for="switch-mode" class="switch-mode"></label>

          <a href="#" class="profile">
            <img src={'http://localhost:5001/public/people.png'} />
          </a>
        </nav>

        <main>
          <div class="head-title">
            <div class="left">
              <h1>Catégories</h1>

            </div>
            <a class="btn-download">
              <i class='bx bxs-cloud-download' ></i>
              <span class="text" onClick={handleShowModalAdd}><FaPlus /> &nbsp;&nbsp; Ajouter</span>
            </a>
          </div>



          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>Listes des Catégories</h3>
                <i class='bx bx-search' ></i>
                <i class='bx bx-filter' ></i>
              </div>

              <table striped hover>
                <thead>
                  <tr>
                    <th> Nom </th>
                    <th>Description </th>
                    <th>Prix min </th>
                    <th>Prix max</th>
                    <th>date d'ajout </th>
                    <th>Etat</th>
                    <th>Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(categorie => (

                    <tr key={categorie._id}>
                      <td> {categorie.name}</td>
                      <td> {categorie.description}</td>
                      <td> {categorie.prix_min}</td>
                      <td> {categorie.prix_max}</td>
                      <td> {moment(categorie.date_ajout).format('YYYY-MM-DD ')}</td>
                      <td> {categorie.etat}</td>
                      <td><a> <FaEdit onClick={(e) => handleShowModal(categorie._id)} /> </a>
                        <a> <FaTrash onClick={(e) => showModalDelete(categorie._id)} /></a>   </td>
                    </tr>))}
                </tbody>
              </table>

            </div>
          </div>
        </main>
      </section>

      <Modal show={showModalAdd} onHide={handleCloseModalAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" method="POST" >
            <Form.Group controlId="formField1">
              <Form.Control type="text" name="name" minLength="4" className="input-field" required placeHolder="Nom "
                onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formField1">
              <Form.Control type="text" name="email" minLength="4" className="input-field" required placeHolder="description "
                onChange={(e) => setdescription(e.target.value)} />
            </Form.Group>      <Form.Group controlId="formField1">

              <Form.Control type="Number" name="password" minLength="4" className="input-field" required placeHolder="Prix maximum"
                onChange={(e) => setprix_max(e.target.value)} />
            </Form.Group>      <Form.Group controlId="formField1">

              <Form.Control type="Number" name="date-embauche" minLength="4" className="input-field" required placeHolder="prix minimum "
                onChange={(e) => setprix_min(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formField1">
              <Form.Select value={etat} onChange={handleChange} >
                <option value={status.disponible}>{status.disponible}</option>
                <option value={status.non_disponible}>{status.non_disponible}</option>
              </Form.Select>
            </Form.Group>



          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAdd} >
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmitAdd} style={{ backgroundColor: 'rgb(232, 115, 26)' }}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations d'une catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form action="" method="POST" autoComplete="off" className="sign-in-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formField1">

              <Form.Control type="text" name="NomComplet" minLength="4" className="input-field" required placeholder={"Nom complet"}
                onChange={(e) => setId(e.target.value)}
                value={id}
              />
            </Form.Group>   <Form.Group controlId="formField1">

              <Form.Control type="text" name="name" minLength="4" className="input-field" required placeHolder="Nom "
                onChange={(e) => setName(e.target.value)}
                value={name} />
            </Form.Group>      <Form.Group controlId="formField1">

              <Form.Control type="text" name="email" minLength="4" className="input-field" required placeHolder="description "
                onChange={(e) => setdescription(e.target.value)}
                value={description} />
            </Form.Group>      <Form.Group controlId="formField1">

              <Form.Control type="Number" name="password" minLength="4" className="input-field" required placeHolder="Prix maximum"
                onChange={(e) => setprix_max(e.target.value)}
                value={prix_max} />
            </Form.Group>      <Form.Group controlId="formField1">

              <Form.Control type="Number" name="date-embauche" minLength="4" className="input-field" required placeHolder="prix minimum "
                onChange={(e) => setprix_min(e.target.value)}
                value={prix_min} />
            </Form.Group>      <Form.Group controlId="formField1">



              <Form.Select value={etat} onChange={handleChange}  >
                <option value={status.disponible}>{status.disponible}</option>
                <option value={status.non_disponible}>{status.non_disponible}</option>
              </Form.Select>
            </Form.Group>


          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} >
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: 'rgb(232, 115, 26)' }} >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalD} onHide={handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>voulez-vous continuer ?</Modal.Title>
        </Modal.Header>
        <form>
          <Form.Control

            type="hidden"
            placeHolder="Addresse de livraison"
            value={idDelete}


            onChange={(e) => setIddelete(e.target.value)}

          />


        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDelete} >
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmitDelete} style={{ backgroundColor: 'rgb(232, 115, 26)' }}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>




    </div>


  );
}
export default ListCategories;
