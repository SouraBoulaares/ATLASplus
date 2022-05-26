package org.atlas.persistence.repositories;

import org.atlas.persistence.entities.Entitie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntitieRepository extends JpaRepository<Entitie, Long> {

}
