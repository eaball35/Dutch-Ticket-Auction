package com.TicketTime.TicketTime.venue;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VenueRepository extends MongoRepository <Venue, String> {
    Optional<Venue> findById(String id);
}
