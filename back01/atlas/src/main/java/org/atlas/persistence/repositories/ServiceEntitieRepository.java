package org.atlas.persistence.repositories;

import org.atlas.persistence.entities.ServiceEntitie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ServiceEntitieRepository extends JpaRepository<ServiceEntitie, Long> {

}
