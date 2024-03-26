package org.example.user.service;

import org.example.user.dto.UserInfoDto;

public interface UserService {

  UserInfoDto getUserInfo(String email);

}
