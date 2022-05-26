package org.atlas.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserBlockedException extends RuntimeException {

  private static final long serialVersionUID = 7428279561375909688L;

  public UserBlockedException(String message) {
    super(message);
  }

  public UserBlockedException(String message, Throwable cause) {
    super(message, cause);
  }
}
