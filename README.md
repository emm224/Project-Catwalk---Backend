# Project Atelier - Ratings and Reviews

> Design an API service that returns the ratings and review data to support a front-end e-commerce website.

1. [Description](#description)
2. [Team Members](#team-members)
3. [Usage](#usage)
4. [Requirements](#requirements)
5. [Setting Up Repository on Local Machine](#setting-up-repository-on-local-machine)
6. [Installing Dependencies](#installing-dependencies)

# Description

> Construct and optimize a server and database to support the front end application of an e-commerce site.

# Team Members
[Team Noctis](https://github.com/NoctisSDC/SDC)<br/>

Ratings and Reviews: [Eric Ma](https://github.com/emm224)<br/>


# Technologies Used

### Front-End Development
JavaScript <img align="left" alt="JavaScript" width="30px" src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/javascript.svg" />
<br />

### Back-End Development
Node.js <img align="left" alt="Node JS" width="30px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<br />

PostgreSQL <img align="left" alt="PostgreSQL" width="30px" src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" />
<br />

Express.js <img align="left" alt="Express" width="30px" src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" />
<br />

### Testing
Jest <img align="left" alt="Jest" width="30px" src="https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_jest.svg?sanitize=true" />
<br />

## Setting Up on Local Machine

1. Fork the repository and clone to your local machine using `https://github.com/emm224/Project-Atelier---Backend-Applicaiton.git`
2. Run `npm install` to download dependencies.
3. Install PostgreSQL on your machine.
4. In PosgreSQL create a role with CREATEDB and WITH LOGIN permission, and set a password.
5. Login to postgres with that role and create a database with the same name as the role
6. run command `vim  SDC/database/Reviews/index.js` and update user name and password to the role you just created
7. run command `psql -f SDC/database/Reviews/schema.sql` to run the database schema.
