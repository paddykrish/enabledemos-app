package com.rcggs.enablefs.demo.service.controller;

import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2/4/17.
 */
public class MysqlDao {

    final String url = "jdbc:mysql://localhost:3306/pnc?user=root&password=root";
    private final static Logger logger = Logger.getLogger(MysqlDao.class);

    private static Connection connection;
    private static PreparedStatement statement;

    public MysqlDao(){
    }

    public void getWeaterEvents() throws SQLException {

        connection = DriverManager.getConnection( url);
        Statement st = connection.createStatement();
        String query = " select id, cap_event, cap_status, cap_severity, cap_category, cap_effective,  cap_expires, cap_polygon, " +
                       "  title, updated, zipcodes, states, counties, link, cap_areadesc, summary  " +
                       "  from WeatherEvents " +
                       "  where cap_expires >= now() or cap_effective >= now()";
        java.sql.ResultSet rs = st.executeQuery(query);
        List<WeatherGovInfo> results = new ArrayList<WeatherGovInfo>();

        while (rs.next()) {

            WeatherGovInfo w = new WeatherGovInfo();
            w.setId(rs.getString("id"));
            w.setEvent(rs.getString("cap_event"));
            w.setStatus(rs.getString("cap_status"));
            w.setSeverity(rs.getString("cap_severity"));
            w.setCategory(rs.getString("cap_category"));
            w.setEffective(rs.getDate("cap_effective").toString());
            w.setExpires(rs.getDate("cap_expires").toString());
            w.setPolygon(rs.getString("cap_polygon"));
            w.setTitle(rs.getString("title"));
            w.setUpdated(rs.getString("updated"));
            w.setStates(rs.getString("states"));
            w.setCounties(rs.getString("counties"));
            w.setZipcodes(rs.getString("zipcodes"));

            w.setLink(rs.getString("link"));
            w.setAreadesc(rs.getString("cap_areadesc"));
            w.setSummary(rs.getString("summary"));

            System.out.println(w);
            results.add(w);
        }
        System.out.println("Loaded " + results.size() + " records ");
        //return results;


    }

    public  static void main(String args[]){
        MysqlDao m = new MysqlDao();
        try {
            m.getWeaterEvents();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
