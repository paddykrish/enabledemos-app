package com.rcggs.enablefs.demo.service.controller;

import com.rcggs.datalake.notification.NotificationService;
import com.rcggs.datalake.notification.SMSNotificationService;
import org.apache.commons.beanutils.BeanComparator;
import org.apache.phoenix.jdbc.PhoenixDriver;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DecimalFormat;
import java.util.*;

@RestController
@RequestMapping(value = "/dataservice")
public class ServiceController {

	final Logger LOG = LoggerFactory.getLogger(getClass());
	ObjectWriter ow = new ObjectMapper().writer();
	ObjectMapper mapper = new ObjectMapper();
	JsonFactory factory = mapper.getJsonFactory();
	DataLoader dataloader = new DataLoader();
	DecimalFormat dFormat = new DecimalFormat("##############.00");
	DecimalFormat tinyDFormat = new DecimalFormat("##.##");
	Random rand = new Random();
	final static RestTemplate restTemplate = new RestTemplate();

	public Date getRandomDate(Date from, Date to) {
		double d = from.getTime() + Math.random() * (to.getTime() - from.getTime());
		return new Date((long) d);
	}

	private static final Driver phoenixDriver = new PhoenixDriver();

	@RequestMapping(value = "/notify/{name}", method = RequestMethod.GET)
	public String notify(@PathVariable String name) {

		NotificationService<String> service = new SMSNotificationService<String>();
		service.notify(name.replaceAll("\\<[^>]*>", ""), DemoContext.getProperty("demo.sms.number"));

		return null;
	}

	@RequestMapping(value = "/echo", method = RequestMethod.GET)
	public String echo() {
		return null;
	}



	@RequestMapping(value = "/allTransactionsCount/{name}", method = RequestMethod.GET)
	public String allTransactionsData(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Transactions 1");
			checking.put("color", "#A9B627");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@RequestMapping(value = "/allCaseOpenedCount/{name}", method = RequestMethod.GET)
	public String allCaseOpenedCount(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Cases Opened 1");
			checking.put("color", "#66E5DF");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@RequestMapping(value = "/allBenignCount/{name}", method = RequestMethod.GET)
	public String allBenignCount(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Benign 1");
			checking.put("color", "#f00");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getFNBenignData/{name}", method = RequestMethod.GET)
	public String getFNBenignData(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Benign 1");
			checking.put("color", "#f00");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getFPBenignData/{name}", method = RequestMethod.GET)
	public String getFPBenignData(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Benign 1");
			checking.put("color", "#66E5DF");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getFPCaseOpenedData/{name}", method = RequestMethod.GET)
	public String getFPCaseOpenedData(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Cases Opened 1");
			checking.put("color", "#66E5DF");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@RequestMapping(value = "/getFNCaseOpenedData/{name}", method = RequestMethod.GET)
	public String getFNCaseOpenedData(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Cases Opened 1");
			checking.put("color", "#66E5DF");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@RequestMapping(value = "/getFPTransactions/{name}", method = RequestMethod.GET)
	public String getFPTransactions(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();
			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Transactions 1");
			checking.put("color", "#A9B627");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@RequestMapping(value = "/getTransactionList/{name}", method = RequestMethod.GET)
	public String getTransactionList(@PathVariable String name) {
		try{
			JSONObject  mainobj = new JSONObject();

			JSONArray  list = new JSONArray();

			JSONObject item1 = new JSONObject();
			item1.put("transaction_number",  "26941-608970785424088-608");
			item1.put("transaction_type", "Deposit");
			item1.put("transaction_date", "12/2/16 6:33");
			item1.put("account_number", "7569-4857-4644-8683");
			item1.put("account_type", "Savings");
			item1.put("account_name", "Albert Fisher");
			item1.put("amount", 9754);
			item1.put("beneficiary_account_number", "1111-2222-3333-1234");
			list.put(item1);


			JSONObject item2 = new JSONObject();
			item2.put("transaction_number",  "56217-588811179595560-371");
			item2.put("transaction_type", "Withdrawal");
			item2.put("transaction_date", "12/3/16 3:58");
			item2.put("account_number", "7569-4857-4644-8683");
			item2.put("account_type", "Savings");
			item2.put("account_name", "Albert Fisher");
			item2.put("amount", 12000);
			item2.put("beneficiary_account_number", "1111-2222-3333-1234");
			list.put(item2);

			JSONObject item3 = new JSONObject();
			item3.put("transaction_number",  "49727-661472498757745-201");
			item3.put("transaction_type", "Transfer");
			item3.put("transaction_date", "12/3/16 18:15");
			item3.put("account_number", "7569-4857-4644-8683");
			item3.put("account_type", "Savings");
			item3.put("account_name", "Albert Fisher");
			item3.put("amount", 25445);
			item3.put("beneficiary_account_number", "1111-2222-3333-1234");
			list.put(item3);

			mainobj.put("transaction_list", list);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getTransactionAnalysis/{name}", method = RequestMethod.GET)
	public String getTransactionAnalysis(@PathVariable String name) {
		try{
			JSONObject  mainobj = new JSONObject();

			JSONArray  list = new JSONArray();

			JSONObject item1 = new JSONObject();
			item1.put("transaction_number",  "26941-608970785424088-608");
			item1.put("transaction_type", "Deposit");
			item1.put("transaction_date", "12/2/16 6:33");
			item1.put("account_number", "7569-4857-4644-8683");
			item1.put("account_type", "Savings");
			item1.put("account_name", "Albert Fisher");
			item1.put("amount", 9754);
			item1.put("case_opened", "Benign");
			item1.put("rule_violated", "");
			item1.put("beneficiary_account_number", "1111-2222-3333-1234");
			list.put(item1);

			JSONObject item2 = new JSONObject();
			item2.put("transaction_number",  "56217-588811179595560-371");
			item2.put("transaction_type", "Withdrawal");
			item2.put("transaction_date", "12/3/16 3:58");
			item2.put("account_number", "7569-4857-4644-8683");
			item2.put("account_type", "Savings");
			item2.put("account_name", "Albert Fisher");
			item2.put("amount", 12000);
			item2.put("case_opened", "Yes");
			item2.put("rule_violated", "Amount exceeded $10,000");
			item2.put("beneficiary_account_number", "1111-2222-3333-1234");
			list.put(item2);

			JSONObject item3 = new JSONObject();
			item3.put("transaction_number",  "49727-661472498757745-201");
			item3.put("transaction_type", "Transfer");
			item3.put("transaction_date", "12/3/16 18:15");
			item3.put("account_number", "7569-4857-4644-8683");
			item3.put("account_type", "Savings");
			item3.put("account_name", "Albert Fisher");
			item3.put("amount", 25445);
			item3.put("case_opened", "Yes");
			item3.put("rule_violated", "Amount exceeded $10,000");
			item3.put("beneficiary_account_number", "1111-2222-3333-1234");
			list.put(item3);

			mainobj.put("transactions_analysis", list);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

			@RequestMapping(value = "/getYourCaseWorkload/{name}", method = RequestMethod.GET)
	public String getYourCaseWorkload(@PathVariable String name) {
		try{
			JSONObject  mainobj = new JSONObject();

			JSONArray  list = new JSONArray();

			JSONObject item1 = new JSONObject();
			item1.put("case_number",  "12345-12345");
			item1.put("priority", "High");
			item1.put("case_type", "Savings");
			item1.put("open_date", "12/2/16");
			item1.put("close_date", "12/5/16");
			item1.put("status", "Open");
			list.put(item1);

			JSONObject item2 = new JSONObject();
			item2.put("case_number",  "12345-54321");
			item2.put("priority", "Medium");
			item2.put("case_type", "Savings");
			item2.put("open_date", "12/5/16");
			item2.put("close_date", "12/7/16");
			item2.put("status", "Open");
			list.put(item2);

			JSONObject item3 = new JSONObject();
			item3.put("case_number",  "12345-99999");
			item3.put("priority", "Low");
			item3.put("case_type", "Savings");
			item3.put("open_date", "12/3/16");
			item3.put("close_date", "12/5/16");
			item3.put("status", "Close");
			list.put(item3);

			mainobj.put("your_case_workloads", list);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}



	@RequestMapping(value = "/allActiveCasesInvLevels/{name}", method = RequestMethod.GET)
	public String allActiveCasesInvLevels(@PathVariable String name) {
		try{
			JSONObject  mainobj = new JSONObject();
			JSONArray  list = new JSONArray();

			JSONObject item1 = new JSONObject();
			item1.put("investigator_level",  "Investigator I");
			item1.put("daily_min_cases", 17);
			item1.put("daily_max_cases", 34);
			item1.put("daily_average_cases", 21.33);
			item1.put("average_processing_days", 6.0);
			list.put(item1);

			JSONObject item2 = new JSONObject();
			item2.put("investigator_level",  "Investigator II");
			item2.put("daily_min_cases", 26);
			item2.put("daily_max_cases", 38);
			item2.put("daily_average_cases", 27.00);
			item2.put("average_processing_days", 8.0);
			list.put(item2);

			JSONObject item3 = new JSONObject();
			item3.put("investigator_level",  "Investigator III");
			item3.put("daily_min_cases", 35);
			item3.put("daily_max_cases", 80);
			item3.put("daily_average_cases", 47.00);
			item3.put("average_processing_days", 14.0);
			list.put(item3);

			mainobj.put("active_cases_investigator_levels", list);
			return mainobj.toString();
		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/allTransactionsByType/{name}", method = RequestMethod.GET)
	public String allTransactionsByType(@PathVariable String name) {
		try{
			JSONArray  mainobj = new JSONArray();

			JSONObject checking = new JSONObject();
			JSONArray countList = new JSONArray();
			checking.put("key", "Checking");
			checking.put("color", "#000");
			DateTime dt = new DateTime();
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				countList.put(row);
			}
			checking.put("values", countList);
			mainobj.put(checking);

			JSONObject savings = new JSONObject();
			JSONArray svcountList = new JSONArray();
			savings.put("key", "Checking");
			savings.put("color", "#F00");
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				svcountList.put(row);
			}
			savings.put("values", svcountList);
			mainobj.put(savings);

			JSONObject cc = new JSONObject();
			JSONArray cccountList = new JSONArray();
			cc.put("key", "Credit Card");
			cc.put("color", "#66E5DF");
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				cccountList.put(row);
			}
			cc.put("values", cccountList);
			mainobj.put(cc);


			JSONObject loan = new JSONObject();
			JSONArray loancountList = new JSONArray();
			loan.put("key", "Loans");
			loan.put("color", "brown");
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				loancountList.put(row);
			}
			loan.put("values", loancountList);
			mainobj.put(loan);

			JSONObject mort = new JSONObject();
			JSONArray mortcountList = new JSONArray();
			mort.put("key", "Mortgages");
			mort.put("color", "#E5CE66");
			for ( int i = 0; i < 24; i++){
				JSONArray row = new JSONArray();
				row.put( dt.minusHours(i).getMillis());
				row.put( 300+rand.nextInt(300));
				mortcountList.put(row);
			}
			mort.put("values", mortcountList);
			mainobj.put(mort);

			return mainobj.toString();

		} catch ( Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	class Pair {
		String id;
		String value;
		String data;

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getData() {
			return data;
		}

		public void setData(String data) {
			this.data = data;
		}
	}

	List<Pair> combineListsIntoOrderedMap(List<String> keys, List<String> values) {

		List<Pair> pairs = new ArrayList<Pair>();

		if (keys.size() != values.size() && keys.size() > 0) {
			Pair pair = new Pair();
			pair.setId(keys.get(0));
			pair.setValue(values.get(0));
			pairs.add(pair);

		} else {
			for (int i = 0; i < (keys.size() == 1 ? 1 : 2); i++) {
				Pair pair = new Pair();
				pair.setId(keys.get(i));
				pair.setValue(values.get(i));
				pairs.add(pair);

			}
		}
		return pairs;
	}



	public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException {
		/*
		DateTime startdate = new DateTime();
		DateTime enddate = new DateTime();
		startdate = startdate.minusDays(30);
		System.out.println( getRandomDate(startdate.toDate(), enddate.toDate()));
		System.out.println( getRandomDate(startdate.toDate(), enddate.toDate()));
		System.out.println( getRandomDate(startdate.toDate(), enddate.toDate()));
		System.out.println( getRandomDate(startdate.toDate(), enddate.toDate()));
		System.out.println( getRandomDate(startdate.toDate(), enddate.toDate()));
		*/
		DateTime d = new DateTime().withDayOfMonth(1);;

		for( int i =0 ; i < 24; i ++){
			System.out.println(d.minusMonths(i));
		}

	}
}