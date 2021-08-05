import React from 'react';
import { render,screen } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';

test('<Formulario /> Cargar el formulario y revisar que todo sea correcto', () =>{
    //Este me permite renderizar o cargar el componente
    //const wrapper = render(<Formulario />);
    //Ahora haré debbug esto me traerá todo el componente, con esto verifico que me este montando el componente
    //wrapper.debug();
    //Act
    //Esta era la forma anterior de hacerla
    const {getByText} = render(<Formulario />);
    //Assert
    //Prueba de si el texto esta en el documento
    expect(getByText('Crear Cita')).toBeInTheDocument();

});

