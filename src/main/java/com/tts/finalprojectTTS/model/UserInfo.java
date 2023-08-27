package com.tts.finalprojectTTS.model;

public class UserInfo {

	private String firstName;
	private String lastName;
	private String birthday;
	
	public UserInfo() {
		
	}
	
	public UserInfo(String firstName, String lastName, String birthday) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
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
		return "UserInfo [firstName=" + firstName + ", lastName=" + lastName + ", birthday=" + birthday + "]";
	}
		
}
