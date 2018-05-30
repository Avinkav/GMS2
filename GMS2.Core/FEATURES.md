# Features of Generic Music School Website

This outlines the functional features implemented into the GMS Website.


## Landing Page
- A “Join Now” Button
- Slideshow background
- Contact Us
- Carousel testimonial section
- Functioning Header navigation bar
- Hides on scroll down, shows on scroll up
- Book a Lesson - redirects to Login page if user is not logged in.
- Functioning and Shared footer - Peep the “Connect With Us” links, I dare you. 


## Register
- Auto completion for “States”
- Error Messages that display when:
	- Fields are Missing - Register button unavailable until all fields entered
	- Email address already exists

## Log-in
“Remember Me” functionality
“Incorrect username and/or password” prompt

## Log-Out
- Returns a user back to the landing page and signs out of account.

## Book a Lesson
- Filtered Searching by Instruments or Name
- Available to pick lesson duration, Date and Time
- Clear and easy to understand display of selected booking details before confirmation
- Lessons added to Teacher and Student’s calendars.

## Portals

### User Portal
- Dashboard
	- Calendar with personal lesson bookings, able to view past and future days.
	- Summary of Payments paid for booking lessons
	- A rating review of past classes
	- Description of your instrument you hired.
- Lessons
	- Same calendar on the dashboard
	- History of past lessons and their costs - not implemented
	- Preferences of teachers, languages, etc - not implemented
- Instruments
	- Search functionality of specific instrument types
	- Summary of your instruments borrowed
- BIlling - not implemented
- Profile - Your user details, editable by you and an admin user


###Teacher Portal
- Dashboard
	- Calendar displaying lessons a student has booked with you.
	- Payment Summary of your earnings - More details takes you to detailed view
- Classes - Same calendar on dashboard
- Income - More detailed description of your payment summary. Functioning backend, however cannot be implemented fully due to task dependency of “Payments” functionality.

###Admin Portal
- Dashboard
	- Calendar that displays all lessons - Not connected to lesson database yet
	- Financial Summary - links to detailed finances.
-Users
	-Userlist that displays ALL users
	-View details and delete users
	-Search bar to search users by names
-Finances
	-In Depth view of Financial Summary
	-Functioning backend, however cannot be implemented fully as a result of task dependency of “Payments” functionality.
