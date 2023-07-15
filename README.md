# FairShare

# About

FairShare is a user-friendly website for seamless bill splitting. Create a group, add participants, and effortlessly divide expenses for various events. FairShare's intuitive interface displays event-wise results through graphs and a detailed table. A visually appealing pie chart illustrates total expenditure. With tools to create events, manage participants, and edit details, FairShare offers complete control. Press "show results" to instantly calculate the amount each person owes or is owed. Experience fair and transparent expense sharing with FairShare today!

# Getting Started

1. In order to use this website it is required to install local host server xampp. Which can be downloaded by following the guides depending on the OS on which the website is being run, [Ubuntu](https://vitux.com/ubuntu-xampp/), [Windows](https://www.geeksforgeeks.org/how-to-install-xampp-on-windows/) or [MacOS](https://medium.com/analytics-vidhya/download-and-install-xampp-on-mac-oshow-to-download-and-install-xampp-on-mac-os-97705974080d).

2. After installing xampp, run it and start the MySQL Database server and Apache Web server. Head towards the local [databse](http://localhost/phpmyadmin/) and create a databse by the name "FairShare", and in the same database created create tables as given below:

       Table EventData with one column P0 int
       Table Events with one column eventName varchar(255)
       Table PaidData with one column P0 int
       Table Participants with one column Name varchar(255)
       Table ToPayData with one column p0 int

3. Now it is required to clone the source code in htdocs directory in your device follow the commands below to do the same:
   ->Open the terminal or (ctrl + Alt + t)

       $ cd ../..
       $ cd opt/lampp/htdocs/
       $ git clone https://github.com/MKartikeya/FairShare.git
   
4. You are all ready to run the website [FairShare](http://localhost/FairShare/login.html)

# Acknowledgment

[Kartikeya M](https://github.com/MKartikeya)

[Nimai Parsa](https://github.com/nimaiParsa)

[K S Ananth](https://github.com/ksananth4424)


Happy coding!! 
