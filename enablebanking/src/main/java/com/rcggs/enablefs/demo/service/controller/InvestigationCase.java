package com.rcggs.enablefs.demo.service.controller;

import java.util.Date;

/**
 * Created by Administrator on 1/8/17.
 */
public class InvestigationCase {

    String caseId;
    String caseName;
    String primaryInvestigatorId;
    Date caseCreatedDate;
    Date caseAssignedDate;
    Date caseClosedDate;
    Date caseLastUpdatedDate;
    String status;
    String transactionId;
    String partyId;
    String accountId;
    String accountType;
    String casePrioroty;
    String caseType;

    @Override
    public String toString() {
        return "InvestigationCase{" +
                "caseId='" + caseId + '\'' +
                ", caseName='" + caseName + '\'' +
                ", primaryInvestigatorId='" + primaryInvestigatorId + '\'' +
                ", caseCreatedDate=" + caseCreatedDate +
                ", caseAssignedDate=" + caseAssignedDate +
                ", caseClosedDate=" + caseClosedDate +
                ", caseLastUpdatedDate=" + caseLastUpdatedDate +
                ", status='" + status + '\'' +
                ", transactionId='" + transactionId + '\'' +
                ", partyId='" + partyId + '\'' +
                ", accountId='" + accountId + '\'' +
                ", accountType='" + accountType + '\'' +
                ", casePrioroty='" + casePrioroty + '\'' +
                ", caseType='" + caseType + '\'' +
                '}';
    }

    public String getCaseId() {
        return caseId;
    }

    public void setCaseId(String caseId) {
        this.caseId = caseId;
    }

    public String getCaseName() {
        return caseName;
    }

    public void setCaseName(String caseName) {
        this.caseName = caseName;
    }

    public String getPrimaryInvestigatorId() {
        return primaryInvestigatorId;
    }

    public void setPrimaryInvestigatorId(String primaryInvestigatorId) {
        this.primaryInvestigatorId = primaryInvestigatorId;
    }

    public Date getCaseCreatedDate() {
        return caseCreatedDate;
    }

    public void setCaseCreatedDate(Date caseCreatedDate) {
        this.caseCreatedDate = caseCreatedDate;
    }

    public Date getCaseAssignedDate() {
        return caseAssignedDate;
    }

    public void setCaseAssignedDate(Date caseAssignedDate) {
        this.caseAssignedDate = caseAssignedDate;
    }

    public Date getCaseClosedDate() {
        return caseClosedDate;
    }

    public void setCaseClosedDate(Date caseClosedDate) {
        this.caseClosedDate = caseClosedDate;
    }

    public Date getCaseLastUpdatedDate() {
        return caseLastUpdatedDate;
    }

    public void setCaseLastUpdatedDate(Date caseLastUpdatedDate) {
        this.caseLastUpdatedDate = caseLastUpdatedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPartyId() {
        return partyId;
    }

    public void setPartyId(String partyId) {
        this.partyId = partyId;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getCasePrioroty() {
        return casePrioroty;
    }

    public void setCasePrioroty(String casePrioroty) {
        this.casePrioroty = casePrioroty;
    }

    public String getCaseType() {
        return caseType;
    }

    public void setCaseType(String caseType) {
        this.caseType = caseType;
    }
}
