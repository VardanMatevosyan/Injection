package org.example.hackcode.service;

import java.util.ArrayDeque;
import java.util.Deque;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class AuthCodeServiceImpl implements AuthCodeService {

  private static final Deque<String> AUTH_CODE_DEQUE = new ArrayDeque<>();

  @Override
  public void save(String code) {
    AUTH_CODE_DEQUE.push(code);
  }

  @Override
  public String getLast() {
    return AUTH_CODE_DEQUE.pop();
  }
}
