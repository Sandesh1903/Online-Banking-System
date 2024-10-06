package com.project_14.OnlineBankingSystem.service;

import com.project_14.OnlineBankingSystem.dto.CustomerDTO;
import jakarta.mail.MessagingException;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
@ToString

@Service
public class MailService {
    private String subject;
    private String body;
    private String attachment;
    private String to;
    private String receiverName;

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail() throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        try{
            helper.setFrom("veenasrao5@gmail.com","no-reply");
            helper.setTo(getTo());
//            helper.setCc("komalvikas1306@gmail.com");
            helper.setSubject(getSubject());
            helper.setText(getBody(),true);
            mailSender.send(message);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public String getMailContent(MailService mailServiceRequest, CustomerDTO customerDetails, String generatedToken) {
        String mailContent = "<p>Dear " + mailServiceRequest.getReceiverName() + ",</p>";
        mailContent += "<p>Congratulation, Your account has been created!! <br> Here is your login credentials:</p>";
        if(customerDetails!=null) {
            mailContent += "<p><b>Customer Id: "+customerDetails.getCustomerId()+"</b></p>";
            mailContent += "<p><b>Auto-Generated Password: "+customerDetails.getCustomerPassword()+"</b></p>";
        }
        mailContent += "<p>Please click the link below to verify your registration:</p>";
        mailContent += "<h3><a href=\"http://localhost:9999/customer/verifyToken?email="+ mailServiceRequest.getTo()+"&code=" + generatedToken + "\" style=\"background-color:#328bff;color:white;margin-top:20px;padding:10px;text-decoration:none;border-radius:50px\">Verify Email</a></h3>";
        mailContent += "<p>Thank you,<br>The Nova Banking Team</p>";
        return mailContent;
    }

    public String getOTPMailContent(MailService mailServiceRequest, String generatedOTP) {
        String mailContent = "<p>Dear " + mailServiceRequest.getReceiverName() + ",</p>";
        mailContent += "<p style=\"margin-bottom:0;padding-bottom:0\">Your One-Time-Password (OTP).</p>";
        mailContent += "<h1 style=\"margin: 2rem 0;background-color:#328bff;color:white;padding:10px;display:inline-block;letter-spacing:5px;\">"+generatedOTP+"</h1>";
        mailContent += "<small style=\"display:block\"><b>Note: Please don't share this otp with anyone.</b></small>";
        mailContent += "<p>Thank you,<br>The Nova Banking Team</p>";
        return mailContent;
    }
}
