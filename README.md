nusXchange
Overseas Exchange Web Forum 

Aim:
The aim of the NUS Overseas Exchange Forum is to provide a one-stop platform for
prospective exchange students to clarify any doubts or queries they have regarding their
respective overseas exchanges. The web forum will involve the different elements of the
various exchange programmes such as the NUS Student Exchange Programme (SEP),
NUS Overseas Colleges (NOC) and other Summer/Winter exchange programmes. It will
encompass a plethora of aspects regarding the exchange programmes from module
mapping to accommodation and onsite inquiries.

Target Audience:

The target audience will be prospective overseas exchange students but may extend to
those exploring the possibility of going on overseas exchange programmes.

Infrastructure:

Frontend
The frontend of the forum will be written using react JS with the typescript
library incorporated. This allows for easier debugging as it throws live code
errors. Postgres Database will be used for storage.

Basic User Interface (UI)
A basic user interface was used to encourage ease of use and self-explanatory navigation
around the website's various different views.

Backend
The backend of the forum will be supported by Rails (Ruby). This provides
extensive support for models which manage all the information within the forum
database. This will also be key for the CRUD operations which is the main
functionality within the forum.

Features:

4.1 User Account Authentication

The forum will provide user account authentication as a security feature so as to prevent
unauthorised users from accessing the platform. This is to reduce the occurrences of
unwanted spam by bad actors through gating the forum to NUS students only. It also
enhances the level of security and privacy of the platform such that only registered users
are permitted to gain access to the information on the forum platform. Only NUS
students with a registered account will be able to access the forum and use its features. The
user authentication system will provide a token to every user ince they have created an
account with the forum website. The token is an alphanumeric 20 character string which will be
unique to every user and will act as their entry pass into the forum.


4.2 User Accounts

User account feature enables users to own an online persona which serves as an identity
and storage for previous activities on the forum. It will allow them to input basic information
on themselves wuch that other users are offered a little insight into you. It also provides 
portability across devices and platforms which supports ease of use. Logging into an account via
different devices allows users to access all previous activity and also saved posts.


4.3 Categorisation

In order to enhance user experience, users would be able to filter the forum entries
according to their desired criterion. This would enable a more efficient experience and
reduce the need for them to read through irrelevant information. Additionally, it makes
the user interface neater and more organised such that it is easier to navigate around the
web forum. Categories such as “NUS Overseas College” and “Winter Programmes” will be
included for users who are browsing the forum with the desire to find information on a 
specific subject.


4.4 Favourites

Favourites function allows the user to bookmark and save a forum post so as to receive
notifications when other users comment on the post or when the original poster makes
an edit to the post. This allows users to stay connected to the thread that they are
following and receive real time updates of the conversations that are relevant to them.
Additionally, the forum will allow users to pinpoint words which are relevant to them
and be notified whenever a thread or post associates to the specific keyword. Users will be 
able to view all of their saved posts in a separate viewer dashboard. This allows them to keep
tabs with the posts that they are interested in.


4.6 Comments

The web forum will provide the comments functionality which allows users to articulate
their opinions on the posts on the web forum. This enables greater involvement and
engagement between those in the community and fosters a sense of community within
the users of the web forum.


4.7 Recommend/ Unrecommended
This functionality allows users to evaluate the usefulness of a thread or a post in the web
forum by clicking on the recommend or unrecommend option on each post. This will be
based on the user’s perception on how much the information provided on the thread is
related or useful to the topic being presented. A user will be able to select the
recommended option to highlight to others’ that the content of a certain post or
comment is relevant. This functionality will act as a layer of check and balance on posts
and comments on the web forum which is decentralised and community-decided.