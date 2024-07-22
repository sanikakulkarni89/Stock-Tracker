package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping(path="/")
	public String hello(){
		return "Hello World";
	}


	@GetMapping(path="/autocomplete/{autostr}")
	@CrossOrigin
	public List autocomplete(@PathVariable("autostr") String str)
	{
//		https://api.tiingo.com/tiingo/utilities/search/warn

		String url = "https://api.tiingo.com/tiingo/utilities/search?query=" + str + "&token=f050e007f67a191a8998b299dbf8a5a186e948d2";
		System.out.println("-----------------------" + url);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
		String apiResponse = response.getBody();
		System.out.println(apiResponse);

		return List.of(new String[]{apiResponse});
	}



	@GetMapping(path="/ticker/{tickerID}")
	@CrossOrigin
	public String tickerInfo(@PathVariable("tickerID") String str)
	{
		String url = "https://api.tiingo.com/tiingo/daily/" + str + "?token=f050e007f67a191a8998b299dbf8a5a186e948d2";
		System.out.println("-----------------------" + url);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
		String apiResponse = response.getBody();
		System.out.println(apiResponse);


//		return apiResponse;

		if (str.equals("NVDA"))
			return "{\"dup\":\"true\",\"ticker\": \"NVDA\",\"name\": \"NVIDIA Corp\",\"description\": \"Since its founding in 1993, NVIDIA has been a pioneer in accelerated computing. The company’s invention of the GPU in 1999 sparked the growth of the PC gaming market, redefined computer graphics, ignited the era of modern AI and is fueling the creation of the industrial metaverse. NVIDIA is now a full-stack computing company with data-center-scale offerings that are reshaping industry.\",\"startDate\": \"1999-01-22\",\"endDate\": \"2023-07-20\",\"exchangeCode\": \"NASDAQ\"}";

		return "{\"ticker\": \"WMG\", \"name\": \"Warner Music Group Corp - Class A\", \"description\": \"With a legacy extending back over 200 years, Warner Music Group (WMG) today brings together artists, songwriters, and entrepreneurs that are moving entertainment culture across the globe. Operating in more than 70 countries through a network of affiliates and licensees, WMG's Recorded Music division includes renowned labels such as 300 Entertainment, Asylum, Atlantic, Big Beat, Canvasback, Elektra, Erato, First Night, Fueled by Ramen, Nonesuch, Parlophone, Reprise, Rhino, Roadrunner, Sire, Spinnin', Warner Records, Warner Classics, and Warner Music Nashville. WMG's music publishing arm, Warner Chappell Music, has a catalog of over one million copyrights spanning every musical genre, from the standards of the Great American Songbook to the biggest hits of the 21st century. Warner Music Group is also home to ADA, the independent artist and label services company – as well as next gen artist services division WMX, which includes consumer brands such as Songkick, the live music app; EMP, the merchandise e-tailer; UPROXX, the youth culture destination; and HipHopDX, the hip-hop music news site. In addition, WMG counts storytelling powerhouse Warner Music Entertainment and social media content creator IMGN among its many brands. Follow WMG on Instagram, Twitter, LinkedIn, and Facebook. About TikTok TikTok is the leading destination for short-form mobile video. Our mission is to inspire creativity and bring joy. TikTok's global headquarters are in Los Angeles and Singapore, and its offices include New York, London, Dublin, Paris, Berlin, Dubai, Jakarta, Seoul, and Tokyo.\",\"startDate\": \"2020-06-03\",\"endDate\": \"2023-07-21\",\"exchangeCode\": \"NASDAQ\" }";
	}


	@GetMapping(path="/iex/{tickerID}")
	@CrossOrigin
	public String iexInfo(@PathVariable("tickerID") String str) {

		String url = "https://api.tiingo.com/iex/" + str + "?token=f050e007f67a191a8998b299dbf8a5a186e948d2";
		System.out.println("-----------------------" + url);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
		String apiResponse = response.getBody();
		System.out.println(apiResponse);

		return apiResponse;

//		return "[\n" +
//				"    {\n" +
//				"        \"ticker\": \"NVDA\",\n" +
//				"		\"dup\":\"true\",\n" +
//				"        \"timestamp\": \"2023-07-19T20:00:00+00:00\",\n" +
//				"        \"lastSaleTimestamp\": \"2023-07-19T20:00:00+00:00\",\n" +
//				"        \"quoteTimestamp\": \"2023-07-19T20:00:00+00:00\",\n" +
//				"        \"open\": 474.64,\n" +
//				"        \"high\": 478.18,\n" +
//				"        \"low\": 467.42,\n" +
//				"        \"mid\": null,\n" +
//				"        \"tngoLast\": 470.77,\n" +
//				"        \"last\": 470.77,\n" +
//				"        \"lastSize\": null,\n" +
//				"        \"bidSize\": null,\n" +
//				"        \"bidPrice\": null,\n" +
//				"        \"askPrice\": null,\n" +
//				"        \"askSize\": null,\n" +
//				"        \"volume\": 42069500,\n" +
//				"        \"prevClose\": 474.94\n" +
//				"    }\n" +
//				"]";
	}


	@GetMapping(path="/dailyChart/{tickerID}")
	@CrossOrigin
	public String dailyChartInfo(@PathVariable("tickerID") String str) {

//		&endDate=2023-07-03&
		String url = "https://api.tiingo.com/iex/" + str + "/prices?startDate=2023-07-21&resampleFreq=10min&token=f050e007f67a191a8998b299dbf8a5a186e948d2";
		System.out.println("-----------------------" + url);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
		String apiResponse = response.getBody();
		System.out.println(apiResponse);

		return apiResponse;

	}



	@GetMapping(path="/news/{tickerID}")
	@CrossOrigin
	public String newsInfo(@PathVariable("tickerID") String str) {

		String url = "https://newsapi.org/v2/everything?apiKey=05c66631271441d38577f1277dd3c846&q=" + str;
		System.out.println("-----------------------" + url);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
		String apiResponse = response.getBody();
		System.out.println(apiResponse);

		return apiResponse;

	}


}
