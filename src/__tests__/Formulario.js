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
    /*Esta era la forma anterior de hacerla
    const {getByText} = render(<Formulario />);
    //Assert
    expect(getByText('Crear Cita')).toBeInTheDocument();
    */
    //Forma con screen
    render(<Formulario />);
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    //Para traerlo por id
    //Comparo por el tipo del elemento en este caso un h2
    expect(screen.getByTestId('title').tagName).toBe('H2');
    //Que el titulo no sea un h1
    expect(screen.getByTestId('title').tagName).not.toBe('H1');

    //Ahora por el texto(Es sensible de mayusculas debe ser identico)
    expect(screen.getByTestId('title').textContent).toBe('Crear Cita');    
    
    //Ahora que exista el boton y que sea tipo boton
    expect (screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
    //Verifico que el elemento del boton diga agregar
    expect (screen.getByTestId('btn-submit').textContent).toBe('Agregar Cita');
});

