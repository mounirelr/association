package ma.association.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.AbstractSecurityBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig   {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(
                auth-> auth.requestMatchers("/register").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/users").permitAll()
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/updateUser").permitAll()
                        .requestMatchers("/updateUser/**").permitAll()
                        .requestMatchers("/addEvent").permitAll()
                        .requestMatchers("/events").permitAll()
                        .requestMatchers("/events/**").permitAll()
                        .requestMatchers("/eventsParticipant/**").permitAll()
                        .requestMatchers("updateEvent").permitAll()
                        .requestMatchers("/disscutions").permitAll()
                        .requestMatchers("/addMessage").permitAll()
                        .requestMatchers("/deleteMessageDisscution/**").permitAll()
                        .requestMatchers("/updateMessageDisscution/**").permitAll()
                        .requestMatchers("/deleteDisscution/**").permitAll()
                        .requestMatchers("/addDisscution").permitAll()
                        .requestMatchers("/deleteEvent/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .anyRequest().authenticated()
        ).httpBasic(Customizer.withDefaults()).build();
    }

    // Add this bean to configure CORS properly
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}