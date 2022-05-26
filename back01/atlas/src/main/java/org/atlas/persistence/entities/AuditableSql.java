package org.atlas.persistence.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public class AuditableSql {
    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "yyyy-MM-dd HH:mm:ss",
            timezone = "Africa/Tunis")
    @Column(nullable = false, updatable = false)
    @CreatedDate
    protected Date createdAt;

    /** The updated at. */
    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "yyyy-MM-dd HH:mm:ss",
            timezone = "Africa/Tunis")
    @Column(nullable = false)
    @LastModifiedDate
    protected Date updatedAt;

    @PrePersist
    private void persistCreatedDate() {
        if (this.createdAt == null) {
            this.createdAt = new Date();
        }
        this.updatedAt = new Date();
    }

    @PreUpdate
    private void persistUpdatedDate() {
        this.updatedAt = new Date();
    }
}