import { LightningElement, wire, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import actualizaLista from '@salesforce/apex/ControladorTareas.actualizaLista';
import cargarlistaTarea from '@salesforce/apex/probandoListado.cargarlistaTarea';


export default class ListaCompleta extends LightningElement {
    wiredListaTarea;
    listaTarea;
    error;
    // Genera los titúlos de las tareas
    @api estado;
    get tituloPagina(){
        return  'Tareas ' + this.estado + "s";
    }
    get verBoton(){
        return this.estado ==="Pendiente" ? true : false;
    }
    // Genera las listas de Pendientes y Completados
    @wire(cargarlistaTarea, {estado: '$estado'})
    wiredlistaTarea(result) {
        this.wiredlistaTareaResult = result;
        if (result.data) {
            this.listaTarea = result.data;
            
        } else if (result.error) {     
            const msjerror = new ShowToastEvent({
                title: "Error",
                message: result.error.body.message,
                variant: "error"
               });
               this.dispatchEvent(msjerror);
        }

        }
    @api
    refresca(){
        refreshApex(this.wiredlistaTareaResult);
    }
    // Llama al controlador para modificar el estado, envia un mensaje
    // y genera un evento para refrescar la pantalla
    handleClick (event){
        actualizaLista({listaID: event.target.dataset.recordid})
            .then((result)=>{
                if (result === 'hecho'){ 
                   const festejo = new ShowToastEvent({
                    title: "Felicitaciones !",
                    message: "Tarea Completada Satisfactoriamente",
                    variant: "success"
                   });
                   
                   this.dispatchEvent(festejo);
                   this.dispatchEvent(new CustomEvent('refresca')); // Crea el evento
                }
            })
            .catch((error) => {
                   const errorAlta = new ShowToastEvent({
                    title: "Error",
                    message: error.body.message,
                    variant: "error"
                   });
                   this.dispatchEvent(errorAlta);
                });
    }
}