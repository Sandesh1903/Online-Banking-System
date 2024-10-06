package com.project_14.OnlineBankingSystem.aspect;

import com.project_14.OnlineBankingSystem.annotation.AuthAnnotation;
import com.project_14.OnlineBankingSystem.exception.Unauthorized;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuthControllerAspect {

    @Before("@within(authAnnotation)")
    public void checkAuthentication(AuthAnnotation authAnnotation) throws Exception {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs != null) {
            HttpSession session = attrs.getRequest().getSession();
//            System.out.println(session.getId());
            Boolean isVerified = (Boolean) session.getAttribute("isVerified");
            if(isVerified==null || !isVerified){
                System.out.println("isVerified "+isVerified);
                throw new Unauthorized();
            }
        }
    }
}
