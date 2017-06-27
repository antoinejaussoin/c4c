# c4c
Change for charity

## Prerequisites

- Have a MySQL instance ready on your system
- You need a recent version of Node JS

## How to run

- Clone the repository: `git clone git@github.com:antoinejaussoin/c4c.git`
- Install the dependencies: `npm i` (or if you know what Yarn is, `yarn`)
- Copy `database.template.json` to `database.json` and fill the relevant information (see how to get a new NTEE website cookie if required below)
- Run the program: `npm start`


## How to update the NTEE website cookie

The cookie that's already in `config-template.json` is valid until **July 5th**. I'll try to keep it up to date, so you probably don't need to do the below.

The NTEE codes are downloaded from http://nccsweb.urban.org/PubApps/search.php, which requires a cookie to work.
- Go to the website: http://nccsweb.urban.org/PubApps/search.php
- Open the Chrome dev tools
- Make a search
- Retrieve the cookie and paste it in config.json


## What this will do

It will:
- Download the IRS 990 index file for 2017
- Open the file, and for each filing, download the filing in the `./data` directory
- Parse the XML and convert it to JSON
- Extract the information we want from that JSON
- Store this information in the database

## Misc

Data file: https://aws.amazon.com/public-datasets/irs-990/

NCEE Categories: http://nccs.urban.org/classification/national-taxonomy-exempt-entities

Cause IQ
https://www.causeiq.com/help/segmenting_markets/find-organizations-according-their-missions-and-programs/