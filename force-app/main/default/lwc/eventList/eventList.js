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
    @track recordsToDisplay; 
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
            this.recordsToDisplay = result; 
            console.log('data '+result);
            
            this.error = undefined; 
        }).catch((err) => {
            this.error = err;
            this.data = undefined; 
        });
    }
//search for events
//need to figure out a way to say if filteredEvents is undefined or null don't change. THis is just watching keyword no worry for waht is actually returned. 
    handleSearch(event) {
        window.clearTimeout(this.delayTimeout);
      let keyword = event.detail.value;
      console.log('here '+ keyword);
      
      let filteredEvents = this.dataList.filter((record, index, arrayobject) => {
        return record.Name__c.toLowerCase().includes(keyword.toLowerCase()); // Event - event
        // Tst - tst
      });
   console.log('fe ' +filteredEvents);
   
      
      if (keyword && keyword.length >= 2) {
        this.recordsToDisplay = filteredEvents;
      } else if(keyword.length <= 1) {
        console.log('else if');
        
        this.recordsToDisplay = this.dataList;
      }
    
  }
 
}

