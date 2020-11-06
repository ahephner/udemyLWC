public with sharing class EventListController {
    @AuraEnabled
    public static List<Event__c> getUpComingEvents(){
        List<Event__c> evt = [Select Id, Name__c, Live__c, Start__c, End__c, Location__c, Location__r.Name,
        Event_Organizer__r.Name, Event_Detail__c from Event__c where Start__c >= Today and Live__c = true];
    System.debug(evt);
                             return evt; 
 }
}
