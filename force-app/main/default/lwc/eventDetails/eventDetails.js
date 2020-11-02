import { LightningElement, api, track } from 'lwc';
import getSpeakers from '@salesforce/apex/EventDetailsController.getSpeakers';
export default class EventDetails extends LightningElement {
    @api recordId; 
    @track speakerList; 
    error
    handleEventSpeaker(){
        
        getSpeakers({eventId : this.recordId})
        .then((result) => {
            window.console.log('handler '+ result.data);
            
            this.speakerList = result; 
            this.error = undefined; 
            window.console.log(this.speakerList)
        }).catch((err) => {
            this.error = err; 
            this.speakerList = undefined; 
        });
    }
}