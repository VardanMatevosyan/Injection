package org.example.hackcode.rest;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.hackcode.service.AuthCodeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthorizationCodeController {

  AuthCodeService authCodeService;

  @PostMapping("/auth/code")
  public void saveAuthCode(@RequestBody String code) {
    log.info("Steeled authentication code " + code);
    authCodeService.save(code);
  }

  @GetMapping("/auth/code")
  public String getLastAuthCode() {
    log.info("Get last auth code");
    return authCodeService.getLast();
  }

}
