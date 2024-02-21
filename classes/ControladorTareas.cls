public with sharing class ControladorTareas {
    
    @AuraEnabled
    public static string guardaLista(String nombreTarea, Date fechaTarea){
        try {
            ListaTarea__c listaTarea = new ListaTarea__c();
            listaTarea.NombreTarea__c = nombreTarea;
            listaTarea.FechaTarea__c = fechaTarea;
            insert listaTarea;
            return 'Success';

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled (cacheable=true)
    public static List<ListaTarea__c> getListaCompleta(String estado) { //getListaTarea(String estado){
    
        
        try {
            
            return [ SELECT Id, NombreTarea__c, FechaTarea__c, Estado__c FROM ListaTarea__c WHERE Estado__c=:estado WITH SECURITY_ENFORCED ORDER BY FechaTarea__c];
            
            }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    @AuraEnabled
    public static string actualizaLista(Id listaID){
        try {
            ListaTarea__c todo = [SELECT Id, Estado__c FROM ListaTarea__c WHERE Id=:listaID];
            todo.Estado__c= 'Completa';
            update todo;
            return 'hecho';
            } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}