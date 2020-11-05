import { LightningElement, api, track } from 'lwc';
import getSpeakers from '@salesforce/apex/EventDetailsController.getSpeakers';
import getEvent from '@salesforce/apex/EventDetailsController.getEvent';
import getAttendees from '@salesforce/apex/EventDetailsController.getAttendees';

//attendee cols
const atcolumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email' },
]
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Company', fieldName: 'Company' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email' },
]

export default class EventDetails extends LightningElement {
    @api recordId; 
    @track speakerList; 
    @track eventRecord;
    @track attendList;
    error;
    columnAt = atcolumns;
    columnsList = columns; 
    

    handleEventSpeaker(){
        
        getSpeakers({eventId : this.recordId})
        .then((result) => {
          //add the __r fields to the non nested object
          result.forEach(x => {
              x.Name = x.Speaker__r.Name 
              x.Company = x.Speaker__r.Company__c
              x.Phone = x.Speaker__r.Phone__c
              x.Email = x.Speaker__r.Email__c
          });
            
            this.speakerList = result; 
            this.error = undefined; 
            console.log(this.speakerList)
        }).catch((err) => {
            this.error = err; 
            this.speakerList = undefined; 
        });
    }

    handleLocationDetails(){ 
        getEvent({eventId: this.recordId})
        .then((result) => {
            if(result.Location__c){ 
                this.eventRecord = result; 
            }else{ 
                this.eventRecord = undefined; 
            }
        }).catch((err) => {
            this.error = err;
            this.eventRecord = undefined; 
            
        });
    }

    handleAttendeeDetails(){ 
        console.log('handle');
        getAttendees({eventId: this.recordId})
        .then((result) => {
            result.forEach(y => {
                y.Name = y.Attendee__r.Name;
                y.Company = y.Attendee__r.Company__c;
                y.Email = y.Attendee__r.Email__c;
                y.Location = y.Attendee__r.Location__c
            });
            this.attendList = result; 
            this.error = undefined; 
            console.log('result '+ this.attendList); 
        }).catch((err) => {
            this.error = err; 
            this.attendList = undefined;
            console.log(this.error);
            
        });
    }
}