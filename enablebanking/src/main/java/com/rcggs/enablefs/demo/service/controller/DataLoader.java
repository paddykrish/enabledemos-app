package com.rcggs.enablefs.demo.service.controller;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.joda.time.DateTime;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.*;

/**
 * Created by Administrator on 1/6/17.
 */
public class DataLoader {
    protected List<Transaction> allTransactions = new LinkedList<Transaction>();

    public Date getRandomDate(Date from, Date to) {
        double d = from.getTime() + Math.random() * (to.getTime() - from.getTime());
        return new Date(  (long)d );
    }


    public DataLoader()  {
        FileInputStream in = null;
        try {
            in = new FileInputStream("/hadoop/edge/insurance_locations.csv");
            //in = new FileInputStream("/hadoop/edge/insurance_locations.csv");
            String prods = IOUtils.toString(in);
            String[] lines = prods.split("\n");
            System.out.println(lines.length);
            Random rand = new Random();
            DecimalFormat dFormat = new DecimalFormat("####,###,###.00");

            DateTime startdate = new DateTime();
            DateTime enddate = new DateTime();
            startdate = startdate.minusDays(30);



        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Transaction> loadAllTransactions(){
        return this.allTransactions;
    }
}
