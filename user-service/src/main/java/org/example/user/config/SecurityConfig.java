package org.example.user.config;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(request -> request.anyRequest().authenticated())
        .cors(cors -> cors.configurationSource(corsConfiguration()))
        .oauth2ResourceServer(resource -> resource.jwt(Customizer.withDefaults()));
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfiguration() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(singletonList("http://localhost:8081"));
    configuration.setAllowedMethods(asList("GET", "POST"));
    configuration.setAllowedHeaders(asList(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;

  }

}
