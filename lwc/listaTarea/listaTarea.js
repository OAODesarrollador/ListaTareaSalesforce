import { LightningElement, api } from 'lwc';
import guardaLista from '@salesforce/apex/ControladorTareas.guardaLista';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';


export default class ListaTarea extends LightningElement {
    @api targetParent;
    tarea;
    fecha;
    showFecha;
    showBoton;

    handleInputFocus(event) {
        // Modifica el color del input
        const classList = event.target.parentNode.classList;
        classList.add('lgc-highlight');
    }

    handleInputBlur(event) {
        // Borra la modificación
        const classList = event.target.parentNode.classList;
        classList.remove('lgc-highlight');
    }

    connectedCallback(){
        
    }

    // Controla que se ingresen datos y habilita el siguiente paso 
    handleOnChange(event) {
        const evento = event.target.name;
        if (evento==="tarea"){
            this.tarea = event.target.value;
            if (this.tarea != "") {
                this.showFecha = true;
            } else {
                this.showFecha = false;
            }
        }else if (evento==="fecha") {
            this.fecha = event.target.value;
            this.fecha != "" && this.targetParent != true
            ? (this.showBoton = true) 
            : (this.showBoton = false);
        }
    }

    // Guarda la tarea y borra los datos en los input 

    handleClick(){
        guardaLista({nombreTarea: this.tarea, fechaTarea: this.fecha})
            .then((result)=>{
                if (result === 'Success'){
                   this.tarea="";
                   this.fecha="" ;
                   const festejo = new ShowToastEvent({
                    title: "Hecho",
                    message: "Se ha agrado una tarea a la Lista",
                    variant: "success"
                   });
                   this.dispatchEvent(festejo);
                   this.dispatchEvent(new CustomEvent('refresca'));
                   
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

    @api
    handleParentClick() {
        this.handleClick();
    }

    // refresca la pantalla
    @api
    refresca(){
        refreshApex(this.ListaTarea);
    }
}