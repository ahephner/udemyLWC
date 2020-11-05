public with sharing class EventDetailsController {
    
    @AuraEnabled
    public static List<Event_Speaker__c> getSpeakers(string eventId ){
        system.debug('called '+ eventId); 
       List<Event_Speaker__c> speakers = [Select Id, Speaker__c, Speaker__r.Name, Speaker__r.Email__c,
                                         Speaker__r.Company__c, Speaker__r.Phone__c From Event_Speaker__c where Event__c =: eventId];

                                         return speakers; 
    }

    @AuraEnabled
    public static Event__c getEvent(String eventId){
        Event__c evt = [Select Id, Name__c,Location__c, Location__r.Name, 
                        Location__r.City__c, Location__r.Country__c,
                        Location__r.Postal_Code__c,Location__r.Street__c,
                        Location__r.State__c From Event__c where Id =: eventId];
        return evt; 
    }

    @AuraEnabled
    public static List<Event_Attendee__c>  getAttendees(String eventId){
        system.debug('Event Id '+eventId); 
            List<Event_Attendee__c> eventAttendees = [Select Id, Name, Attendee__c,
                                                      Attendee__r.Name,  Attendee__r.Company_Name__c,
                                                      Attendee__r.Location__r.Name, Attendee__r.Email__c
                                                      From Event_Attendee__c
                                                      where Event__c =: eventID];
                                                      system.debug(eventAttendees);
            return eventAttendees; 

        }
    }