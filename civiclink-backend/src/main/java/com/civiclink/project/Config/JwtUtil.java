package com.civiclink.project.Config;

import com.civiclink.project.Entity.Resident;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "MySecretKeyForJWTGeneration1234567890"; // should be at least 256 bits
    private final long EXPIRATION_TIME = 1000 * 60 * 10;
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(Resident resident) {
        return Jwts.builder()
                .setSubject(resident.getAadharNumber())
                .claim("role","ROLE_"+resident.getRole().name())
                .claim("name", resident.getFullName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractAadhar(String token) {
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            return !claims.getExpiration().before(new Date());// check if expired
        } catch (JwtException e) {
            return false;
        }
    }

    protected Claims getClaims(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }
}
