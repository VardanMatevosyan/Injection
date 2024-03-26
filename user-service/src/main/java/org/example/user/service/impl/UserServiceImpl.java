package org.example.user.service.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.user.dto.UserInfoDto;
import org.example.user.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserServiceImpl implements UserService {

  private static final Map<String, UserInfoDto> USER_DATABASE = new ConcurrentHashMap<>();

  static {
    USER_DATABASE.put("vardan@matevosian.tech", UserInfoDto.builder().email("user Tech email here").address("User Tech address here").build());
    USER_DATABASE.put("vardanmtfork@gmail.com", UserInfoDto.builder().email("User Fork email here").address("User Fork address here").build());
  }

  @Override
  public UserInfoDto getUserInfo(String email) {
    return USER_DATABASE.get(email.toLowerCase());
  }
}
