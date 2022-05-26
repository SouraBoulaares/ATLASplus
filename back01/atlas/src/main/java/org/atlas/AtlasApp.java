package org.atlas;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class AtlasApp implements CommandLineRunner {
	private static final Logger logger = LoggerFactory.getLogger(AtlasApp.class);

	public static void main(String[] args) {
		SpringApplication.run(AtlasApp.class, args);
		logger.info("------------ The atlas server was sucessuflly started ---");
	}

	@Override
	public void run(String... arg0) throws Exception {
	}

	@Bean
	public ModelMapper modelMapper() {
		final ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}

	@Bean
	public CommandLineRunner loadData() {
		return args -> {
		};
	}

}
