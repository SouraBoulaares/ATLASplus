package org.atlas.exceptions;

public class FileCreationException extends RuntimeException {

  private static final long serialVersionUID = 7428279561375909688L;

  public FileCreationException(String message) {
    super(message);
  }

  public FileCreationException(String message, Throwable cause) {
    super(message, cause);
  }
}
