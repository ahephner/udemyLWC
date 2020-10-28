import { LightningElement, track } from 'lwc';

export default class AddEvent extends LightningElement {
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

    handleChange(e){
        let rec = e.target.value;
        let name = e.target.name; 
        console.log('rec '+ rec + ' name '+ name);
        
        this.newRec[name] = rec; 
    }


    //handle the values sent from the look up. The component sending is customelwclookup handleselect(event)
    handleSelect(e){
        let parentId = e.detail.parentfield; 
        let locationId = e.detail.selectedRecordId; 
        this.newRec[parentId] = locationId; 
    }
}