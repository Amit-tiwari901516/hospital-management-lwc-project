import { LightningElement, api } from 'lwc';
import runBatch from '@salesforce/apex/JiraTicketBatch.runBatch';

export default class JiraTicketBatchExecutor extends LightningElement {
    @api recordId;

    executeBatch() {
        runBatch({ opportunityId: this.recordId })
            .then(() => {
                // Handle success if needed
                console.log('Batch execution initiated successfully');
            })
            .catch(error => {
                // Handle error if needed
                console.error('Error executing batch: ', error);
            });
    }
}