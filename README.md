# MemberWaterSports

Prerequisites:- 

node js
npm
mongodb
robomongo (for manipulating data)

Steps:


in robomongo,

create a database with name :- newauth

create a collection with name "trips" in newauth and insert this document- 
{
    "boat" : "above",
    "destination" : "seeabove",
    "departure" : "seeabove",
    "start" : "N/A",
    "signin" : "N/A",
    "signout" : "N/A",
    "end" : "N/A",
    "crew" : "none",
    "createdby" : "N/A",
    "arrival" : "N/A"
}

create a collection with name "logbook in newauth and insert this document-

{
    "boatName" : "pearl",
    "crewName" : [ 
        " "
    ],
    "destination" : "laboe",
    "departure" : ISODate("2018-09-02T11:10:10.446Z"),
    "arrival" : ""
}
{
    "boatName" : "dolphin",
    "crewName" : [ 
        " "
    ],
    "destination" : "ostsee",
    "departure" : ISODate("2018-09-02T11:10:10.446Z"),
    "arrival" : ""
}
{
    "boatName" : "seagull",
    "crewName" : [ 
        " "
    ],
    "destination" : "port de la",
    "departure" : ISODate("2018-09-02T11:10:10.446Z"),
    "arrival" : ""
}
{
   
    "boatName" : "romphy",
    "crewName" : [ 
        " "
    ],
    "destination" : "rendesburg",
    "departure" : ISODate("2018-09-02T11:10:10.446Z"),
    "arrival" : ""
}
