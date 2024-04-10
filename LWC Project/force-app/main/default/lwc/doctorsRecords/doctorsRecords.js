import { LightningElement, wire } from 'lwc';
import fetchDoctorRecord from '@salesforce/apex/RecordClass.fetchDoctorRecord'



export default class DoctorsRecords extends LightningElement {
    data = [];
     columns = [
        {
            label: 'Name',
            fieldName: 'docLink',
            type: 'url',
            typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
        }, {
            label: 'Phone',
            fieldName: 'Phone__c',
            type: 'Phone',
        }
    ];
    @wire(fetchDoctorRecord)
    wireDoc({ error, data }) {
        if (data) {
            data = JSON.parse(JSON.stringify(data));
            data.forEach(res => {
                res.docLink = '/' + res.Id;
            });
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }
}
