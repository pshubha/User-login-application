# User-login-application

## Backend (AdonisJS)
- This project uses AdonisJS as the backend framework.
- To run the backend, use the following command: node ace serve --watch
- The backend provides APIs for user CRUD operations.

## Frontend (Vue 3 with Quasar)
- The frontend is built with Vue 3 using TypeScript and the Quasar framework.
- To run the frontend, use the following command: quasar dev

### Login
- The application features a login page.
- It allows users to log in as an admin or a regular user.
- Admin credentials: Email: admin@gmail.com, Password: 123

### Registration
- The registration page allows new users to create an account.
- It includes fields and validation for registration.

### Admin
- Admin can manage the application.
- Admin have the authority to block/unblock users and delete them.
- They can search for users.

### User
- Regular users can access the application.
- If an admin blocks a user, a popup will appear, notifying the user of their blocked status.
- Otherwise, they are redirected to the user page.

Enjoy using the User Login application!
