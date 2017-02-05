package com.rcggs.enablefs.demo.service.controller;

import org.apache.commons.io.IOUtils;
import org.joda.time.DateTime;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.*;
import org.apache.commons.lang.math.RandomUtils;

/**
 * Created by Administrator on 1/6/17.
 */
public class DataLoader {
    protected List<Quote> alllocations = new LinkedList<Quote>();
    protected HashMap<String , RiskFactor> riskFactors = new HashMap<String, RiskFactor>();
    protected ArrayList<String> sampleLatLongs = new ArrayList<String>();
    protected int startRow = 500;
    protected int batchSize = 10;

    public Date getRandomDate(Date from, Date to) {
        double d = from.getTime() + Math.random() * (to.getTime() - from.getTime());
        return new Date(  (long)d );
    }

    public void loadRiskFactors(){
        FileInputStream in = null;
        try {
            String riskFilepath = DemoContext.getProperty("demo.riskfactors.filepath");

            in = new FileInputStream(riskFilepath);
            String prods = IOUtils.toString(in);
            String[] lines = prods.split("\n");
            boolean header = false;
            for (String line: lines) {
                if (!header){
                    header = true;
                    continue;
                }
                String tokens[] = line.split(",");
                RiskFactor r = new RiskFactor();
                r.setType(tokens[0]);
                r.setValue(tokens[1]);
                r.setFireRisk(Float.parseFloat(tokens[2]));
                r.setCrimeRisk(Float.parseFloat(tokens[3]));
                r.setHailRisk(Float.parseFloat(tokens[4]));
                r.setEarthquakeRisk(Float.parseFloat(tokens[5]));
                r.setWindstromRisk(Float.parseFloat(tokens[6]));
                r.setFloodRisk(Float.parseFloat(tokens[7]));
                riskFactors.put(r.getValue(), r);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public void loadSampleLatLongs() {

        FileInputStream in = null;
        try {
            String locationsPath = DemoContext.getProperty("demo.geolocations.filepath");

            in = new FileInputStream(locationsPath);
            String prods = IOUtils.toString(in);
            this.sampleLatLongs = new ArrayList<String>(Arrays.asList(prods.split("\n")));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public void DataLoader3()  {
        loadRiskFactors();
        loadSampleLatLongs();
        List<Quote> rawrecords = null;

        try {
            HiveDao dao = new HiveDao();
            rawrecords = dao.getInsuranceLocations();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        try {
            Random rand = new Random();
            DecimalFormat dFormat = new DecimalFormat("####,###,###.00");

            DateTime startdate = new DateTime();
            DateTime enddate = new DateTime();
            startdate = startdate.minusDays(30);
            float minrisk = 0.0f;
            float maxrisk = 9.9f;
            String[] LOB = new String[] {"BO",  "CP",  "GL", "WC", "CR", "DF",  "MM"};
            String[] UNDERWRITERS = new String[] {"John King",  "Scott Summers",  "Ronald Drews", "Marie Mitz", "Carla Emeril", "Dave Starr",  "Jason Jumba"};
            String[] STATUS = new String[] {"Submission", "Verification", "Rating", "Quote prep", "Quote Delivery"};

            String [] RISKCLASS = new String[] {"Preferred", "Selected" };
            int quoteseq = 0;
            int poicynumber = 46634532;


            for (Quote q: rawrecords) {

                if ("StoreID".equals(q.getQuote())) {
                    continue;
                }

                q.setPloicyId("P" + poicynumber++);
                q.setLocationId("L" + poicynumber++);
                q.setQuoteId("Q" + quoteseq);

                Set<String> lob = new TreeSet<String>();
                lob.add("CP");
                for (int i = 0; i < (1 + rand.nextInt(6)); i ++){
                    lob.add(LOB[rand.nextInt(LOB.length)]);
                }
                StringBuffer sb = new StringBuffer();
                for (String l : lob){
                    sb.append(l + ", ");
                }
                q.setQuote( q.getQuote() + quoteseq + "");

                q.setLobs(sb.toString().substring(0, sb.toString().length() -2));

                if ( rand.nextInt( 100) % 10 == 8){
                    q.setQuoteType("RENEWAL");
                } else {
                    q.setQuoteType("NBA");
                }
                int premium = 24000 + (100* rand.nextInt(15));
                if( q.companyid.equals("WM")){
                    if (  q.getStoretype() != null && q.getStoretype().equals("Supercenter")) {
                        premium = 290000 + (1000 * rand.nextInt(15));
                    } else {
                        premium = 125000 + (1000 * rand.nextInt(150));
                    }
                } else if( q.companyid.equals("VNB")){
                    premium = 65000 + (1000* rand.nextInt(100));
                }
                q.setAnnualpremium(  premium );


                q.setCompletion(Math.round(Math.floor((50 + rand.nextInt(400))/5 )) + "%");
                q.setCurrentstep(STATUS[rand.nextInt(STATUS.length)]);
                q.setUnderwriter(UNDERWRITERS[rand.nextInt(UNDERWRITERS.length)]);
                q.setRiskclass(RISKCLASS[rand.nextInt(RISKCLASS.length)]);


                q.setQuoteRequestDate(getRandomDate(startdate.toDate(), enddate.toDate()));
                q.setQuoteResponseDate(getRandomDate(q.getQuoteRequestDate(), enddate.toDate()));

                q.setCrimeRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setHailRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setFireRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setFloodRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setEarthquakeRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setWindstromRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                RiskFactor r = null;
                if( q.getCompanyid().equals("VNB") && q.getCounty() != null ){
                    if (riskFactors.keySet().contains(q.getCounty())){
                        r = riskFactors.get( q.getCounty());
                    }
                }  else if ( q.getCompanyid().equals("WM") && q.getState() != null ){
                    if (riskFactors.keySet().contains(q.getState())){
                        r = riskFactors.get( q.getState());
                    }
                }  else if ( q.getCompanyid().equals("CVS") && q.getZipcode() != null ){
                    if (riskFactors.keySet().contains(q.getZipcode())){
                        r = riskFactors.get( q.getZipcode());
                    }
                }

                if ( r != null){
                    q.setCrimeRisk( r.getCrimeRisk());
                    q.setHailRisk(r.getHailRisk());
                    q.setFireRisk(r.getFireRisk());
                    q.setFloodRisk(r.getFloodRisk());
                    q.setEarthquakeRisk(r.getEarthquakeRisk());
                    q.setWindstromRisk(r.getWindstromRisk());
                }
                q.setPolicyTerm(1+ rand.nextInt(3));
                int coverageamt = 800000;
                if (q.getCompanyid().equals("WM")) {
                    coverageamt =+ 6000000;
                } else if (q.getCompanyid().equals("CVS")) {
                    coverageamt =+ 2000000;
                } else if (q.getCompanyid().equals("VNB")) {
                    coverageamt =+ 1000000;
                }
                q.setCoverageAmount(coverageamt +  RandomUtils.nextInt( rand, 10000));
                //System.out.println(q.toString());
                alllocations.add(q);
                quoteseq ++;

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public   DataLoader()  {
        loadRiskFactors();
        loadSampleLatLongs();

        FileInputStream in = null;
        try {
            String locationsPath = DemoContext.getProperty("demo.locations.filepath");
            in = new FileInputStream(locationsPath);
            String prods = IOUtils.toString(in);
            String[] lines = prods.split("\n");
            System.out.println(lines.length);
            Random rand = new Random();
            DecimalFormat dFormat = new DecimalFormat("####,###,###.00");

            DateTime startdate = new DateTime();
            DateTime enddate = new DateTime();
            startdate = startdate.minusDays(30);
            float minrisk = 0.0f;
            float maxrisk = 9.9f;
            String[] LOB = new String[] {"BO",  "CP",  "GL", "WC", "CR", "DF",  "MM"};
            String[] UNDERWRITERS = new String[] {"John King",  "Scott Summers",  "Ronald Drews", "Marie Mitz", "Carla Emeril", "Dave Starr",  "Jason Jumba"};
            String[] STATUS = new String[] {"Submission", "Verification", "Rating", "Quote prep", "Quote Delivery"};

            String [] RISKCLASS = new String[] {"Preferred", "Selected" };
            int quoteseq = 0;
            int poicynumber = 46634532;


            for (String line: lines) {
                String tokens[] = line.split(",");
                if ("StoreID".equals(tokens[0])) {
                    continue;
                }

                Quote q = new Quote();
                q.setPloicyId("P" + poicynumber++);
                q.setLocationId("L" + poicynumber++);
                q.setQuoteId("Q" + quoteseq);

                Set<String> lob = new TreeSet<String>();
                lob.add("CP");
                for (int i = 0; i < (1 + rand.nextInt(6)); i ++){
                    lob.add(LOB[rand.nextInt(LOB.length)]);
                }
                StringBuffer sb = new StringBuffer();
                for (String l : lob){
                    sb.append(l + ", ");
                }
                q.setQuote( tokens[0] + quoteseq + "");
                q.setCompany(tokens[2]);
                q.setAddress(tokens[4]);
                q.setCity(tokens[5]);
                q.setState(tokens[6]);
                q.setZipcode(tokens[7]);
                q.setStorename(tokens[3]);
                q.setCounty(tokens[8]);
                q.setCompanyid( tokens[1]);


                q.setLobs(sb.toString().substring(0, sb.toString().length() -2));
                if ( tokens.length > 9 && tokens[9] != null) {
                    q.setStoretype(tokens[9]);
                }
                try {
                    q.setLatitude(Float.parseFloat(tokens[10]));
                    q.setLongitude( Float.parseFloat(tokens[11]));
                } catch(Exception e){
                    //e.printStackTrace();
                }
                if ( rand.nextInt( 100) % 10 == 8){
                    q.setQuoteType("RENEWAL");
                } else {
                    q.setQuoteType("NBA");
                }
                int premium = 24000 + (100* rand.nextInt(15));
                if( q.companyid.equals("WM")){
                    if (  q.getStoretype() != null && q.getStoretype().equals("Supercenter")) {
                        premium = 290000 + (1000 * rand.nextInt(15));
                    } else {
                        premium = 125000 + (1000 * rand.nextInt(150));
                    }
                } else if( q.companyid.equals("VNB")){
                    premium = 65000 + (1000* rand.nextInt(100));
                }
                q.setAnnualpremium(  premium );


                q.setCompletion(Math.round(Math.floor((50 + rand.nextInt(400))/5 )) + "%");
                q.setCurrentstep(STATUS[rand.nextInt(STATUS.length)]);
                q.setUnderwriter(UNDERWRITERS[rand.nextInt(UNDERWRITERS.length)]);
                q.setRiskclass(RISKCLASS[rand.nextInt(RISKCLASS.length)]);


                q.setQuoteRequestDate(getRandomDate(startdate.toDate(), enddate.toDate()));
                q.setQuoteResponseDate(getRandomDate(q.getQuoteRequestDate(), enddate.toDate()));

                q.setCrimeRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setHailRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setFireRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setFloodRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setEarthquakeRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                q.setWindstromRisk((float)Math.random() * (maxrisk - minrisk) + minrisk);
                RiskFactor r = null;
                if( q.getCompanyid().equals("VNB") && q.getCounty() != null ){
                    if (riskFactors.keySet().contains(q.getCounty())){
                        r = riskFactors.get( q.getCounty());
                    }
                }  else if ( q.getCompanyid().equals("WM") && q.getState() != null ){
                    if (riskFactors.keySet().contains(q.getState())){
                        r = riskFactors.get( q.getState());
                    }
                }  else if ( q.getCompanyid().equals("CVS") && q.getZipcode() != null ){
                    if (riskFactors.keySet().contains(q.getZipcode())){
                        r = riskFactors.get( q.getZipcode());
                    }
                }

                if ( r != null){
                    q.setCrimeRisk( r.getCrimeRisk());
                    q.setHailRisk(r.getHailRisk());
                    q.setFireRisk(r.getFireRisk());
                    q.setFloodRisk(r.getFloodRisk());
                    q.setEarthquakeRisk(r.getEarthquakeRisk());
                    q.setWindstromRisk(r.getWindstromRisk());
                }
                q.setPolicyTerm(1+ rand.nextInt(3));
                int coverageamt = 800000;
                if (q.getCompanyid().equals("WM")) {
                    coverageamt =+ 6000000;
                } else if (q.getCompanyid().equals("CVS")) {
                    coverageamt =+ 2000000;
                } else if (q.getCompanyid().equals("VNB")) {
                    coverageamt =+ 1000000;
                }
                q.setCoverageAmount(coverageamt +  RandomUtils.nextInt( rand, 10000));
                //System.out.println(q.toString());
                alllocations.add(q);
                quoteseq ++;

            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void increment(int batchSize){
        if ( batchSize > 0 && startRow < this.alllocations.size()){
            this.startRow += batchSize;
            this.batchSize = batchSize;
        }
    }
    public List<Quote> loadAllLocations(){
        if (startRow >= this.alllocations.size()) {
            return this.alllocations;
        } else {
            return this.alllocations.subList(0, startRow);
        }
    }
    public ArrayList<String> loadLatLongs(){
        return this.sampleLatLongs;
    }


}
