# Simple User Rest API

Api user sederhana, dideploy di AWS EC2 dengan alamat: http://54.169.204.0:3000/

## Tech Stack
- Node.js
- Express.js
- better-sqlite3 – SQLite driver
- Zod – validasi skema

## Endpoints
### 1. Get all users

-   **Method**: `GET`
-   **Endpoint**: `/users/`
  
    Mengambil seluruh user yang ada.
    
    Penggunaan:

    `
    GET http://54.169.204.0:3000/users
    `

    Contoh Respons:
    - 200 OK:
    
        ```json
        {
            "status": "success",
            "message": "Users retrieved successfully.",
            "data": [
                {
                    "id": 1,
                    "name": "Faza Denandra",
                    "email": "fazadenandra@gmail.com",
                    "age": 22
                },
                {
                    "id": 2,
                    "name": "Agus Kobra",
                    "email": "aguskobra@gmail.com",
                    "age": 22
                }
            ]
        }
        ```
    - 500 Internal Server Error:
    
        ```json
        {
            "status": "error",
            "error": "500 Internal Server Error",
            "message": "no such table: awawa"
        }
        ```
### 2. Insert User

-   **Method**: `Post`
-   **Endpoint**: `/users/`
    
    Menambahkan user.
    
    Penggunaan:

    ```
    POST http://54.169.204.0:3000/users \
        -H "Content-Type: application/json" \
        -d '{"name": "Budi Cobra", "email": "cobra123@gmail.com", "age": 22}'
    ```

    Contoh Respons:
    - 200 OK:
    
        ```json
        {
            "status": "success",
            "message": "User added successfully.",
            "data": {
                "name": "Budi Cobra",
                "email": "cobra123@gmail.com",
                "age": 22
            }
        }
        ```
    - 400 Bad Request:
    
        ```json
        {
            "status": "error",
            "error": "400 Bad Request",
            "message": "name: Too small: expected string to have >=4 characters"
        }
        ```
        ```json
        {
            "status": "error",
            "error": "400 Bad Request",
            "message": "name: Too small: expected string to have >=4 characters; email: Invalid email address; age: Invalid input: expected number, received string"
        }
        ```
    - 500 Internal Server Error:
    
        ```json
        {
            "status": "error",
            "error": "500 Internal Server Error",
            "message": "UNIQUE constraint failed: users.email"
        }
        ```

### 3. Get specific user

-   **Method**: `Get`
-   **Endpoint**: `/users/:id`
    
    Mengambil user dengan id tertentu.
    
    Penggunaan:

    `
    GET http://54.169.204.0:3000/users/1
    `

    Contoh Respons:
    - 200 OK:
    
        ```json
        {
            "status": "success",
            "data": {
                "id": 1,
                "name": "Faza Denandra",
                "email": "fazadenandra@gmail.com",
                "age": 22
            }
        }
        ```
    - 404 Not Found:
    
        ```json
        {
            "status": "error",
            "error": "404 Not Found",
            "message": "User with ID 100 not found."
        }
        ```
    - 400 Bad Request:
    
        ```json
        {
            "status": "error",
            "error": "400 Bad Request",
            "message": "Invalid input: expected number, received NaN"
        }
        ```
