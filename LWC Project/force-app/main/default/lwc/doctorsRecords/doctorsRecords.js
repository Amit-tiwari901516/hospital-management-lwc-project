import { LightningElement, wire, api } from 'lwc';
import fetchDoctorRecord from "@salesforce/apex/RecordClass.fetchDoctorRecord";
import updateDoctorRecord from "@salesforce/apex/RecordClass.updateDoctorRecord";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from "@salesforce/apex";
import { getRecordNotifyChange } from "lightning/uiRecordApi";

export default class DoctorsRecords extends LightningElement {
  @api recordId;
  data = [];
  draftValues = [];  // to hold the draft values for editable datatable
  wiredDataResult;  // to store wired data result for refresh

  columns = [
    { label: 'Name', fieldName: 'DocLink', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } }, 
    { label: 'Phone', fieldName: 'Phone__c', type: 'phone', editable: true },
    { label: 'email', fieldName: 'Email__c', type: 'Email', editable: true }
  ];

  @wire(fetchDoctorRecord)
  wiredFunction(result) {
    this.wiredDataResult = result; // track wired result for refresh
    if (result.data) {
      // Create a deep copy of result.data to avoid mutation issues
      const data = JSON.parse(JSON.stringify(result.data));
      data.forEach(res => {
          res.DocLink = '/' + res.Id;
      });
      this.data = data;
    } else if (result.error) {
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error loading',
            message: result.error.body.message,
            variant: 'error'
        })
      );
      console.error(result.error);
    }
  }

  async handleSave(event) {
    const updatedFields = event.detail.draftValues;
    const notifyChangeIds = updatedFields.map(row => { return { "recordId" : row.Id } });

    try {
      const result = await updateDoctorRecord({ data: updatedFields });
      console.log("Apex update Results: " + JSON.stringify(result));

      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success",
          message: "Record updated",
          variant: "success"
        })
      );

      getRecordNotifyChange(notifyChangeIds);
      await refreshApex(this.wiredDataResult);
      this.draftValues=[];
      window.location.reload();
    } catch (error) {
        console.error("Error: " + JSON.stringify(error));
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error updating record",
            message: error.body ? error.body.message : error.message,
            variant: "error"
          })
        );
    }
  }
}
