package com.rcggs.enablefs.demo.service.controller;

import java.util.Date;

/**
 * Created by Administrator on 1/3/17.
 */
public class Quote {

    String quote;
    //renewal vs new
    String quoteType;
    String company;
    String companyid;
    String quoteId;
    String ploicyId;
    String locationId;


    String lobs;
    float annualpremium ;
    String completion;
    String currentstep;
    String underwriter;
    String riskclass;
    String address;
    String city;
    String state;
    String zipcode;
    String county;
    String storename;
    String storetype;

    float crimeRisk;
    float hailRisk;
    float fireRisk;
    float floodRisk;
    float earthquakeRisk;
    float windstromRisk;

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    Date quoteRequestDate;
    Date quoteResponseDate;
    int policyTerm;
    float coverageAmount;

    float latitude;
    float longitude;

    public String getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(String quoteId) {
        this.quoteId = quoteId;
    }

    public String getPloicyId() {
        return ploicyId;
    }

    public void setPloicyId(String ploicyId) {
        this.ploicyId = ploicyId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getQuoteType() {
        return quoteType;
    }

    public void setQuoteType(String quoteType) {
        this.quoteType = quoteType;
    }

    public float getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(float coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public String getCompanyid() {
        return companyid;
    }

    public void setCompanyid(String companyid) {
        this.companyid = companyid;
    }

    public int getPolicyTerm() {
        return policyTerm;
    }

    public void setPolicyTerm(int policyTerm) {
        this.policyTerm = policyTerm;
    }

    public float getCrimeRisk() {
        return crimeRisk;
    }

    public void setCrimeRisk(float crimeRisk) {
        this.crimeRisk = crimeRisk;
    }

    public float getHailRisk() {
        return hailRisk;
    }

    public void setHailRisk(float hailRisk) {
        this.hailRisk = hailRisk;
    }

    public float getFireRisk() {
        return fireRisk;
    }

    public void setFireRisk(float fireRisk) {
        this.fireRisk = fireRisk;
    }

    public float getFloodRisk() {
        return floodRisk;
    }

    public void setFloodRisk(float floodRisk) {
        this.floodRisk = floodRisk;
    }

    public float getEarthquakeRisk() {
        return earthquakeRisk;
    }

    public void setEarthquakeRisk(float earthquakeRisk) {
        this.earthquakeRisk = earthquakeRisk;
    }

    public float getWindstromRisk() {
        return windstromRisk;
    }

    public void setWindstromRisk(float windstromRisk) {
        this.windstromRisk = windstromRisk;
    }

    public Date getQuoteRequestDate() {
        return quoteRequestDate;
    }

    public void setQuoteRequestDate(Date quoteRequestDate) {
        this.quoteRequestDate = quoteRequestDate;
    }

    public Date getQuoteResponseDate() {
        return quoteResponseDate;
    }

    public void setQuoteResponseDate(Date quoteResponseDate) {
        this.quoteResponseDate = quoteResponseDate;
    }

    @Override
    public String toString() {
        return "Quote{" +
                "quote='" + quote + '\'' +
                ", company='" + company + '\'' +
                ", lobs='" + lobs + '\'' +
                ", annualpremium=" + annualpremium +
                ", completion='" + completion + '\'' +
                ", currentstep='" + currentstep + '\'' +
                ", underwriter='" + underwriter + '\'' +
                ", riskclass='" + riskclass + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", county='" + county + '\'' +
                ", storename='" + storename + '\'' +
                ", storetype='" + storetype + '\'' +
                ", crimeRisk=" + crimeRisk +
                ", hailRisk=" + hailRisk +
                ", fireRisk=" + fireRisk +
                ", floodRisk=" + floodRisk +
                ", earthquakeRisk=" + earthquakeRisk +
                ", windstromRisk=" + windstromRisk +
                ", quoteRequestDate=" + quoteRequestDate +
                ", quoteResponseDate=" + quoteResponseDate +
                '}';
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getStorename() {
        return storename;
    }

    public void setStorename(String storename) {
        this.storename = storename;
    }

    public String getStoretype() {
        return storetype;
    }

    public void setStoretype(String storetype) {
        this.storetype = storetype;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLobs() {
        return lobs;
    }

    public void setLobs(String lobs) {
        this.lobs = lobs;
    }

    public float getAnnualpremium() {
        return annualpremium;
    }

    public void setAnnualpremium(float annualpremium) {
        this.annualpremium = annualpremium;
    }

    public String getCompletion() {
        return completion;
    }

    public void setCompletion(String completion) {
        this.completion = completion;
    }

    public String getCurrentstep() {
        return currentstep;
    }

    public void setCurrentstep(String currentstep) {
        this.currentstep = currentstep;
    }

    public String getUnderwriter() {
        return underwriter;
    }

    public void setUnderwriter(String underwriter) {
        this.underwriter = underwriter;
    }

    public String getRiskclass() {
        return riskclass;
    }

    public void setRiskclass(String riskclass) {
        this.riskclass = riskclass;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }
}
