package com.tts.finalprojectTTS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tts.finalprojectTTS.model.Profile;
import com.tts.finalprojectTTS.model.UserInfo;
import com.tts.finalprojectTTS.repository.ProfileRepository;

@RestController
@RequestMapping("/api")
public class ProfileController {

	@Autowired
	ProfileRepository profileRepository;
	
	@GetMapping("/test")
	public String Test() {
		return "Testing controller";
	}
	
	@GetMapping("/profiles")
	public List<Profile> getProfiles() {
		
		List<Profile> profiles = profileRepository.findAll();
		
		return profiles;	
	}
	
	// Login, check if use profile exist	
	@GetMapping("/profile/{username}/{password}")
	public ResponseEntity<Void> getProfileByUsername(@PathVariable String username, @PathVariable String password) {
		
		Optional<Profile> profile = profileRepository.findByUsername(username);
		
		// user not found
		if (profile.isEmpty()) {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		Profile check = profile.get();
		
		// check if password matches
		if (!check.getPassword().equals(password)) {
			
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
		
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
		
	}
	
	// Get Information of User
	@GetMapping("/profile/info/{username}")
	public ResponseEntity<UserInfo> getProfileInfo(@PathVariable String username) {
		
		Optional<Profile> profile= profileRepository.findByUsername(username);
		
		// user not found
		if (!profile.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	
		Profile p = profile.get();
		
		// extracting information
		UserInfo info = new UserInfo(p.getFirstName(), p.getLastName(), p.getBirthday());
		
		return new ResponseEntity<>(info, HttpStatus.OK);
	}
	
	// sign-up, create new user profile
	@PostMapping("/profile")
	public ResponseEntity<Void> addProfile(@RequestBody Profile newProfile, BindingResult bind) {
		
		if (bind.hasErrors()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		// check if user profile is already in database
		Optional<Profile> check = profileRepository.findByUsername(newProfile.getUsername());
	
		if (check.isEmpty()) {
			// some back-end validation
			if (newProfile.getFirstName() == null || newProfile.getPassword() == null) {
				
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			if (newProfile.getPassword().length() < 8) {
				
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			profileRepository.save(newProfile);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	//delete user profile
	@DeleteMapping("/profile/delete/{username}")
	public ResponseEntity<Void> deleteById(@PathVariable String username) {
		Optional<Profile> profile = profileRepository.findByUsername(username);
		
		if (profile.isPresent()) {
			// Get the id to delete account
			Profile p = profile.get();
			Long id = p.getId();
			
			profileRepository.deleteById(id);
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		// debugging, user not found
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	//update user profile
	@PatchMapping("/profile/update/{username}")
	public ResponseEntity<Void> updateProfile(@PathVariable String username, @RequestBody UserInfo updateInfo) {
		Optional<Profile> profileByUsername = profileRepository.findByUsername(username);
		
		// for debugging in case error 
		if (profileByUsername.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
				
		Profile dbProfile = profileByUsername.get();		
		
		// make sure to never update username or password
		dbProfile.setFirstName(updateInfo.getFirstName());
		dbProfile.setLastName(updateInfo.getLastName());
		dbProfile.setBirthday(updateInfo.getBirthday());
		
		profileRepository.save(dbProfile);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	//forgot password, find password
	@GetMapping("/profile/password/{username}")
	public ResponseEntity<String> forgotPassword(@PathVariable String username) {
		
		Optional<Profile> profileByUsername = profileRepository.findByUsername(username);
		
		// user not found
		if (profileByUsername.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		Profile profile = profileByUsername.get();
		
		//getting password
		String password = profile.getPassword();
		
		return new ResponseEntity<>(password, HttpStatus.OK);
	}
	
	//Change password, update password
	@PatchMapping("/profile/password/update/{username}")
	public ResponseEntity<Void> updatePassword(@PathVariable String username, @RequestBody String newPassword) {
		
		Optional<Profile> profileByUsername = profileRepository.findByUsername(username);
		
		// debugging user not found
		if (profileByUsername.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		Profile dbProfile = profileByUsername.get();
		
		//setting password
		dbProfile.setPassword(newPassword);
		profileRepository.save(dbProfile);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
