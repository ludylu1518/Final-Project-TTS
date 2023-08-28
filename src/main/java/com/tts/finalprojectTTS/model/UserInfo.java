package com.tts.finalprojectTTS.model;

public class UserInfo {

	private String firstName;
	private String lastName;
	private String birthday;
	private String gender;
	
	public UserInfo() {
		
	}
	
	public UserInfo(String firstName, String lastName, String birthday, String gender) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.gender = gender;
	}
	

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	@Override
	public String toString() {
		return "UserInfo [firstName=" + firstName + ", lastName=" + lastName + ", birthday=" + birthday + ", gender="
				+ gender + "]";
	}
		
}
