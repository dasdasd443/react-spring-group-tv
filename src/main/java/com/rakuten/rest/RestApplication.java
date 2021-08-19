package com.rakuten.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RestApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestApplication.class, args);
	}

	@GetMapping("/")
	public String home(){
		return "Hello world";
	}

	@EnableWebSecurity
	@Configuration
	class WebSecurityConfig extends WebSecurityConfigurerAdapter{
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.csrf().disable()
				.authorizeRequests()
					.antMatchers( "/api/user/oauthenticate").permitAll()
					.antMatchers(HttpMethod.POST, "/api/user/**").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/user/get-user/**").permitAll()
				.antMatchers(HttpMethod.GET, "/api/category/**").permitAll()
				.antMatchers(HttpMethod.GET, "/product/get-image/**").permitAll()
        .antMatchers(HttpMethod.GET, "/product/all").permitAll()
				.antMatchers(HttpMethod.GET, "/product/**").permitAll()
				.anyRequest().authenticated().and().csrf().disable();
				.anyRequest().authenticated().and().sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			http.addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
			http.cors().and();

		}
	}

}
