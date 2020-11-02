import { LightningElement, track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import evt_obj from '@salesforce/schema/Event__c';
import Name__c from '@salesforce/schema/Event__c.Name__c';
import Event_Organizer__c from '@salesforce/schema/Event__c.Event_Organizer__c';
import Start__c from '@salesforce/schema/Event__c.Start__c';
import End__c from '@salesforce/schema/Event__c.End__c';
import Max_Seats__c from '@salesforce/schema/Event__c.Max_Seats__c';
import Location__c from '@salesforce/schema/Event__c.Location__c';
import Event_Detail__c from '@salesforce/schema/Event__c.Event_Detail__c';

export default class AddEvent extends NavigationMixin(LightningElement) {
//track still required for objects. 
    @track 
      newRec = {
        Name__c: '',
        Event_Organizer__c: '', 
        Start__c: null,
        End__c: null,
        Max_Seats__c: null,
        Location__c: '',
        Event_Detail__c: ''
    }
    @track errors; 
    
    handleChange(e){
        let rec = e.target.value;
        let name = e.target.name; 
        console.log('rec '+ rec + ' name '+ name);
       
        this.newRec[name] = rec; 
    }

//location not being set 
    //handle the values sent from the look up. The component sending is customelwclookup handleselect(event)
    handleSelect(e){
        let parentId = e.detail.parentfield; 
        let locationId = e.detail.selectedRecordId; 
        this.newRec[parentId] = locationId; 
        console.log('pId '+ parentId + ' locId '+locationId);
        
    }

    handleClick(){
        console.log('name '+ this.newRec.Name__c);
        
        const fields = {}; 
        fields[Name__c.fieldApiName] = this.newRec.Name__c; 
        fields[Event_Organizer__c.fieldApiName] = this.newRec.Event_Organizer__c;
        fields[Start__c.fieldApiName] = this.newRec.Start__c;
        fields[End__c.fieldApiName] = this.newRec.End__c;
        fields[Max_Seats__c.fieldApiName] = this.newRec.Max_Seats__c;
        fields[Location__c.fieldApiName] = this.newRec.Location__c;
        fields[Event_Detail__c.fieldApiName] = this.newRec.Event_Detail__c;
        
        const newEvent = {apiName:evt_obj.objectApiName, fields }
        createRecord(newEvent)
        .then((event) => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Draft Saved',
                variant: 'success'
            }));
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    actionName: "view",
                    recordId: event.id,
                    
                }
            });
        }).catch((err) => {
            this.errors = JSON.stringify(err);; 
            this.dispatchEvent(new ShowToastEvent({
                title: 'Something Happened',
                message: this.errors,
                variant: 'error'
            }));
            
        });
    }
}