### Sample REST service in Express
This is a sample of a web service to manage a list of diesel prices and locations.  As I hadn't written anything server-side in Node, I opted to do a sample service for exposition.

The service is designed to allow for the capturing of data about diesel fillups.  

The service contains methods for: 
- get (all or single)
- post (add)
- put (update)
- delete

Cypress was used to create unit tests for:
- get calls
- delete calls
