package com.rcggs.enablefs.demo.service.controller;

import java.io.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;



public class RecordGenerator {
	final static Logger LOG = LoggerFactory.getLogger(RecordGenerator.class);

	final static Random rand = new Random();

	public static void loadStarbucklocations(String... args) throws Exception {
		String[] locations = getLines("/starbucks_uslocations_withheader.csv");

		int seq = 0;
		for (int i = 1; i < locations.length; i++) {
			try {
				String []tokens = locations[i].split(",");
				int srtype = rand.nextInt(4);
				String message = tokens[6].replace("\"", "").trim()  + "," + tokens[7].replace("\"", "").trim() + "," + srtype ;
				//String message = "{\"lat\":" + tokens[6].replace("\"", "").trim()  + "," + "\"lng\":" + tokens[7].replace("\"", "").trim() + ",\"type\":" + srtype + "}";

				String wrapper = "{\"id\":\"1\",\"type\":\"2\",\"message\":\"" + message + "\"}";
				String url = "http://localhost:8080/serviceincidents/service/updateInterface/";
				postMessage(url, wrapper);
				/*

				String message = "{\"lat\":" + tokens[6].replace("\"", "").trim()  + "," + "\"lng\":" + tokens[7].replace("\"", "").trim() + ",\"type\":" + srtype + "}";
				String url = "http://localhost:8080/serviceincidents/service/updateInterface/ALL/342/" +  URLEncoder.encode(message) + "/";
				LOG.info("url is " + url);
				sendMessagesToTopic(url);
				*/

				seq++;
				break;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public static void main(String... args) throws Exception {
		String[] locations = getLines("/locations.txt");

		int seq = 0;
		for (int i = 1; i < locations.length; i++) {
			try {
				String []tokens = locations[i].split("\\|");
				System.out.println(locations[i]);
				String address = tokens[6] + " ! " + tokens[7] + " ! " + tokens[2];
				int srtype = rand.nextInt(4);
				String message = tokens[3].replace("\"", "").trim()  + "," + tokens[4].replace("\"", "").trim() + "," + srtype + "," + address;
				//String message = "{\"lat\":" + tokens[6].replace("\"", "").trim()  + "," + "\"lng\":" + tokens[7].replace("\"", "").trim() + ",\"type\":" + srtype + "}";
				//System.out.println(message);
				String wrapper = "{\"id\":\"1\",\"type\":\"2\",\"message\":\"" + message + "\"}";
				String url = "http://rpc3848.daytonoh.ncr.com:8080/serviceincidents/service/updateInterface/";
				//http://rpc3848.daytonoh.ncr.com:8080/serviceincidents/app/view/home.html

				postMessage(url, wrapper);
				/*

				String message = "{\"lat\":" + tokens[6].replace("\"", "").trim()  + "," + "\"lng\":" + tokens[7].replace("\"", "").trim() + ",\"type\":" + srtype + "}";
				String url = "http://localhost:8080/serviceincidents/service/updateInterface/ALL/342/" +  URLEncoder.encode(message) + "/";
				LOG.info("url is " + url);
				sendMessagesToTopic(url);
				*/
				seq++;
				//break;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}


	public static void postMessage(String endpoint, String payload) {

		try {

			URL url = new URL(endpoint);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			OutputStream os = conn.getOutputStream();
			os.write(payload.getBytes());
			os.flush();

			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));
			//String output;
			//System.out.println("Output from Server .... \n");
			//while ((output = br.readLine()) != null) {
			//	System.out.println(output);
			//}
			conn.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();

		}
	}

	public static void sendMessagesToTopic(String uri){
		try {

			URL url = new URL(uri);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			//conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));
			String output;
			//System.out.println("Output from Server .... \n");
			//while ((output = br.readLine()) != null) {
			//	System.out.println(output);
			//}
			conn.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();

		}

	}


	public static void generateStores() throws Exception {

		String[] data = getLines("/sample/stores.dat");

		for (int i = 0; i < data.length; i++) {

			String[] values = data[i].split(",");
			String record = (i + "," + values[0] + "," + values[1] + "," + values[2] + "," + values[3] + ","
					+ values[4].replaceAll("\n", "").trim() + "\n");

			write("/tmp/stores.txt", record);
		}
	}

	public static void generateProducts() throws Exception {

		String[] data = getLines("/sample/products.txt");

		for (int i = 0; i < data.length; i++) {

			try {

				String[] values = data[i].split(",");
				String record = (i + "," + values[0].replaceAll("\n", "").trim() + "," + rand.nextInt(350) + "," + rand.nextInt(100)
						+ "," + rand.nextInt(100) + "," + 10 + "," + 0 + "\n");

				write("/tmp/products.txt", record);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	public static void generateUsers() throws Exception {

		String[] names = getLines("/sample/stores.txt");

		String[] data = getLines("/sample/products.csv");

		for (int i = 0; i < data.length; i++) {

			try {

				String[] values = data[i].split(",");
				String record = (i + ",," + names[i].replaceAll("\n", "").trim() + "," + values[0] + "," + values[1] + "," + values[2]
						+ "," + values[3] + "," + values[4] + "," + values[5].replaceAll("\n", "").trim() + ",\n");

				write("/tmp/customers.csv", record);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

	public static void generateOrders() throws Exception {

		Random rand = new Random();

		File currentDirectory = new File("");

		String[] emails = { "yahoo", "gmail", "hotmail", "aol", "earthlink" };
		String[] sex = { "M", "F" };
		// String[] addrs = getLines("/sample/markets.txt");

		String[] stores = getLines("/sample/stores.dat");

		// Appendable buffer = new StringBuilder();
		String[] names = getLines("/sample/customers.csv");

		String[] data = getLines("/sample/address.txt");

		for (int i = 0; i < 1000000; i++) {

			try {

				int randomStore = rand.nextInt(stores.length - 0) + 0;
				int randomCustomer = rand.nextInt(names.length - 0) + 0;

				// System.out.println(randomStore);

				String record = (i + "," + randomCustomer + "," + randomStore + "," + randomDate() + "\n");

				write("/tmp/orderdetails.csv", record);

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

	public static void generateOrdersItems() throws Exception {

		Random rand = new Random();

		File currentDirectory = new File("");

		String[] emails = { "yahoo", "gmail", "hotmail", "aol", "earthlink" };
		String[] sex = { "M", "F" };
		// String[] addrs = getLines("/sample/markets.txt");

		String[] products = getLines("/sample/products.txt");

		// Appendable buffer = new StringBuilder();
		String[] names = getLines("/sample/customers.csv");

		String[] data = getLines("/sample/address.txt");

		int cnt = 0;

		for (int i = 0; i < 1000000; i++) {

			try {

				int randomCustomer = rand.nextInt(names.length - 0) + 0;
				int randomOrder = rand.nextInt(1000000 - 0) + 0;

				int randomNumProducts = rand.nextInt(10 - 1) + 1;

				for (int j = 0; j < randomNumProducts; j++) {
					double randomPrice = .99 + (399.99 - .99) * rand.nextDouble();
					int randomProducts = rand.nextInt(products.length - 0) + 0;
					int randomQuantity = rand.nextInt(5 - 1) + 1;
					List<Object> record = new ArrayList<Object>();
					record.add(cnt++);
					record.add(randomOrder);
					record.add(randomProducts);
					record.add(String.format("%.2f", randomPrice));
					record.add(randomQuantity);
					write("/tmp/orderitems.csv", StringUtils.join(record, ",") + "\n");

				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public static void generateInventory() throws Exception {

		Random rand = new Random();

		File currentDirectory = new File("");

		String[] emails = { "yahoo", "gmail", "hotmail", "aol", "earthlink" };
		String[] sex = { "M", "F" };
		// String[] addrs = getLines("/sample/markets.txt");

		String[] products = getLines("/sample/products.txt");

		// Appendable buffer = new StringBuilder();
		String[] names = getLines("/sample/customers.csv");

		String[] data = getLines("/sample/address.txt");

		int cnt = 0;

		for (int i = 0; i < 51; i++) {

			try {

				for (int j = 0; j < 1856; j++) {
					int randomQuantity = rand.nextInt(50 - 1) + 1;
					System.out.println(cnt++ + "," + i + "," + j + "," + randomQuantity);
					write("/tmp/inventory.csv", cnt++ + "," + i + "," + j + "," + randomQuantity + "\n");
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	static void insert(String query) throws Exception {
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		String userName = "sa";
		String password = "root";
		String url = "jdbc:sqlserver://localhost:1433;databaseName=userdata;";
		Connection con = DriverManager.getConnection(url, userName, password);
		Statement s1 = con.createStatement();
		System.out.println(query);
		s1.executeUpdate(query);
		// while(rs.next()){
		// System.out.println(rs.getString(1));
		// }
	}

	static String[] getLines(final String name) throws IOException, URISyntaxException {
		System.out.println(name);
		String data = IOUtils.toString(RecordGenerator.class.getResourceAsStream(name));
		return data.split("\n");
	}

	static void write(final String path, final String content) {
		Writer writer = null;
		try {
			writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path, true), "utf-8"));
			writer.write(content);
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			try {
				writer.close();
			} catch (Exception ex) {
			}
		}
	}

	static String randomDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

		Date randomDate = new Date(getRandomTimeBetweenTwoDates());
		return dateFormat.format(randomDate);

	}

	private static long getRandomTimeBetweenTwoDates() {
		long beginTime = Timestamp.valueOf("2013-01-01 00:00:00").getTime();
		long endTime = Timestamp.valueOf("2008-12-31 00:58:00").getTime();
		long diff = endTime - beginTime + 1;
		return beginTime + (long) (Math.random() * diff);
	}

	static String[] states = new String[] { "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
			"KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
			"OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" };

}
