package com.rcggs.enablefs.demo.service.controller;

import java.io.FileInputStream;
import java.util.Properties;

public class DemoContext {

	static Properties properties;

	static {
		properties = new Properties();
		try {
			properties.load(new FileInputStream("/apps/data/enableins/enableinsurance.properties"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	static String getProperty(final String key) {
		return properties.getProperty(key);
	}
}
