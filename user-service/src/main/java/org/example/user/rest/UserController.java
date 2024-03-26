package org.example.user.rest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.user.dto.UserInfoDto;
import org.example.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserController {

  UserService userService;

  @GetMapping("/user-info")
  public ResponseEntity<UserInfoDto> getUserInfo(@AuthenticationPrincipal Jwt principal) {
    UserInfoDto userInfoDto = userService.getUserInfo(principal.getClaimAsString("email"));
    System.out.println(principal.getClass());
    return ResponseEntity.ok(userInfoDto);
  }

}
