import { LightningElement, track } from 'lwc';
import getUpComingEvents from '@salesforce/apex/EventListController.getUpComingEvents';
const columns = [
    {
        label: "Event",
        fieldName: "detailsPage",
        type: "url",
        wrapText: "true",
        typeAttributes: {
          label: {
            fieldName: "Name__c"
          },
          target: "_self"
        }
      },
    {label:'Event Organizor', fieldName:'EO', type:'text'},
    {label:'Start', fieldName:'Start__c'},
    {label: 'Location', fieldName:'Location'},
]
export default class EventList extends LightningElement { 
    error; 
    @track dataList;
    columnsList = columns; 
    connectedCallback(){ 
    // console.log('callback');
        
        this.futureApex();
    }

    futureApex(){ 
      //  console.log('future');
        
        getUpComingEvents()
        .then((result) => {
            //console.log(result);
            result.forEach(element => {
                element.detailsPage = "https://" + window.location.host + "/" + element.Id;
                element.EO = element.Event_Organizer__r.Name;
                element.Location = element.Location__r.Name; 
            });
            this.dataList = result;
            console.log('data '+result);
            
            this.error = undefined; 
        }).catch((err) => {
            this.error = err;
            this.data = undefined; 
        });
    }
}

