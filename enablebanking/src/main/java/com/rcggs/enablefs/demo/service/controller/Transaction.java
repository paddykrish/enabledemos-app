package com.rcggs.enablefs.demo.service.controller;

import java.util.Date;

/**
 * Created by Administrator on 1/8/17.
 */
public class Transaction {
    String transactionId;
    String transactionType;
    float amount;
    String originationAccountId;
    String beneficaryAccountId;
    String accountType;
    Date transactionDate;
    String accountName;
    String story;

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getOriginationAccountId() {
        return originationAccountId;
    }

    public void setOriginationAccountId(String originationAccountId) {
        this.originationAccountId = originationAccountId;
    }

    public String getBeneficaryAccountId() {
        return beneficaryAccountId;
    }

    public void setBeneficaryAccountId(String beneficaryAccountId) {
        this.beneficaryAccountId = beneficaryAccountId;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId='" + transactionId + '\'' +
                ", transactionType='" + transactionType + '\'' +
                ", amount=" + amount +
                ", originationAccountId='" + originationAccountId + '\'' +
                ", beneficaryAccountId='" + beneficaryAccountId + '\'' +
                ", accountType='" + accountType + '\'' +
                ", transactionDate=" + transactionDate +
                '}';
    }
}
