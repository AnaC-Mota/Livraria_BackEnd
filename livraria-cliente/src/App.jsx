//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Admin,Resource,ListGuesser, EditGuesser} from 'react-admin';
import { LivroEdit, LivroList, LivroCreate } from './livros';
import { EditoraCreate, EditoraEdit, EditoraList } from './editoras';
import { AutorCreate, AutorEdit, AutorList } from './autors';

import lb4Provider from 'react-admin-lb4';

const dataProvider = lb4Provider('http://localhost:3000', () => {},"id");


import './App.css'

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="livros" list={LivroList} edit={LivroEdit} create={LivroCreate}/>
    <Resource name="editoras" list={EditoraList} edit={EditoraEdit} create={EditoraCreate} recordRepresentation="nome"/>
    <Resource name="autors" list={AutorList} edit={AutorEdit} create={AutorCreate}/>
  </Admin>
);  

export default App
