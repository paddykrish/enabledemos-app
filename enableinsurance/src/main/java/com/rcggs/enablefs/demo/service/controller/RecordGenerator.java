package com.rcggs.enablefs.demo.service.controller;

import java.io.*;
import java.net.*;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
	int seq = 0;
		float avg = 5.6f;
		int count = 350;
		int premium = 1233444;
		try {
			while (true) {

				//String wrapper = "{\"id\":\"1\",\"type\":\"2\",\"message\":\"" + avg + "," + count + "," + premium  + "\"}";
				//count += rand.nextInt(50);
				//premium += rand.nextInt(5333);
				//System.out.println(wrapper);
				String url = "http://localhost:8080/enableinsurance/service/dataservice/increment/250";
				sendMessagesToTopic(url);
				Thread.sleep(3000);
			}

		} catch (Exception e) {
				e.printStackTrace();
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
			conn.setDoOutput(true);

			conn.setRequestMethod("GET");
			//conn.setRequestProperty("Accept", "application/json");
			//OutputStream os = conn.getOutputStream();


			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));
			String output ;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {
				System.out.println(output);
			}
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

}
