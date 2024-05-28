import { LightningElement, wire } from 'lwc';
import createIssue from '@salesforce/apex/JiraService.createIssue';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getIssuesByJQL from '@salesforce/apex/JiraIssueFetcher.getIssuesByJQL';
import getAttachmentsAndCommentsByIssueKey from '@salesforce/apex/JiraAttachments.getAttachmentsAndCommentsByIssueKey';
import getAssignableUsers from '@salesforce/apex/JiraIssueUpdater.getAssignableUsers';
import updateJiraIssue from '@salesforce/apex/JiraIssueUpdater.updateJiraIssue';

export default class JiraTicketFromSalesforce extends LightningElement {
    summary = '';
    description = '';    

    clear(){
        this.summary = '';
        this.description = '';
    }

    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'summary') {
            this.summary = event.target.value;
        } else if (field === 'description') {
            this.description = event.target.value;
        }
    }

    createIssue() {
        const issueData = {
            fields: {
                project: { key: "KAN" },
                summary: this.summary,
                description: this.description,
                issuetype: { name: "Task" }
            }
        };

        createIssue({ issueData: JSON.stringify(issueData) })
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: result,
                    variant: 'success',
                }));
                this.summary = '';
                this.description = '';
                this.clear();
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error creating issue',
                    message: error.body.message,
                    variant: 'error',
                }));
            });
    }

    //fetch ticket
   /* columns = [
        { label: 'Key', fieldName: 'key', type: 'text' },
        { label: 'Summary', fieldName: 'summary', type: 'text' },
        { label: 'Status', fieldName: 'status', type: 'text'}
        ];
    issues;

    @wire(getIssuesByJQL, { jqlQuery: 'assignee = currentUser() AND status = Open' })
    wiredIssues({ error, data }) {
        if (data) {
            this.issues = JSON.parse(data).issues.map(issue => ({
                id: issue.id,
                key: issue.key,
                summary: issue.fields.summary,
                status: issue.fields.status.name
            }));
        } else if (error) {
            console.error('Error fetching JIRA issues:', error);
            this.issues = undefined;
        }
    }*/


    //Attachments and comment
    attachments;
    issueKey;
    error;
    comments;

    handleIssueKeyChange(event) {
        this.issueKey = event.target.value;
    }
    fetchAttachmentsAndComments() {
        getAttachmentsAndCommentsByIssueKey({ issueKey: this.issueKey })
            .then(result => {
                let parsedResult = JSON.parse(result);
                this.attachments = parsedResult.attachments;
                this.comments = parsedResult.comments;
                this.error = null;
            })
            .catch(error => {
                this.error = error;
                this.attachments = null;
                this.comments = null;
            });
    }

    //update assignee
    issueKey = '';
    assignableUsers = [];
    selectedAssignee = '';
    userMap = new Map(); // Map to store displayName to accountId mapping

    // Fetch assignable users from server
    @wire(getAssignableUsers)
    wiredAssignableUsers({ error, data }) {
        if (data) {
            this.assignableUsers = data.map(user => {
                this.userMap.set(user.displayName, user.accountId);
                return { label: user.displayName, value: user.displayName };
            });
        } else if (error) {
            this.showToast('Error', 'Error fetching assignable users', 'error');
            console.error('Error fetching assignable users:', error);
        }
    }

    // Handle issue key change
    handleIssueKeyChange(event) {
        this.issueKey = event.target.value;
    }

    // Handle assignee selection change
    handleAssigneeChange(event) {
        this.selectedAssignee = event.detail.value;
    }

    // Update assignee on Jira issue
    updateAssignee() {
        if (this.issueKey && this.selectedAssignee) {
            const assigneeId = this.userMap.get(this.selectedAssignee);
            updateJiraIssue({ issueKey: this.issueKey, assigneeId })
                .then(result => {
                    this.showToast('Success', result, 'success');
                })
                .catch(error => {
                    this.showToast('Error', 'Error updating assignee', 'error');
                    console.error('Error updating assignee:', error);
                });
        } else {
            this.showToast('Error', 'Please enter issue key and select an assignee.', 'error');
            console.error('Please enter issue key and select an assignee.');
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}