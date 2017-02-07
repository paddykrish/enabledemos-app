package com.rcggs.enablefs.demo.service.controller;

import java.io.Serializable;

/**
 * Created by Administrator on 6/9/16.
 */
public class WeatherGovInfo implements Serializable {
    private static final long serialVersionUID = -2991121166902741576L;

    String id; 
    String updated; 
    String published; 
    String effective;
    String expires; 
    String severity; 
    String msgtype; 
    String certainty; 
    String category;
    String urgency; 
    String status; 
    String event;
    String author; 
    String geocode; 
    String polygon; 
    String areadesc;
    String parameter; 
    String capvalue;
    String title; 
    String summary; 
    String link; 
    String valuename;
    String readingtime;

    String states ;
    String counties;
    String zipcodes;

    public String getStates() {
        return states;
    }

    public void setStates(String states) {
        this.states = states;
    }

    public String getCounties() {
        return counties;
    }

    public void setCounties(String counties) {
        this.counties = counties;
    }

    public String getZipcodes() {
        return zipcodes;
    }

    public void setZipcodes(String zipcodes) {
        this.zipcodes = zipcodes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    public String getPublished() {
        return published;
    }

    public void setPublished(String published) {
        this.published = published;
    }

    public String getEffective() {
        return effective;
    }

    public void setEffective(String effective) {
        this.effective = effective;
    }

    public String getExpires() {
        return expires;
    }

    public void setExpires(String expires) {
        this.expires = expires;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getMsgtype() {
        return msgtype;
    }

    public void setMsgtype(String msgtype) {
        this.msgtype = msgtype;
    }

    public String getCertainty() {
        return certainty;
    }

    public void setCertainty(String certainty) {
        this.certainty = certainty;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGeocode() {
        return geocode;
    }

    public void setGeocode(String geocode) {
        this.geocode = geocode;
    }

    public String getPolygon() {
        return polygon;
    }

    public void setPolygon(String polygon) {
        this.polygon = polygon;
    }

    public String getAreadesc() {
        return areadesc;
    }

    public void setAreadesc(String areadesc) {
        this.areadesc = areadesc;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public String getCapvalue() {
        return capvalue;
    }

    public void setCapvalue(String capvalue) {
        this.capvalue = capvalue;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getValuename() {
        return valuename;
    }

    public void setValuename(String valuename) {
        this.valuename = valuename;
    }

    public String getReadingtime() {
        return readingtime;
    }

    public void setReadingtime(String readingtime) {
        this.readingtime = readingtime;
    }

    @Override
    public String toString() {
        return "WeatherGovInfo{" +
                "id='" + id + '\'' +
                ", updated='" + updated + '\'' +
                ", published='" + published + '\'' +
                ", effective='" + effective + '\'' +
                ", expires='" + expires + '\'' +
                ", severity='" + severity + '\'' +
                ", msgtype='" + msgtype + '\'' +
                ", certainty='" + certainty + '\'' +
                ", category='" + category + '\'' +
                ", urgency='" + urgency + '\'' +
                ", status='" + status + '\'' +
                ", event='" + event + '\'' +
                ", author='" + author + '\'' +
                ", geocode='" + geocode + '\'' +
                ", polygon='" + polygon + '\'' +
                ", areadesc='" + areadesc + '\'' +
                ", parameter='" + parameter + '\'' +
                ", capvalue='" + capvalue + '\'' +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", link='" + link + '\'' +
                ", valuename='" + valuename + '\'' +
                '}';
    }
}
