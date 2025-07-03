package com.civiclink.project.Exception;

import com.civiclink.project.DTO.MessageResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResidentExistsByAadhaarAtRegistration.class)
    public ResponseEntity<MessageResponseDTO> handleDuplicateResourceException(ResidentExistsByAadhaarAtRegistration ex){
        MessageResponseDTO response = new MessageResponseDTO(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ResidentNotFoundAtLogin.class)
    public ResponseEntity<MessageResponseDTO> handleNotExistedResident(ResidentNotFoundAtLogin ex){
        MessageResponseDTO response = new MessageResponseDTO(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResidentWithWrongPasswordAtLogin.class)
    public ResponseEntity<MessageResponseDTO> handleWrongPasswordException(ResidentWithWrongPasswordAtLogin ex){
        MessageResponseDTO response = new MessageResponseDTO(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(ResidentNotFoundAtReportingIssue.class)
    public ResponseEntity<MessageResponseDTO> handleResidentNotFoundAtReportingIssue(ResidentNotFoundAtReportingIssue ex){
        MessageResponseDTO response = new MessageResponseDTO(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IssueNotFoundException.class)
    public ResponseEntity<MessageResponseDTO> issueNotFoundException(IssueNotFoundException ex){
        MessageResponseDTO response = new MessageResponseDTO(ex.getMessage());
        return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponseDTO> handleGenericException(Exception ex){
       // ex.printStackTrace();
        MessageResponseDTO response = new MessageResponseDTO("Something went wrong");
        return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
