import React from 'react';
import { render,screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Cita from './../components/Cita';

//Prueba inicial cuando carga inicialmente el componente
test('<App/> La aplicación funciona bien la primera vez', () => {
    render(<App />);
    //Verifico que este el texto de administrador de pacientes
    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes');
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1');

    //Verifico el de no hay citas que se quita cuando agrego una cita
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    expect(screen.getByText('No hay citas')).toBeInTheDocument();
});

//Ahora hare una prueba para cargar los componentes dependientes
test('<App/> Nos permite agregar una cita y verificar el heading', () => {
    render(<App />);

    //Escribe en un formulario
    userEvent.type(screen.getByTestId('mascota'),'Kira');
    userEvent.type(screen.getByTestId('propietario'),'Cristian');
    userEvent.type(screen.getByTestId('fecha'),'2021-06-10');
    userEvent.type(screen.getByTestId('hora'),'10:30');
    userEvent.type(screen.getByTestId('sintomas'),'solo duerme');

    //Click en el boton de submit
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit)

    //Revisar por la alerta(Al usar query lo que hace es darle opcionalidad si no existe no pasa error)
    const alerta = screen.queryByTestId('alerta');
    expect(alerta).not.toBeInTheDocument();

    //Revisar por el titulo
    expect( screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas');
    expect( screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas');
});

//Verifico que las citas se esten creando correctamente
test('<App/> Verificar las Citas en el DOM', async () => {
    render(<App />);
    //Permite elegir multiples elementos
    const citas = await screen.findAllByTestId('cita');

    expect(citas).toMatchSnapshot();
});