import { LightningElement, api, wire } from 'lwc';
import getLocationById from '@salesforce/apex/RecordClass.getLocationById';

export default class GoogleMapComponent extends LightningElement {
    @api recordId;
    mapMarkers = [];
    error;

    @wire(getLocationById, { recordId: '$recordId' })
    wiredLocation({ error, data }) {
        if (data) {
            this.mapMarkers = [{
                location: {
                    Street: data.Street_Address__c,
                    City: data.City__c,
                    State: data.State__c,
                    Country: data.Country__c,
                    PostalCode: data.Postal_Zip_Code__c,
                },
                title: data.Name,
                icon: 'custom:custom26'
            }];
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.mapMarkers = [];
        }
    }
}
