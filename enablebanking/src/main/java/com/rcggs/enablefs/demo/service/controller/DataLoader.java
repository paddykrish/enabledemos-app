package com.rcggs.enablefs.demo.service.controller;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.joda.time.DateTime;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.*;
import java.text.*;

/**
 * Created by Administrator on 1/6/17.
 */
public class DataLoader {
    protected List<Transaction> allTransactions = new LinkedList<Transaction>();
    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yy HH:mm");

    public Date getRandomDate(Date from, Date to) {
        double d = from.getTime() + Math.random() * (to.getTime() - from.getTime());
        return new Date(  (long)d );
    }


    public DataLoader()  {
        FileInputStream in = null;
        try {
            //in = new FileInputStream("/apps/data/enable_banking_data.csv");
            //in = new FileInputStream("/home/ec2-user/enableins/enable_banking_data.csv");
            in = new FileInputStream("/home/bitnami/enableins/enable_banking_data.csv");
            //in = new FileInputStream("/hadoop/edge/insurance_locations.csv");
            String prods = IOUtils.toString(in);
            String[] lines = prods.split("\n");
            System.out.println(lines.length);
            Random rand = new Random();
            DecimalFormat dFormat = new DecimalFormat("####,###,###.00");

            DateTime startdate = new DateTime();
            DateTime enddate = new DateTime();
            startdate = startdate.minusDays(30);
            for (String line: lines) {
                String tokens[] = line.replace("\"", "").replace(")", "").replace("(", "-").split(",");
                if ("Date".equals(tokens[0])) {
                    continue;
                }
                Transaction t = new Transaction();
                try {
                    t.setTransactionDate(sdf.parse(tokens[0]));
                } catch (Exception e){
                    e.printStackTrace();
                }
                t.setTransactionId(tokens[1]);
                t.setTransactionType(tokens[2]);
                t.setOriginationAccountId(tokens[3]);
                t.setAccountType(tokens[4]);
                t.setAccountName(tokens[5]);
                t.setBeneficaryAccountId(tokens[6]);
                t.setAmount(Float.parseFloat(tokens[7].replace("$", "")));
                t.setStory(tokens[8]);
                System.out.println(t);
                allTransactions.add(t);
            }


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Transaction> loadAllTransactions(){
        return this.allTransactions;
    }

    public static void main(String args[]){
        DataLoader  d= new DataLoader();

    }
}
