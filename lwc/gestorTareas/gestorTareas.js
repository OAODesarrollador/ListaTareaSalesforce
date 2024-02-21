import { LightningElement } from 'lwc';


export default class GestorTareas extends LightningElement {
    refresca(){
        this.refs.completaTarea.refresca();
        this.refs.pendienteTarea.refresca();
    }
}