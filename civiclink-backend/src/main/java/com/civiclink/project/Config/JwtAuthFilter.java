package com.civiclink.project.Config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.*;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try{
                if (jwtUtil.validateToken(token)) {
                    Claims claims = jwtUtil.getClaims(token);

                    String aadharNumber = claims.getSubject();
                    String role = claims.get("role", String.class);

                    List<SimpleGrantedAuthority> authorities =
                            List.of(new SimpleGrantedAuthority(role));
                    System.out.println("Authorities: " + authorities);


                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(aadharNumber, null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }catch(Exception e) {
                // Token is invalid or expired
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                response.getWriter().write("Invalid or expired token");
                return; // Stop filter chain
            }
        }

        filterChain.doFilter(request, response);
    }
}

