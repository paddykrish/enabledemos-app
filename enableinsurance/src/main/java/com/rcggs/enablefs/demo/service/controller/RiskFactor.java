package com.rcggs.enablefs.demo.service.controller;

/**
 * Created by Administrator on 1/7/17.
 */
public class RiskFactor {
    String type;
    String value;
    float crimeRisk;
    float hailRisk;
    float fireRisk;
    float floodRisk;
    float earthquakeRisk;
    float windstromRisk;

    @Override
    public String toString() {
        return "RiskFactor{" +
                "type='" + type + '\'' +
                ", value='" + value + '\'' +
                ", crimeRisk=" + crimeRisk +
                ", hailRisk=" + hailRisk +
                ", fireRisk=" + fireRisk +
                ", floodRisk=" + floodRisk +
                ", earthquakeRisk=" + earthquakeRisk +
                ", windstromRisk=" + windstromRisk +
                '}';
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
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
}
