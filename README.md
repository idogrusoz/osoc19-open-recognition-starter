
<div>
<img src="https://2019.summerofcode.be/static/img/logo/logo-osoc-color.svg" height="200px" />
<img src="https://2019.summerofcode.be/static/img/partners-svg/hackyourfuture.svg" height="200px"/>
<img src="https://pbs.twimg.com/profile_images/1101803658893819904/xYuEus4g_400x400.png" height="200px" />
</div>

<h1>Open Trust</h1>

<h3>Build by Hack Your Future Belgium students <a href="https://github.com/bitomagira">Steve Bitomagira</a>, 
  <a href="https://github.com/idogrusoz">Ibrahim Dogrusoz</a> and <a href="https://github.com/TamarAsashvili">Tamar Asashvili</a>  during the Open Summer of Code 2019 for Open Recognition Belgium </h3>

Open Trust is a web app based on the idea that users are not allowed to introduce themselves on their profile pages. They need to build a common trust relationship with another user. After the establishment of the trust realtionship a user can make comments recognize the skills of the other user.

<h3>1. VIEWING A PROFILE</h3>

There are three different user types who can view a profile

  a. Unregistered user
  b. Registered user whitout a trust relationship
  c. Registered user with a trust relationship
  
 <h4>1.a UNREGISTERED USER</h4>
  
   An unregistered user can view the user profiles, read comments, skills and skill counts, can see the trust network in the profile and navigate to the trusted users' profiles by clicking their names. It is also possible to search for a user by their user name.(More detailed search is not yet implemented. It is possible to register by submitting full name, a username and defining a password(A more detailed registiration and authentication should be added).
    
  <h4>1.b REGISTERED USER WITHOUT A TRUST RELATIONSHIP</h4>
  
   Can send a trust request in order to build a trust relation. 
    
   <h4>1.c REGISTERED USER WITH A TRUST RELATIONSHIP</h4>
   
   Can add skills and comments for other user.
    
 <h3>2. ESTABLISHING A TRUST RELATIONSHIP</h3>
 
  A user can send a trust request to the other user. Receiving user is notified and can choose to approve or reject this request. After rejection users are allowed to make another attempt to establish a trust relationship. As a result of the approval trust relationship is established and users will be shown an "Add Trust"and an "Add Skill" button in order to contribute to the other user's profile. Users are also shown an upvote button in the list of existing skills of the user which allows them to recognise this skill for one time.
  
  <h3>3. SUBMITTING A COMMENT</h3>
   
   When viewing the profile of a trusted user it is possible to add a comment in order to recognise a good trait, action or characteristics of the user. The receiving user will be notified about this comment and will have chance to publish it or reject. However, rejection of a comment will end up with the termination of the mutual trust relationship. 
   
   <h3>4. RECOGNISING A SKILL </h3>
   
   A trusted user can recognise a skill for user which will be available for other users to upvote. I f the user that upvotes a skill is also recogniosed for this skill than the pro counter will be incremented(A predefined skill list can be added in this component).
    
  
