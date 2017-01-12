package com.rcggs.enablefs.demo.service.controller;

import java.io.*;
import java.net.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.io.IOUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;



public class RecordGenerator {
	final static Logger LOG = LoggerFactory.getLogger(RecordGenerator.class);

	final static Random rand = new Random();



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
