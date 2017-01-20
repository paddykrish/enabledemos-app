package com.rcggs.enablefs.demo.service.controller;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.security.UserGroupInformation;
import org.apache.log4j.Logger;
import scala.tools.cmd.Demo;

import java.security.PrivilegedExceptionAction;
import java.sql.*;
import java.io.IOException;
import java.sql.Statement;
import java.util.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 1/13/17.
 */
public class HiveDao {
    private final static Logger logger = Logger.getLogger(HiveDao.class);

    private static Connection connection;
    private static PreparedStatement statement;


    public List<Quote> getInsuranceLocations( ) throws SQLException, ClassNotFoundException {
        String query = "select * from enableins.insurance_locations";
        List<Quote> results = new ArrayList<Quote>();
        Class.forName("org.apache.hive.jdbc.HiveDriver");

        //Class.forName("com.cloudera.impala.jdbc41.Driver");

        Configuration conf = new Configuration();
        //conf.set("hadoop.security.authentication", "Kerberos");
        //conf.set("kerberos.principal", "cloudera-service@RCGGS");
        //conf.set("kerberos.keytab", "/hadoop/edge/prod-conf/cloudera-service.keytab");

        UserGroupInformation.setConfiguration(conf);
        UserGroupInformation ugi = null;
        //final String url = "jdbc:hive2://52.45.154.215:10000/default;principal=cloudera-service/admin@RCGGS;auth=kerberos;auth_mechanism=SASL;use_sasl=True;";
        final String url = "jdbc:hive2://ec2-50-17-96-175.compute-1.amazonaws.com:10000/enableins";
        //final String url = "jdbc:hive2://ec2-50-17-96-175.compute-1.amazonaws.com:21050/enablefs";

        /*
        try {
            Class.forName("org.apache.hive.jdbc.HiveDriver");
            ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI(conf.get("kerberos.principal"), conf.get("kerberos.keytab"));
            ugi.doAs(new PrivilegedExceptionAction<Void>() {
                public Void run() throws Exception {
                    System.out.println(url);
                    connection = DriverManager.getConnection(url, "", "");
                    return null;
                }
            });
        } catch (IOException | InterruptedException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        */
        connection = DriverManager.getConnection( url);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

         Statement st = connection.createStatement();
        java.sql.ResultSet rs = st.executeQuery(query);
        while (rs.next()) {

            Quote q = new Quote();
            q.setQuote(rs.getString(1));
            q.setCompanyCode(rs.getString(1));
            q.setCompany(rs.getString(1));
            q.setStorename(rs.getString(1));
            q.setAddress(rs.getString(1));
            q.setCity(rs.getString(1));
            q.setZipcode(rs.getString(1));
            q.setCounty(rs.getString(1));
            q.setStoretype(rs.getString(1));
            results.add(q);

        }
        System.out.println("Loaded " + results.size() + " records ");
        return results;
    }


    public HashMap<String , RiskFactor> getInsuranceRisks( ) throws SQLException, ClassNotFoundException {
        String query = "select * from enableins.insurance_riskfactors";
        HashMap<String , RiskFactor> riskFactors = new HashMap<String, RiskFactor>();

        Class.forName("org.apache.hive.jdbc.HiveDriver");

        //Class.forName("com.cloudera.impala.jdbc41.Driver");

        Configuration conf = new Configuration();
        //conf.set("hadoop.security.authentication", "Kerberos");
        //conf.set("kerberos.principal", "cloudera-service@RCGGS");
        //conf.set("kerberos.keytab", "/hadoop/edge/prod-conf/cloudera-service.keytab");

        UserGroupInformation.setConfiguration(conf);
        UserGroupInformation ugi = null;
        String host = DemoContext.getProperty("demo.cluster.dbhost");
        String dbname = DemoContext.getProperty("demo.cluster.dbname");

        String url = "";
        //final String url = "jdbc:hive2://52.45.154.215:10000/default;principal=cloudera-service/admin@RCGGS;auth=kerberos;auth_mechanism=SASL;use_sasl=True;";
        if ( "cdh".equals(DemoContext.getProperty("demo.distribution"))){
            //use Impala
            url = "jdbc:hive2://" + host + ":21050/"+ dbname;

        } else {
            url = "jdbc:hive2://" + host + ":10000/"+ dbname;

        }

        /*
        try {
            Class.forName("org.apache.hive.jdbc.HiveDriver");
            ugi = UserGroupInformation.loginUserFromKeytabAndReturnUGI(conf.get("kerberos.principal"), conf.get("kerberos.keytab"));
            ugi.doAs(new PrivilegedExceptionAction<Void>() {
                public Void run() throws Exception {
                    System.out.println(url);
                    connection = DriverManager.getConnection(url, "", "");
                    return null;
                }
            });
        } catch (IOException | InterruptedException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        */
        connection = DriverManager.getConnection( url);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Statement st = connection.createStatement();
        java.sql.ResultSet rs = st.executeQuery(query);
        while (rs.next()) {

            RiskFactor r = new RiskFactor();
            r.setType(rs.getString(1));
            r.setValue(rs.getString(2));
            r.setFireRisk(rs.getFloat(3));
            r.setCrimeRisk(rs.getFloat(4));
            r.setHailRisk(rs.getFloat(5));
            r.setEarthquakeRisk(rs.getFloat(6));
            r.setWindstromRisk(rs.getFloat(7));
            r.setFloodRisk(rs.getFloat(8));
            riskFactors.put(r.getValue(), r);

        }
        System.out.println("Loaded " + riskFactors.size() + " riskFactors records ");
        return riskFactors;
    }

    public static void main(String args[]){
        HiveDao d = new HiveDao();
        try {
            d.getInsuranceLocations();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

    }
}
