package com.example.springboot;

import com.example.springboot.security.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().and()
                .cors().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/users/user").permitAll()
//                .antMatchers("/ws-message").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .csrf().disable()
//                .headers().frameOptions().disable()
        ;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {

        // Tell Spring to ignore securing the handshake endpoint. This allows the handshake to take place unauthenticated
        web.ignoring().antMatchers("/ws-message/**");

    }

    // Create an AuthenticationManager bean to Authenticate users in the ChannelInterceptor
    @Bean
    public AuthenticationManager authManager() throws Exception {

        return this.authenticationManager();

    }
}
