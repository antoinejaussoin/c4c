# c4c
Change for charity

## Prerequisites

- Have a MySQL instance ready on your system
- You need a recent version of Node JS

## How to run

- Clone the repository: `git clone git@github.com:antoinejaussoin/c4c.git`
- Install the dependencies: `npm i` (or if you know what Yarn is, `yarn`)
- Copy `config_template.json` to `config.json` and fill the relevant information
- Run the program: `npm start`

## What this will do

It will:
- Download the IRS 990 index file for 2017
- Open the file, and for each filing, download the filing in the `./data` directory
- Parse the XML and convert it to JSON
- Extract the information we want from that JSON
- Store this information in the database

## Misc

Data file: https://aws.amazon.com/public-datasets/irs-990/