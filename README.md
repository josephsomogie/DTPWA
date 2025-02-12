# DTPWA
Decentralized Transfer Protocol Web Application

===================================== Plan
Create codeless backend for DTP, via webapp
allow DTPClient to be installable from nodejs, pip, etc.
allow local storage DTP to be integrated into projects
======================================


flow:
1. user creates instance of backend framework
2. user utilizes libs (from node, pip) to initialize a DTPCLient() object, which will init on connection established to backend.

DTPClient() Must:
- connect to backend
- send data to backend
- receive data from backend
- handle errors
- handle disconnections
- process requests from backend
- process rules


Backend: Users can script rules for servers, centralized DB, etc.


connection flow:
1. Server at rest ()






