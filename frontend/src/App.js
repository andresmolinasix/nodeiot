import React, { useState, useEffect } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider, Navigate,
  Route
} from 'react-router-dom';
import { Login, Registro, Header, Test,MapComponent,AnomalyList,CategorySelector ,LineChart,HomeTrama,SensorForm ,Trama,HistogramChart, Home, NoFoundPage, NodeRedRedirect, Dashboard } from './components';


/* import { NoFoundPage, Dashboard, Products, ProfilesPages, ProfilePage, Header, HeaderDos, Login, Landing, Home, MainDos, Block1, LandingMain, LoggedDahsboard, LogOperacional, SideBar } from './components';
import appFirebase from './assets/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(appFirebase);
 */
const App = () => {
  /* const [userEmail, setUserEmail] = useState(null);
  const [userLoggedIn, setUserLoggedIn ] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      console.log("unsuscribe: ",unsubscribe, )
      if (usuarioFirebase) {
        setUserEmail(usuarioFirebase.email);
        setUserLoggedIn(true)        
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []); */

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, //loggedIn={userLoggedIn}/>,
      errorElement: <NoFoundPage />,
    },
    {
      path: "/login",
      element: <Login />, // onLogin={setUserEmail} setUserLoggedIn={setUserLoggedIn} />,
      isPrivate: false
    },
    {
      path: "/registro",
      element: <Registro />, // onLogin={setUserEmail} setUserLoggedIn={setUserLoggedIn} />,
      isPrivate: false
    },
    {
      path: "/home",
      element: <HomeTrama />, // onLogin={setUserEmail} setUserLoggedIn={setUserLoggedIn} />,
      isPrivate: false
    },
    {
      path: "/nodered", // Nueva ruta para Node-RED
      element: <NodeRedRedirect /> // Componente que maneja la redirección
    },
    {
      path: "/monitoreo", // Nueva ruta para Node-RED
      element: <HistogramChart /> // Componente que maneja la redirección
    },
    {
      path: "/anomalias", // Nueva ruta para Node-RED
      element: <LineChart /> // Componente que maneja la redirección
    },
    {
      path: "/histogramas", // Nueva ruta para Node-RED
      element: <HistogramChart /> // Componente que maneja la redirección /nuevatrama
    },
    {
      path: "/nuevatrama", // Nueva ruta para Node-RED
      element: <SensorForm /> // Componente que maneja la redirección /SensorForm
    },
    {
      path: "/sensorconf", // Nueva ruta para Node-RED
      element: <Trama /> // Componente que maneja la redirección /SensorForm
    },
    {
      path: "/dashboard/:categoryD", // Nueva ruta para Node-RED
      element: <Dashboard /> // Componente que maneja la redirección /MapComponent
    },
    {
      path: "/map", // Nueva ruta para Node-RED
      element: <MapComponent /> // Componente que maneja la redirección /AnomalyList
    },
    {
      path: "/list", // Nueva ruta para Node-RED
      element: <AnomalyList /> // Componente que maneja la redirección /CategorySelector
    },
    

    /* 
        {
          path: "/login/dashboard",
          element: userLoggedIn ? <SideBar setUserLoggedIn={setUserLoggedIn} /> : <Navigate to="/" replace />
        },
        {
          path:"/login/informacion",
          element:  userLoggedIn ? <SideBar setUserLoggedIn={setUserLoggedIn} /> : <Navigate to="/" replace />
    
        },
        {
          path:"/login/logoperacional",
          element:  userLoggedIn ? <SideBar setUserLoggedIn={setUserLoggedIn} /> : <Navigate to="/" replace />
    
        }, */

  ]);

  return <RouterProvider router={router} />;
};

export default App;


