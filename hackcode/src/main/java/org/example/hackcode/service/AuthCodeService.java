package org.example.hackcode.service;

public interface AuthCodeService {

  void save(String code);

  String getLast();

}
