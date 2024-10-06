package com.project_14.OnlineBankingSystem.service;
import com.project_14.OnlineBankingSystem.repo.CustomerRepo;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;
import java.util.Random;
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@Getter
@Setter
@NoArgsConstructor(force = true)
@ToString
@Service
public class OTPService {

    private String otp;

    public String generateOTP() {
        System.out.println("Hi, I am OTP Method...!!");
        StringBuilder otp = new StringBuilder(6);
        Random randomNumber = new Random();
        for(int i=1;i<7;i++) {
            int randomIntBounded = randomNumber.nextInt(9);
            otp.append(randomIntBounded);
        }
        return otp.toString();
    }

    public String verifyOTP(String otpToVerify, HttpSession httpSession) {
        String sessionOTP = (String) httpSession.getAttribute("OTP");
        System.out.println("OTP from user: " + otpToVerify);
        System.out.println("OTP from session: " + sessionOTP);
        if (sessionOTP == null) {
            return "OTP not found in session.";
        }
        System.out.println(otpToVerify.equals(sessionOTP));
            if(otpToVerify.equals(sessionOTP)) {
                return "VERIFIED";
            }else{
                return "INVALID OTP";
            }
    }
}