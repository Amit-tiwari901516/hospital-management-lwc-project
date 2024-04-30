// updateStatus.js
import { LightningElement, api, wire } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';

export default class UpdateStatus extends LightningElement {
    @api selectedRecordIds;
    selectedStatus = ''; // Initialize with default status value
    statusOptions = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
        // Add more options as needed
    ];

    // Wire method to fetch the record data for each selected record
    @wire(getRecord, { recordId: '$selectedRecordIds', fields: ['Data_Sources__c.Status__c'] })
    wiredRecords({ error, data }) {
        if (data) {
            this.selectedStatus = data.fields.Status__c.value;
        } else if (error) {
            console.error('Error fetching record data:', error);
        }
    }

    // Handle status picklist change
    handleChange(event) {
        this.selectedStatus = event.detail.value;
    }

    // Update the status of the selected records when the "Update Status" button is clicked
    async updateStatus() {
        if (!this.selectedStatus) {
            this.showToast('Error', 'Please select a status', 'error');
            return;
        }
    
        console.log('Selected Record IDs:', this.selectedRecordIds);
    
        try {
            const promises = this.selectedRecordIds.map(recordId => {
                const fields = {
                    'Id': recordId,
                    'Status__c': this.selectedStatus
                };
                const recordInput = { fields };
                return updateRecord(recordInput)
                    .catch(error => {
                        console.error('Error updating record:', error);
                        throw new Error('Error updating record: ' + JSON.stringify(error));
                    });
            });
    
            await Promise.all(promises);
            this.showToast('Success', 'Status updated successfully', 'success');
            this.selectedRecordIds = []; // Clear selected record IDs
            this.selectedStatus = ''; // Clear selected status
            this.dispatchEvent(new CustomEvent('statusupdated'));
        } catch (error) {
            console.error('Error updating records:', error);
            this.showToast('Error', error.message, 'error');
        }
    }
}