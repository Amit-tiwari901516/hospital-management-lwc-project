import { LightningElement, wire, api } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import RESEARCH_INITIATIVES_OBJECT from '@salesforce/schema/Research_Initiatives__c';
import getRelatedDataSources from '@salesforce/apex/RecordClass.getRelatedDataSources';

export default class DataSourceRecords extends LightningElement {
    @api filterName;
    records = [];
    error;

    columns = [
        { label: 'Data Source Name', fieldName: 'Name', type: 'text' },
        { label: 'Status', fieldName: 'Status__c', type: 'text' }
    ];

    connectedCallback() {
        if (this.filterName) {
            const filterNameParts = this.filterName.split('=');
            if (filterNameParts.length === 2) {
                this.filterName = filterNameParts[1];
                console.log('Extracted filterName:', this.filterName);
            }
        }
    }

    @wire(getListUi, {
        objectApiName: RESEARCH_INITIATIVES_OBJECT,
        listViewId: '$filterName',
        pageSize: 400,
    })
    wiredfunction({ data, error }) {
        if (data && data.records) {
            const researchInitiativesIds = data.records.records.map(record => record.id);
            getRelatedDataSources({ researchInitiativesIds })
                .then(result => {
                    this.records = result.map(record => ({
                        Id: record.Id,
                        Name: record.Name,
                        Status__c: record.Status__c
                    }));
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error;
                    this.records = [];
                    console.error('Error fetching related records:', error);
                });
        } else if (error) {
            this.error = error;
            this.records = [];
            console.error('Error fetching records:', error);
        }
    }
}
