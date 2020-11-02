public with sharing class EventDetailsController {
    
    @AuraEnabled
    public static List<Event_Speaker__c> getSpeakers(string eventId ){
        system.debug('called '+ eventId); 
       List<Event_Speaker__c> speakers = [Select Id, Speaker__c, Speaker__r.Name, Speaker__r.Email__c,
                                         Speaker__r.Company__c, Speaker__r.Phone__c From Event_Speaker__c where Event__c =: eventId];

                                         return speakers; 
    }
}
