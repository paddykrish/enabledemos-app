package com.rcggs.enablefs.demo.service.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.xml.parsers.ParserConfigurationException;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.xml.sax.SAXException;

import com.rcggs.datalake.notification.NotificationService;
import com.rcggs.datalake.notification.SMSNotificationService;

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
	String[] lowrisk = new String[] {"AL",  "OR",  "IL", "KY", "KS", "AR",  "MI"};
	String[] mediumRisk = new String[] {"WA",  "ID",  "NV", "NM", "NH", "VT", "TN",  "MT"};
	String[] highRisk = new String[] {"CA",  "TX",  "FL", "MN", "VA" , "NC"};
	String[] veryHighRisk = new String[] {"PA",  "NJ",  "NY", "CT", "SC", "GA"};

	final static RestTemplate restTemplate = new RestTemplate();

	public Date getRandomDate(Date from, Date to) {
		double d = from.getTime() + Math.random() * (to.getTime() - from.getTime());
		return new Date(  (long)d );
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

	@RequestMapping(value = "/getStatistics/{name}", method = RequestMethod.GET)
	public String getStatistics(@PathVariable String name) {
		Map<String, Map<String, Float>> overall = new LinkedHashMap<String, Map<String, Float>>();
		Map<String, Float> stats = new LinkedHashMap<String, Float>();
		try {
			float policyissued = 0f;
			float premium = 0;
			int totalpolicy = 0;
			int averageprocesshrs = 0;
			for (Quote q :  dataloader.loadAllLocations()){
				DateTime t = DateTime.now().minusDays(1);
				if ( q.getQuoteResponseDate().after(t.toDate()) ) {
					if (q.getCurrentstep().equals("Quote Delivery")) {
						policyissued += 1.0f;
						premium += q.getAnnualpremium();
						averageprocesshrs += ((q.getQuoteResponseDate().getTime() - q.getQuoteRequestDate().getTime() ) / (60 * 60 * 1000));
					}
					totalpolicy += 1;
				}
			}

			stats.put("averageProcessingDays", Float.parseFloat(tinyDFormat.format(( averageprocesshrs/policyissued)/24.0)));
			stats.put("policiesIssuedToday", policyissued);
			stats.put("totalPremiumIssuedToday", Float.parseFloat(dFormat.format(premium)));
			stats.put("veryHighRiskLossRatio", 84f);
			stats.put("veryHighRiskTotalExposure", 53875f);
			overall.put("statisticsData", stats);
			return ow.writeValueAsString(overall);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	@RequestMapping(value = "/getTop10ActiveQuotes/{name}", method = RequestMethod.GET)
	public String getTop10ActiveQuotes(@PathVariable String name) {
		Map<String, List<Quote>> overall = new LinkedHashMap<String, List<Quote>>();
		List<Quote> stats = new LinkedList<Quote>();
		List<Quote> alllocations = dataloader.loadAllLocations();

		BeanComparator fieldComparator = new BeanComparator( "annualpremium");
		Collections.sort(alllocations, fieldComparator);

		try {
			for (int i = alllocations.size()-1; i > alllocations.size()-11; i--) {
				stats.add( alllocations.get(i));
			}
			overall.put("annual_premiums", stats);
			return ow.writeValueAsString(overall);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getChildTypeRenewalData/{name}", method = RequestMethod.GET)
	public String getChildTypeRenewalData(@PathVariable String name) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("MM/dd/yy");
		String compancode = "WM";
		if (!name.equals("all")){
			compancode = name;
		}
		System.out.println("Company code is " + compancode);
		JSONObject mainobj = new JSONObject();
		JSONArray list = new JSONArray();
		try {
			int i = 0;
			for (Quote q : dataloader.loadAllLocations()){
				if (!q.getCompanyid().equals(compancode)){
					continue;
				}
				if (!q.getQuoteType().equals("NBA")){
					continue;
				}
				JSONObject item = new JSONObject();
				item.put("quote_request_date", fmt.print( q.getQuoteRequestDate().getTime()));
				item.put("annual_premium", (int)q.getAnnualpremium());
				item.put("quote_sent_date", fmt.print( q.getQuoteResponseDate().getTime()));
				item.put("underwriter", q.getUnderwriter());
				list.put(item);
				if ( i ++ > 10){
					break;
				}
			}
			mainobj.put("results", list);
			return mainobj.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@RequestMapping(value = "/getClaimsPremiumData/{name}", method = RequestMethod.GET)
	public String getClaimsPremiumData(@PathVariable String name) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("mm/dd/yyyy");
		int claimcount = 250;
		String compancode = "WM";
		if (!name.equals("all")){
			compancode = name;
		}
		JSONArray mainlist = new JSONArray();
		try {
			float premiumamt = 0.0f;
			List<Quote> quotes = dataloader.loadAllLocations();
			int quotecount = 0;
			for (Quote q : quotes){
				if (!q.getCompanyid().equals(compancode)){
					continue;
				}
				quotecount ++;
				premiumamt+= q.getAnnualpremium();
			}
			float avgpremiumamt = premiumamt / quotecount;

			DateTime d = new DateTime().withDayOfMonth(1);;
			JSONArray claimArray = new JSONArray();
			JSONArray premiumArray = new JSONArray();

			for( int i =0 ; i < 24; i ++){
				JSONArray c = new JSONArray();
				JSONArray p = new JSONArray();

				c.put( d.minusMonths(i).getMillis());
				c.put( claimcount + rand.nextInt(500));

				p.put( d.minusMonths(i).getMillis());
				p.put( premiumamt + rand.nextInt(500)*avgpremiumamt);
				claimArray.put(c);
				premiumArray.put(p);
			}
			JSONObject claim = new JSONObject();
			claim.put("key", "Claims");
			claim.put("color", "#0f0");
			claim.put("values", claimArray);

			JSONObject premium = new JSONObject();
			premium.put("key", "Premium");
			premium.put("color", "#000");
			premium.put("values", premiumArray);
			mainlist.put( claim );
			mainlist.put( premium );

			return mainlist.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}



	@RequestMapping(value = "/getLostRatioHistoryData/{name}", method = RequestMethod.GET)
	public String getLostRatioHistoryData(@PathVariable String name) {
		DateTimeFormatter fmt = DateTimeFormat.forPattern("mm/dd/yyyy");
		int claimcount = 250;
		String compancode = "WM";
		if (!name.equals("all")){
			compancode = name;
		}

		long claim_number = 74927274579l;
		long policy_number = 347154874l;

		JSONObject mainobj = new JSONObject();
		JSONArray list = new JSONArray();
		try {
			float premiumamt = 0.0f;
			List<Quote> quotes = dataloader.loadAllLocations();
			int quotecount = 0;
			for (Quote q : quotes){
				if (!q.getCompanyid().equals(compancode)){
					continue;
				}
				if (!q.getQuoteType().equals("NBA")){
					continue;
				}
				int claimamt = 28232 + rand.nextInt(128999);
				JSONObject item = new JSONObject();
				item.put("claim_number", claim_number+ rand.nextInt(234533) );
				item.put("policy_number", policy_number + rand.nextInt(234533));
				DateTime d = new DateTime(q.getQuoteRequestDate());
				item.put("date", getRandomDate( d.minusDays( 60 + rand.nextInt(365)).toDate(),  q.getQuoteRequestDate()));
				item.put("claim_amount", claimamt);
				String tokens[] = q.getLobs().split(",");
				item.put("lob", tokens[ rand.nextInt(tokens.length)]);
				item.put("limit", q.getCoverageAmount());
				item.put("loss_ratio", (claimamt/q.getAnnualpremium()*2)*100);
				list.put(item);
				if( quotecount++ > 10){
					break;
				}
			}
			mainobj.put("results", list);
			return mainobj.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}



	@RequestMapping(value = "/getLocations/{name}", method = RequestMethod.GET)
	public String getLocations(@PathVariable String name) {
		JSONObject mainobj = new JSONObject();
		String compancode = "WM";
		if (!name.equals("all")){
			compancode = name;
		}
		JSONArray list = new JSONArray();
		int count = 0;
		for ( Quote  q : dataloader.loadAllLocations()){

			JSONArray item = new JSONArray();
			if ( q.getCompanyid().equals(compancode)) {
				item.put(q.getLatitude());
				item.put(q.getLongitude());
				item.put(1 + rand.nextInt(4));
				list.put(item);
				count ++;
			}
			if (count > 1000){
				break;
			}
		}
		mainobj.put("coordinates", list);
		return mainobj.toString();

	}

		@RequestMapping(value = "/getLossRatioSummary/{name}", method = RequestMethod.GET)
	public String getLossRatioSummary(@PathVariable String name) {
		String compancode = "WM";
		if (!name.equals("all")){
			compancode = name;
		}

		int percent = 20;
		if( compancode.equals("WM")){
			percent = 20;
		} else if( compancode.equals("CVS")){
			percent = 25;
		} else if( compancode.equals("VNB")){
			percent = 28;
		}
		JSONObject  mainobj = new JSONObject();
		DateTime dt = new DateTime();
		JSONArray list = new JSONArray();
		DateFormat df = new SimpleDateFormat("MM/dd");

		for ( int i = 0; i < 5; i++){
			JSONObject item = new JSONObject();
			item.put("date", df.format(dt.minusMonths(i).toDate()));
			item.put("percent", percent + rand.nextInt(21));
			list.put(item);
		}

		mainobj.put("lossRatioSummary", list);
		return mainobj.toString();

	}

	@RequestMapping(value = "/getCompanies/{name}", method = RequestMethod.GET)
	public String getCompanies(@PathVariable String name) {
		JSONArray list = new JSONArray();
		JSONObject c1 = new JSONObject();
		c1.put("name","Wal-Mart");
		c1.put("code","WM");
		list.put(c1);

		JSONObject c2 = new JSONObject();
		c2.put("name","CVS");
		c2.put("code","CVS");
		list.put(c2);

		JSONObject c3 = new JSONObject();
		c3.put("name","Valley National Bank");
		c3.put("code","VNB");
		list.put(c3);
		JSONObject main = new JSONObject();
		main.put("companies", list);
		return list.toString();
	}

	@RequestMapping(value = "/getClientData/{name}", method = RequestMethod.GET)
	public String getClientData(@PathVariable String name) {
		JSONObject mainobj = new JSONObject();
		JSONObject c1 = new JSONObject();
		c1.put("policyType", "Renewal");
		c1.put("policyTerm", "1 Year");
		c1.put("numPriorPolicies", 5);
		c1.put("numQuotesSent", 234);
		mainobj.put("clientData", c1);
		return mainobj.toString();
	}

	@RequestMapping(value = "/getLocationRiskAssessmentData/{name}", method = RequestMethod.GET)
	public String getLocationRiskAssessmentData(@PathVariable String name) {
		String compancode = "WM";
		if (!name.equals("all")) {
			compancode = name;
		}

		int reccount = 0;
		JSONArray list = new JSONArray();
		for (Quote q : dataloader.loadAllLocations()) {
			if (!q.getCompanyid().equals(compancode)) {
				continue;
			}
			JSONObject row = new JSONObject();
			row.put("address", q.getAddress());
			row.put("city", q.getCity());
			row.put("state", q.getState());
			row.put("zip", q.getZipcode());
			row.put("fire", q.getFireRisk());
			row.put("earthquake", q.getEarthquakeRisk());
			row.put("flood", q.getFloodRisk());
			row.put("hail", q.getHailRisk());
			row.put("windstorm", q.getWindstromRisk());
			row.put("crime", q.getCrimeRisk());
			double avg = (q.getFireRisk() + q.getEarthquakeRisk() +  q.getFloodRisk() + q.getHailRisk() + q.getWindstromRisk() + q.getCrimeRisk())/6.0;
			if (avg < 5.0){
				row.put("risk", "low");
			} else if ( avg >=5.0 && avg <= 7.5){
				row.put("risk", "Medium");
			} else {
				row.put("risk", "High");
			}
			row.put("locationId", q.getLocationId());
			row.put("buildingId", q.getLocationId());
			list.put(row);
			reccount ++;
			if (reccount > 10){
				break;
			}
		}
		return list.toString();

	}

	@RequestMapping(value = "/getRiskFactors/{name}", method = RequestMethod.GET)
	public String getRiskFactors(@PathVariable String name) {
		HashMap<String, Float> riskfactor = new HashMap<String, Float>();
		String compancode = "WM";
		if (!name.equals("all")){
			compancode = name;
		}
		riskfactor.put("Crime", 0.0f);
		riskfactor.put("Hail Risk", 0.0f);
		riskfactor.put("Fire Risk", 0.0f);
		riskfactor.put("Flood Risk", 0.0f);
		riskfactor.put("Earthquake Risk", 0.0f);
		riskfactor.put("Windstorm Risk", 0.0f);
		int reccount = 0;
		for (Quote q : dataloader.loadAllLocations()) {
			if (!q.getCompanyid().equals(compancode)){
				continue;
			}
			riskfactor.put("Crime", riskfactor.get("Crime") + q.getCrimeRisk());
			riskfactor.put("Hail Risk", riskfactor.get("Hail Risk") + q.getHailRisk());
			riskfactor.put("Fire Risk", riskfactor.get("Fire Risk") + q.getFireRisk());
			riskfactor.put("Flood Risk", riskfactor.get("Flood Risk") + q.getFloodRisk());
			riskfactor.put("Earthquake Risk", riskfactor.get("Earthquake Risk") + q.getEarthquakeRisk());
			riskfactor.put("Windstorm Risk", riskfactor.get("Windstorm Risk") + q.getWindstromRisk());
			reccount += 1;
		}
		JSONObject mainobj = new JSONObject();
		JSONArray list = new JSONArray();
		for(String riskname : riskfactor.keySet()){
			JSONObject item1 = new JSONObject();
			item1.put("risk", riskname);
			float v = Float.parseFloat(tinyDFormat.format( riskfactor.get(riskname)/reccount) );
			item1.put("grade", tinyDFormat.format( riskfactor.get(riskname)/reccount) );
			System.out.println(riskfactor.get(riskname)/reccount + "  ||| "  + Float.parseFloat(tinyDFormat.format( riskfactor.get(riskname)/reccount) ));
			list.put( item1);
		}
		mainobj.put("riskGrade", list);
		return mainobj.toString();

	}

	@RequestMapping(value = "/getStatusBreakdown/{name}", method = RequestMethod.GET)
	public String getStatusBreakdown(@PathVariable String name) {
		Map<String, Map<String, Float>> overall = new LinkedHashMap<String, Map<String, Float>>();
		Map<String, Float> stats = new LinkedHashMap<String, Float>();
		HashMap<String, Integer> status = new HashMap<String, Integer>();
		for (Quote q : dataloader.loadAllLocations()){
			if( status.containsKey(q.getCurrentstep())){
				status.put(q.getCurrentstep(), status.get(q.getCurrentstep()) + 1);
			} else {
				status.put(q.getCurrentstep(), 1);
			}
		}

		try {
			stats.put("submission", Float.valueOf(status.get("Submission")));
			stats.put("verification", Float.valueOf(status.get("Verification")));
			stats.put("rating", Float.valueOf(status.get("Rating")));
			stats.put("quotePrep", Float.valueOf(status.get("Quote prep")));
			stats.put("quoteDelivery", Float.valueOf(status.get("Quote Delivery")));
			overall.put("quoteStatusData", stats);
			return ow.writeValueAsString(overall);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	@RequestMapping(value = "/getQuotesByRiskClient/{name}", method = RequestMethod.GET)
	public String getQuotesByRiskClient(@PathVariable String name) {
		JSONArray list = new JSONArray();
		HashMap<String, Integer> riskcount = new HashMap<String, Integer>();

		ArrayList<String> lowriskList = new ArrayList<String>(Arrays.asList(lowrisk));
		ArrayList<String> mediumRiskList = new ArrayList<String>(Arrays.asList(mediumRisk));
		ArrayList<String> highRiskList = new ArrayList<String>(Arrays.asList(highRisk));
		ArrayList<String> veryHighRiskList = new ArrayList<String>(Arrays.asList(veryHighRisk));

		riskcount.put("lowRisk", 0);
		riskcount.put("mediumRisk", 0);
		riskcount.put("highRisk", 0);
		riskcount.put("veryHighRisk", 0);

		HashMap<String, Integer> stepcount = new HashMap<String, Integer>();
		stepcount.put("preparation", 0);
		stepcount.put("verification", 0);
		stepcount.put("rating", 0);
		stepcount.put("submission", 0);
		stepcount.put("delivery", 0);
		for (Quote q : dataloader.loadAllLocations()) {

			if( lowriskList.contains(q.getState())){
				riskcount.put("lowRisk" , riskcount.get("lowRisk") + 1);
			} else if(mediumRiskList.contains(q.getState())){
				riskcount.put("mediumRisk" , riskcount.get("mediumRisk") + 1);
			} else if(highRiskList.contains(q.getState())){
				riskcount.put("highRisk" , riskcount.get("highRisk") + 1);
			} else if(veryHighRiskList.contains(q.getState())){
				riskcount.put("veryHighRisk" , riskcount.get("veryHighRisk") + 1);
			}
			if(veryHighRiskList.contains(q.getState())) {
				if(q.getCurrentstep().equals("Quote prep")){
					stepcount.put("preparation" , stepcount.get("preparation") + 1);
				} else if(q.getCurrentstep().equals("Verification")){
					stepcount.put("verification" , stepcount.get("verification") + 1);
				} else if(q.getCurrentstep().equals("Rating")){
					stepcount.put("rating" , stepcount.get("rating") + 1);
				} else if(q.getCurrentstep().equals("Submission")){
					stepcount.put("submission" , stepcount.get("submission") + 1);
				} else if(q.getCurrentstep().equals("Quote Delivery")){
					stepcount.put("delivery" , stepcount.get("delivery") + 1);
				}
			}
		}
		JSONObject mainobj = new JSONObject();

		JSONObject item1 = new JSONObject();
		item1.put("lowRisk", riskcount.get("lowRisk"));
		item1.put("mediumRisk", riskcount.get("mediumRisk"));
		item1.put("highRisk", riskcount.get("highRisk"));
		item1.put("veryHighRisk", riskcount.get("veryHighRisk"));
		mainobj.put("quotesByRiskClient", item1 );

		JSONObject item2 = new JSONObject();
		item2.put("preparation", stepcount.get("preparation"));
		item2.put("verification", stepcount.get("verification"));
		item2.put("rating", stepcount.get("rating"));
		item2.put("submission", stepcount.get("submission"));
		item2.put("delivery", stepcount.get("delivery"));
		mainobj.put("highRiskQuotesStep", item2 );

		return mainobj.toString();
	}
	@RequestMapping(value = "/getLOBCounts/{name}", method = RequestMethod.GET)
	public String getLOBCounts(@PathVariable String name) {
		JSONArray list = new JSONArray();
		HashMap<String, Integer> status = new HashMap<String, Integer>();
		for (Quote q : dataloader.loadAllLocations()){
			for (String lob : q.getLobs().split(",")) {
				if (status.containsKey(lob.trim())) {
					status.put(lob.trim(), status.get(lob.trim()) + 1);
				} else {
					status.put(lob.trim(), 1);
				}
			}
		}

		HashMap<String , String> labels = new HashMap<String , String>();
		labels.put("BO", "Business Owners,026C38");
		labels.put("CP", "Commercial Property,yellow");
		labels.put("GL", "General Liability,#003366");
		labels.put("WC", "Workers Compensation,#DA5C0A");
		labels.put("CR", "Crime,#ff0000");
		labels.put("DF", "Dwelling Fire,orange");
		labels.put("MM", "Medical Malpractice,white");

		for( String lob : status.keySet()) {
			JSONObject item = new JSONObject();

			String label[] = labels.get(lob.trim()).split(",");
			item.put("key", label[0]);
			item.put("color", label[1]);
			JSONArray timeseries = new JSONArray();
			JSONArray t1 = new JSONArray();
			t1.put(1482933600000l);
			t1.put(status.get(lob) - 50);

			JSONArray t2 = new JSONArray();
			t2.put(1482937200000l);
			t2.put(status.get(lob) - 25);

			JSONArray t3 = new JSONArray();
			t3.put(1482940800000l);
			t3.put(status.get(lob) );

			timeseries.put(t1);
			timeseries.put(t2);
			timeseries.put(t3);

			item.put("values", timeseries);
			list.put(item);
		}
		try {
			return list.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	@RequestMapping(value = "/increment/{batchsize}", method = RequestMethod.GET)
	public String increment(@PathVariable String batchsize)
			throws JsonGenerationException, JsonMappingException, IOException {
		try{
			dataloader.increment(Integer.parseInt(batchsize));
		}
		catch (Exception e){
			dataloader.increment(10);
		}
		//Map<String, Float> stats = new LinkedHashMap<String, Float>();
		HashMap<String, Integer> status = new HashMap<String, Integer>();
		HashMap<String, Integer> riskcount = new HashMap<String, Integer>();
		HashMap<String, Integer> stepcount = new HashMap<String, Integer>();

		ArrayList<String> lowriskList = new ArrayList<String>(Arrays.asList(lowrisk));
		ArrayList<String> mediumRiskList = new ArrayList<String>(Arrays.asList(mediumRisk));
		ArrayList<String> highRiskList = new ArrayList<String>(Arrays.asList(highRisk));
		ArrayList<String> veryHighRiskList = new ArrayList<String>(Arrays.asList(veryHighRisk));

		riskcount.put("lowRisk", 0);
		riskcount.put("mediumRisk", 0);
		riskcount.put("highRisk", 0);
		riskcount.put("veryHighRisk", 0);

		stepcount.put("preparation", 0);
		stepcount.put("verification", 0);
		stepcount.put("rating", 0);
		stepcount.put("submission", 0);
		stepcount.put("delivery", 0);



		try {

				float policyissued = 0f;
				float premium = 0;
				int averageprocesshrs = 0;
			for (Quote q :  dataloader.loadAllLocations()){
				DateTime t = DateTime.now().minusDays(1);
				if ( q.getQuoteResponseDate().after(t.toDate()) ) {
					if (q.getCurrentstep().equals("Quote Delivery")) {
						policyissued += 1.0f;
						premium += q.getAnnualpremium();
						averageprocesshrs += ((q.getQuoteResponseDate().getTime() - q.getQuoteRequestDate().getTime() ) / (60 * 60 * 1000));
					}
				}
				if( status.containsKey(q.getCurrentstep())){
					status.put(q.getCurrentstep(), status.get(q.getCurrentstep()) + 1);
				} else {
					status.put(q.getCurrentstep(), 1);
				}
				if( lowriskList.contains(q.getState())){
					riskcount.put("lowRisk" , riskcount.get("lowRisk") + 1);
				} else if(mediumRiskList.contains(q.getState())){
					riskcount.put("mediumRisk" , riskcount.get("mediumRisk") + 1);
				} else if(highRiskList.contains(q.getState())){
					riskcount.put("highRisk" , riskcount.get("highRisk") + 1);
				} else if(veryHighRiskList.contains(q.getState())){
					riskcount.put("veryHighRisk" , riskcount.get("veryHighRisk") + 1);
				}
				if(veryHighRiskList.contains(q.getState())) {
					if(q.getCurrentstep().equals("Quote prep")){
						stepcount.put("preparation" , stepcount.get("preparation") + 1);
					} else if(q.getCurrentstep().equals("Verification")){
						stepcount.put("verification" , stepcount.get("verification") + 1);
					} else if(q.getCurrentstep().equals("Rating")){
						stepcount.put("rating" , stepcount.get("rating") + 1);
					} else if(q.getCurrentstep().equals("Submission")){
						stepcount.put("submission" , stepcount.get("submission") + 1);
					} else if(q.getCurrentstep().equals("Quote Delivery")){
						stepcount.put("delivery" , stepcount.get("delivery") + 1);
					}
				}
			}

			JSONObject mainobj = new JSONObject();
			mainobj.put("id", "1");
			mainobj.put("type", "2");
			JSONObject stats= new JSONObject();
			JSONObject item1 = new JSONObject();

			item1.put("averageProcessingDays", tinyDFormat.format(( averageprocesshrs/policyissued)/24.0));
			item1.put("policiesIssuedToday", policyissued);
			item1.put("totalPremiumIssuedToday", dFormat.format(premium));
			stats.put("statisticsData", item1);

			JSONObject item2 = new JSONObject();

			item2.put("submission", status.get("Submission"));
			item2.put("verification", status.get("Verification"));
			item2.put("rating", status.get("Rating"));
			item2.put("quotePrep", status.get("Quote prep"));
			item2.put("quoteDelivery", status.get("Quote Delivery"));
			stats.put("quoteStatusData", item2);

			JSONObject item3 = new JSONObject();
			item3.put("lowRisk", riskcount.get("lowRisk"));
			item3.put("mediumRisk", riskcount.get("mediumRisk"));
			item3.put("highRisk", riskcount.get("highRisk"));
			item3.put("veryHighRisk", riskcount.get("veryHighRisk"));
			stats.put("quotesByRisk", item3);

			JSONObject item4 = new JSONObject();

			item4.put("preparation", stepcount.get("preparation"));
			item4.put("verification", stepcount.get("verification"));
			item4.put("rating", stepcount.get("rating"));
			item4.put("submission", stepcount.get("submission"));
			item4.put("delivery", stepcount.get("delivery"));
			stats.put("quotesBySteps", item4);


			JSONArray top10quotes = new JSONArray();
			List<Quote> alllocations = dataloader.loadAllLocations();

			BeanComparator fieldComparator = new BeanComparator( "annualpremium");
			Collections.sort(alllocations, fieldComparator);
			for (int i = alllocations.size() - 1; i > alllocations.size() - 11; i--) {
				JSONObject qt = new JSONObject();
				qt.put("quote", alllocations.get(i).getQuote());
				qt.put("company", alllocations.get(i).getCompany());
				qt.put("annualpremium", alllocations.get(i).getAnnualpremium());
				qt.put("completion", alllocations.get(i).getCompletion());
				qt.put("currentstep", alllocations.get(i).getCurrentstep());
				qt.put("underwriter", alllocations.get(i).getUnderwriter());
				qt.put("riskclass", alllocations.get(i).getRiskclass());
				top10quotes.put( qt);
			}
			stats.put("annual_premiums", top10quotes);
			mainobj.put("message", stats.toString());
				LOG.info(mainobj.toString());
				String url = "http://localhost:8080/enableinsurance/service/updateInterface/";
				RecordGenerator.postMessage(url, mainobj.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Incremented " + batchsize + " rows";
	}



	@RequestMapping(value = "/getUserPrefs/{name}", method = RequestMethod.GET)
	public String getUserPrefs(@PathVariable String name)
			throws JsonGenerationException, JsonMappingException, IOException {

		Map<String, String> userData = new LinkedHashMap<String, String>();
		try {
			Connection conn = phoenixDriver.connect("jdbc:phoenix:node4.rcggs.com:2181:/hbase-unsecure",
					new Properties());
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(
					"select customers.contactname, u.prefs from user_prefs u join customers on customers.CustomerID = u.CustomerID where u.CustomerID='761'");
			while (rs.next()) {
				userData.put("name", rs.getString(1));
				userData.put("prefs", rs.getString(2));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ow.writeValueAsString(userData);
	}


	@RequestMapping(value = "/logger/{name}", method = RequestMethod.GET)
	public String logger(@PathVariable String name) {

		StringBuilder s = new StringBuilder();
		try {
			Process p = Runtime.getRuntime().exec("tail -20 /tmp/out.log");
			java.io.BufferedReader input = new java.io.BufferedReader(
					new java.io.InputStreamReader(p.getInputStream()));
			String line = null;

			while ((line = input.readLine()) != null) {
				s.append(line + '\n');
			}
		} catch (java.io.IOException e) {
			e.printStackTrace();
		}
		return s.toString();

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