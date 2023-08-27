package com.tts.finalprojectTTS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.tts.finalprojectTTS.model.Profile;

public interface ProfileRepository extends CrudRepository<Profile, Long>{
	
	Optional<Profile> findByUsername(String username);
	
	@Override
	List<Profile> findAll();
	
}
