# Todo App - React + Redux Toolkit + Python FastAPI + PostgreSQL

A full-stack Todo application built using **React**, **Redux Toolkit**, **Python (FastAPI)**, and **PostgreSQL**. The application allows users to create, update, delete, and complete tasks with persistent database storage.

## Features

* Add a new task
* Edit an existing task
* Delete a task
* Mark tasks as completed
* View pending and completed tasks separately
* Toast notifications for user actions
* Redux Toolkit for state management
* RESTful APIs using FastAPI
* PostgreSQL database integration
* Environment variable support using `.env`

## Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* Redux Toolkit
* React Redux
* Axios
* React Toastify
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Database

* PostgreSQL

## Project Structure

```text
Frontend
├── components
├── redux
├── services
├── app
├── App.jsx
└── .env

Backend
├── main.py
├── database.py
├── database_models.py
├── models.py
└── requirements.txt
```


## API Endpoints

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/items`              | Retrieve all pending tasks |
| GET    | `/completed-items`    | Retrieve completed tasks   |
| POST   | `/item`               | Create a new task          |
| PUT    | `/item/{id}`          | Update an existing task    |
| PUT    | `/item/{id}/complete` | Mark a task as completed   |
| DELETE | `/item/{id}`          | Delete a task              |



**Tulasi Vaindam**
