public with sharing class NuevoControlador {
    
    public List<ListaTarea__c> listaTarea { get; set; }

    public NuevoControlador() {
        // Inicializar la lista en el constructor si es necesario
        listaTarea = new List<ListaTarea__c>();
        cargarListaTarea();
    }

    public void cargarListaTarea() {
        try {
            listaTarea = [SELECT Id, NombreTarea__c, FechaTarea__c FROM ListaTarea__c ORDER BY FechaTarea__c];
        } catch (Exception e) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, e.getMessage()));
        }
    }
    }