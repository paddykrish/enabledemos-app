package com.rcggs.enablefs.demo.service.controller;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rcggs.datalake.core.model.Message;



@RestController
public class WebSocketController {

	final Logger logger = Logger.getLogger(getClass());

	protected final static ObjectMapper mapper = new ObjectMapper();
	protected final static JsonFactory factory = mapper.getJsonFactory();

	protected final static ObjectWriter ow = new ObjectMapper().writer();
	

	@Autowired
	private SimpMessagingTemplate template;

	private void sendServiceTicketInfo(List<Object> paths) {
		template.convertAndSend("/topic/msg", paths);
	}

	@MessageMapping("/addmsg")
	public void complete(Object msg) throws Exception {
		List<Object> a = new ArrayList<Object>();
		a.add(msg);
			sendServiceTicketInfo(a);
	}


	@RequestMapping(value = "/updateInterface/", method = RequestMethod.POST  )
	public boolean updateInterfaceViaPost(@RequestBody Message message ) {
		System.out.println("Incoming message " + message);
		try {
			complete(message.getMessage());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@RequestMapping(value = "/getMetrics/{name}", method = RequestMethod.GET)
	public String getMetrics(@PathVariable String name) {
		System.out.println("inside getMetrics");
		return null;
	}

	@RequestMapping(value = "/updateMetric", method = RequestMethod.POST)
	public boolean updateMetric(@RequestBody String data) {
		return false;
	}
}