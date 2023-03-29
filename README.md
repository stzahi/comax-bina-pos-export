# COMAX-BINA-POS

## What is it?
This is a simple script uses to export data from COMAX Bina POS system (Israeli cash register company who doesn't provide any API to connect to it's simple cashier services).

This script uses Puppeteer to simulate a regular login into the system,
Then it will send 2 JSON arrays to an external endpoints defined by the user.

First array contains **all customers' information** (saved as contacts in comax's system).

Second array contains **all invoices information**.

The information will be sent to an external routes, it is recommended to use a third party integration service (such as make.com / zapier) and automate your workflow further on.
## How to use?

2 ways:

#### 1. Preferred way (Using Docker)

Make sure you have docker installed on the machine running the script.


in the following line, change:
- `your@username.com` to your username email address
- `TopSecretPassword` to your account's password
- `https://hook.eu1.make.com/customers-hook` to the customers' hook destination (the data will be sent to this address using a POST HTTP request).
- `https://hook.eu1.make.com/invoices-hook` to the invoices' hook destination (the data will be sent to this address using a POST HTTP request).


```
  docker container run --name=comax-bina-pos --env COMAX_BINA_USERNAME=your@username.com --env COMAX_BINA_PASSWORD=TopSecretPassword --env ALL_CUSTOMERS_HOOK=https://hook.eu1.make.com/customers-hook --env ALL_INVOICES_HOOK=https://hook.eu1.make.com/invoices-hook stzahi/comax-bina-pos:latest 
```

Now, from now on you can simple run it (one-time) using the following line:

```
docker container start comax-bina-pos
```

You can check the activity by checking the container's logs:
```
docker container logs comax-bina-pos
```

Everytime you start the container the log should be added with 3 lines:
```
 STARTED 

Connected! fetching data
DONE
```
If you see those lines, then everything is fine :)

Enjoy!

#### 2. Less preferred way :(

* Clone this repository to your computer.
* Create a `.env` file using the example given in the repository (`.env.example`).

* 
```
npm install
```
* Make sure you have all neccessary dependencies in order to run Puppeteer. (chromium installed).
* This is the reason the first method is better. Puppeteer is included inside the docker image.
* Run the script using 
```
node index.js
```
Everytime you want to sample the data.

You should see the following 3 lines:
```
 STARTED 

Connected! fetching data
DONE
```
If you see those lines, then everything is fine :)

Enjoy!




