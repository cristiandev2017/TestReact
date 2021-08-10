import React from 'react';
import { render,screen,cleanup,fireEvent } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';

//Lo que hace es limpiar las pruebas del componente previo antes de ejecutar el siguiente, esto no lo permite el cleanup
//En las ultimas versiones no es necesario ya lo hace react
afterEach(cleanup);

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

//Prueba con funciones por parametro
//Esto crea una funcion tipo dummy
const crearCita = jest.fn();
test('<Formulario /> Pruebas con funciones y validaciones de formulario', () =>{
    render(<Formulario 
            crearCita={crearCita}
            />
    );
    
    //Vamos a simular con el fireEvent (Este es algo antiguo pero sigue funcionando)
    const btnSubmit = screen.getByTestId('btn-submit');
    //Simulo el clic
    fireEvent.click(btnSubmit);

    //Revisar por la alerta
    const alerta = screen.getByTestId('alerta');
    expect(alerta.textContent).toBe('Todos los campos son obligatorios');
    expect(alerta).toBeInTheDocument();
})

test('<Formulario /> Pruebas un poco mas funcionales', () =>{
    render(<Formulario 
    crearCita={crearCita}
        />
    );

    //Fire Event es la version anterior es bueno aprenderlo para mantener proyectos anteriores
    fireEvent.change(screen.getByTestId('mascota'),{
        //Simula que escribi en ese campo ese texto
        target:{value:'Hook'}
    });

    fireEvent.change(screen.getByTestId('propietario'),{
      //Simula que escribi en ese campo ese texto
      target:{value:'Cristian'}
    });
    //Click en el boton de submit
    const btnSubmit = screen.getByTestId('btn-submit');
    fireEvent.click(btnSubmit)
});