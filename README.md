# A Restful Drinkshop Backend Proof of Concept
## Quickstart
- Execute `npm i && npm start` on the command line to install the node packages and run the App.
- No Docker is required to run at this time - the db has been moved to the cloud - please contact the developer to get the .env file and access the service.
NOTE: the IP address 203.194.51.158/32 (Walker St N. Sydney) has been cleared with GCP to accept connections to the cloud sql. If another address is required please contact the developer.
## Description
This application demonstrates CRUD operations with relational databases using Node/Express and MySQL for Project Learn Good at Coder Academy. It has not reached a mature development phase and is not recommended for production as it is an ill-concieved piece of crapware strictly for educational purposes.
## Requirements Checklist
- R1 Whatever: the repeats-itself requirement.
- R2, R3 See report section below
- R4 create data model - check!
- R5 do CRUD using JS - C check!, R check!, U check! D check!
- R6 dummy client - check!
- R7 average price of drinks at the drinkshop '/average/' endpoint - check!
- R8 See report for detailed explanation of how input validation has been implemented
- R9 check!
- R10 The 3 select queries: filter - MySQL doesn't have FILTER!, groupby - check!, order - check!
- R11 The 2 select queries with joins - check!
- R12 The 1 select query to get it all - check!
## Requirement Number Two (#2)
### Professional report which discusses professional and legal obligations
#### Description of requirement:
Discuss how the application will handle the privacy of user data within the system, and how security features of the frameworks you are utilising will assist to mitigate security concerns.

Example: discuss how the use of ORMs mitigate SQL injection attacks, and how API frameworks such as ExpressJS can handle the sanitisation of user input.
### No. 2 Answer
When using an ORM or module within the Node/Express framework pattern of developing APIs, it's possible to use the built-in placeholders to escape potentially dangerous user input from being passed to an SQL query. The module 'mysql2' used in this application can also employ "named placeholders" to effectively _parametize_ variable strings as they are destructured into the queries.  
In other cases it would also be recommended to do validation and sanitization. Middleware can be used with ExpressJS, such as, the module 'express-validator' can validate the expected form of data. Datatypes specified in the SQL table schema can only do so much to prevent SQL injection vulnerabilities, middleware may be required for a great many use cases.
## Requirement Number Three (#3)
### Professional report which provides an analysis of privacy and security concerns
#### Description of requirement:
Discuss how you will address the following obligations as a developer:
- professional obligations (delivering the project on time, being explicit about ongoing maintenance of the system)
- ethical obligations: ensuring that the application conforms with ethical codes of conduct approved by industry
- legal obligations: that you have assessed whether the application is subject to any legal regulation, if none, consider any privacy implications.
### No. 3 ANSWER
Professional obligations: many business situations mean software developers are producing technical solutions and bespoke applications for non-technical business people. They have their specialization and knowledge set that is often very different from that of software developers. Project outcomes ought to be explicit about on-going maintenance and project milestones must be realistic to meet those business objectives in a timely way. Developers can mitigate project risk by considering a number of important details and communicating then clearly to project stakeholders at any projects initial stages.
Ethical obligations: IT professionals have an obligation to be sincere about the technical solutions they offer to clients and colleagues especially if those associates are not versed in specifics of production and engineers of integrated systems.
Legal obligations: privacy concerns must be considered if data is personal and especially if any databases hold third-party data for client business goals. Copyright and legal agreements must often be made to handle and distribute content of which key stakeholders may not be aware. Software developers handling digital media and public records must be conscious of how the business function of the application being delivered will meet those requirements.
## Requirement Number Eight (#8)
### Is it written or is it code - ambiguous
#### Description of requirement:
Clearly indicate how you have tested the integrity of the data for entities to ensure that data will not lead to a database with incomplete data, or data that is not appropriate (for example: properties should have a size limit appropriate for the data held)
### No. 8 ANSWER
MySQL tables have restraints placed on their schema such as NULL or UNIQUE to improve the normalization tactics of database management. Datatypes are another very important constrainst for fields to have. They can reduce the amount of inappropriate data that could be recorded in the database. In this application, the DATE datatype has been intentionally used to increase the amount of data available about entries if problems may occur and data sources need to be traced. Essential fields can be constrained to be not NULL and prevent required data from a record being ommitted by accident. Other verifications and sanitizations can be handled by front end frameworks on the client-side logic.
