import React, { Component } from 'react';
import { relative } from 'path';

class App extends Component{

    constructor(){
        super();
        this.state = {
            titulo: '',
            descripcion: '',
            tareas: [],
            _id: ''
        }
        this.addTarea = this.addTarea.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTarea(e){
        e.preventDefault();
        if(this.state._id){
            fetch(`/api/tareas/${this.state._id}`, { 
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'tarea actualizada'});
                    this.setState({titulo: '', descripcion: '', _id: ''})
                    this.fetchTareas();
                });
        }else{
            //Fetch para enviar una peticion http al servidor //Fetch es un metodo propio del navegador
            fetch('/api/tareas', { //envia una peticion a esa ruta, con metodo POST, en formato json y con alguna cabeceras
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: { //cabeceras, que tipo de dato se va enviar
                    'Accept': 'application/json', //el tipo de contenido es JSON
                    'Content-Type': 'application/json'
                }
            })
            //.then(res=> console.log(res)) //muestra respues del servidor, tranformado a json sale otra respuesta
                .then(res=> res.json())
                .then(data => {
                    console.log(data),
                    M.toast({html: 'Tarea Guardada'}), //para que salga un aviso flotante
                    this.setState({titulo: '', descripcion: ''}),
                    this.fetchTareas()
                })
                .catch(err=> console.error(err)); 
        }
    }


    fetchTareas(){
        fetch('/api/tareas') //sino se especifica por defecto es una peticion get
            .then(res=> res.json()) //convierte la respuesta en json
            .then(data=> {
                this.setState({
                    tareas: data
                });
            });
    }

    //METODO INTERNO PARA EJECUTAR LO QUE HAY AQUI NI BIEN ES CARGADO LA PAGINA
    componentDidMount(){
        this.fetchTareas(); //ejecuta este fetch ni bien es cargado la pagina
    }

    editTarea(id){
        fetch(`/api/tareas/${id}`)
            .then(res=> res.json())
            .then(data=> {
                console.log(data);
                this.setState({
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    _id: data._id
                })
            });
    }

    deleteTarea(id){
        if(window.confirm('estas seguro que quieres eliminar?')){
            fetch(`/api/tareas/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> res.json())
                .then(data=> {
                    console.log(data);
                    M.toast({html: 'tarea eliminada'});
                    this.fetchTareas();
                });
        }
    }

    //e.target: trae todo el input completo
    //{ var1, var2, var3 } = e.target: captura del input completo solo var1,var2,var3
    //e.target.value: trae el valor valor del input
    //e.target.name: trae el valor del name 
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div className="App">
                <nav className="light-blue darken-4">
                    <div className="container-fluid">
                        <img src="https://i.pinimg.com/originals/33/f1/ee/33f1ee7a842c3d9be7476e55e2d3aff8.png" alt="gianmattyLogo" style={{height: '70px', marginRight: '20px', marginLeft: '20px'}}/>
                        <a href="/" className="brand-logo center-align">GIANMATTY IDEAS</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row"><h2 style={{color: 'brown'}}>Comparte Tu Idea en Comunidad</h2></div>
                    <div className="row">
                        <div className="col s4" style={{margin: '30px', background: 'skyblue'}}>
                            <div className="card" style={{background: '#c9d99e'}}>
                                <div className="card-content">
                                    <form onSubmit={this.addTarea}>
                                        <div className="row">
                                            <div className="input-field">
                                                <input name="titulo" onChange={this.handleChange} type="text" value={this.state.titulo} placeholder="Tu Nombre"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field">
                                                <textarea name="descripcion" onChange={this.handleChange} className="materialize-textarea" value={this.state.descripcion} placeholder="Tu Idea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Guardar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s6" style={{margin: '30px'}}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Idea</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map(tarea=> {
                                            return(
                                                <tr key={tarea._id}>
                                                    <td>{tarea.titulo}</td>
                                                    <td>{tarea.descripcion}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.editTarea(tarea._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.deleteTarea(tarea._id)} style={{margin: '4px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <img src="https://i.pinimg.com/originals/a3/7d/e6/a37de65129a99a57021c1090e7bf4425.png" alt="gianmattyLogo" style={{position: 'absolute', top: '50px', right: '20px'}}/>
                </div>
            </div>
        )
    }
}

export default App;