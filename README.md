# EXPERIMENTAL PAXOS IMPLEMENTATION

This program is made as an assignment for the discipline Principles of Fault Tolerance, lectured by Prof. Raimundo Macêdo, provided by UFBA. Here we implement the Paxos Consensus Algorithm as a proof of concept without being specified to a real case. 

## Authors

Ricardo Sales Rios
Uaná Gasparim

## Installation

Install from https://github.com/AnnWann/paxos

## Usage

You will need to create a .env file with fields MY_PORT, PORT1, PORT2 and PORT3. PORTn is a port that server n is listening to; this system requires that n = 3; MY_PORT is the port of the given server being created; As such, to run this you will need to have the code in 3 directories, each with its own .env file representing a unique port. 

Once the .env is created for each server in their respective directories, do `npm start` to run. 

Once the servers are running you can send requests using the prefered agent of your choice. As the client, you can do two operations: 

  localhost/port/somar1 -> increases the server value by 1
  localhost/port/subtrair1 -> decreases the server value by 1

To run tests do `npm test`. 




