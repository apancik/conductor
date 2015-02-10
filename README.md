Conductor - Distributed JavaScript Map
=============

Conductor is a self-hosted service that allows you to simply execute arbitrary [map function](http://en.wikipedia.org/wiki/Map_%28higher-order_function%29) written in JavaScript distributed among ensemble of web browsers using web workers.

Each browser that opens a website with one line of code added becomes a computation node. Conductor then takes care of the data distribution and collation of results.

This model is ideal for embarassingly parallel CPU heavy computations that can be finished within the average web page visitor session. It can be used as a base for "poor man's cluster" or toy to learn about distributed computing.

Conductor comes with barebone dashboard to upload data and program to be executed. In addition, it exposes a simple REST API to control the operation. See Quick Start guide to get started.

Installation
------------

Either deploy directly to Heroku for free by clicking the button below

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

or launch locally after downloading this repository using npm (node package manager):

    npm install
    npm start

Quick Start
-----------

Open the dashboard after deploying Conductor on heroku (or running it locally [localhost:3000](http://localhost:3000)). 

### Upload data

First step of every Conductor operation is to upload the data. For the convenience CSV formwat is automatically parsed. Each row represents a separate data packet and will be transmitted to the computation node at once.

Note that the order of the rows is not kept, so if you need to keep the order, it is advised to include index column and pass the value through the system to allow sorting of the results after the computation is finished.

### Upload program

After the data is uploaded, the second step is to upload the program. Each program is an arbitrary javascript that is executable in web worker. It has to contain function ```run(data)``` where ```data``` is an array of cells from one row from input csv file.

### Compute

The computation starts immediately after the first two steps are finished. New nodes can be added to the ensemble by opening the dashboard or including ```/node.js``` script hosted on the Conductor server.

### Download results

Once computation is finished and no more data packets are left for processing you can download the results from the dashboard using the download link.

License
-------------------

Released under the MIT license. See file called LICENSE for more details.